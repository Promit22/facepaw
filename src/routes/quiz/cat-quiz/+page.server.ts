import type { PageServerLoad } from './$types';
import { generateQuizSession } from '$lib/server/models/question';
import { readBreed } from '$lib/server/models/breedCache';
import { quizStore } from '$lib/server/quiz/quizStore';
import type { PendingQuiz } from '$lib/types/quizQuestion';
// import type { QuizQuestion } from '$lib/types/quizQuestion';
import type { Quiz } from '$lib/types/quizQuestion';
import { checkIfQuizSessionValid, insertQuiz } from '$lib/server/models/sessions.js';

const pendingQuiz = new Map<string, PendingQuiz>();
const userAnswers = new Map<
	string,
	{ answer: { id: string; ans: string }[]; createdAt: number; index: string }
>();

function cleanExpiredPending() {
	const MAX_AGE = 30 * 60 * 1000;
	pendingQuiz.forEach((value, key) => {
		// console.log('value', value);
		if (Date.now() - value.createdAt > MAX_AGE) {
			pendingQuiz.delete(key);
		}
	});
}
function cleanExpiredAnswers() {
	const MAX_AGE = 30 * 60 * 1000;
	userAnswers.forEach((value, key) => {
		// console.log('value', value);
		if (Date.now() - value.createdAt > MAX_AGE) {
			userAnswers.delete(key);
		}
	});
}

export const load = (async ({ cookies }) => {
	const sessionCookie = cookies.get('quizSessionId');
	console.log('sessionCookie', sessionCookie);

	if (sessionCookie) {
		const isSessionValid = checkIfQuizSessionValid(sessionCookie);
		if (isSessionValid) {
			const session = quizStore.get(sessionCookie);
			console.log('useranswers sessioncookie', userAnswers.get(sessionCookie));
			console.log('userAnswers', userAnswers);

			const currentIndex = userAnswers.get(sessionCookie)?.answer.length;
			if (session && currentIndex) {
				console.log('currentIndex', currentIndex);

				return {
					questions: session.question.map((q) => ({
						id: q.id,
						type: q.type,
						question: q.question,
						options: q.options,
						image: q.imageUrl
					})),
					currentIndex,
					sessionId: sessionCookie,
					expiresAt: session.expiresAt
				};
			}
		}
	}
	const breeds = await readBreed('cat');
	const sessionId: `${string}-${string}-${string}-${string}-${string}` = crypto.randomUUID();
	const quiz: Quiz[] = generateQuizSession(breeds, 2);
	// console.log('quiz', quiz);
	insertQuiz({ id: sessionId, question: quiz, createdAt: Date.now(), expiresAt: 0 });
	// quizStore.set(sessionId, { question: quiz, createdAt: Date.now(), expiresAt: 0 });
	// console.log(pendingQuiz);
	cookies.set('quizSessionId', sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 10 * 60
	});
	return { sessionId };
}) satisfies PageServerLoad;

function gradeQuizSession(
	sessionId: string,
	userAnswers: { questionId: string; answer: string }[]
) {
	// console.log('sessionid', sessionId);
	// console.log('ans', userAnswers);

	const MAX_AGE = 5 * 60 * 1000; // 5 minutes

	for (const [id, session] of quizStore.entries()) {
		if (Date.now() - session.createdAt > MAX_AGE) {
			quizStore.delete(id);
		}
	}

	// console.log('userAnswer', userAnswers);

	const session = quizStore.get(sessionId);
	// const sessionEntries = session.entries()
	if (!session) {
		throw new Error('Invalid session');
	}

	let score = 0;

	for (const userAnswer of userAnswers) {
		const question = session.question.find((q) => q.id === userAnswer.questionId);
		// console.log('questionId', userAnswer.questionId);
		// console.log('questionId', userAnswer.answer);

		if (!question) continue;

		if (question.correctAnswer === userAnswer.answer) {
			score++;
		}
	}

	const total = session.question.length;
	const accuracy = Math.round((score / total) * 100);

	return {
		score,
		total,
		accuracy
	};
	// return { score, total };
}

export const actions = {
	submitAns: async ({ request }) => {
		const formData = await request.formData();
		const sessionId = formData.get('sessionId')?.toString();
		const answers = formData.get('answers')?.toString();
		if (!sessionId || !answers) {
			return;
		}
		const obj = JSON.parse(answers);
		// console.log(sessionId, answers, obj);
		const result = gradeQuizSession(sessionId, obj);
		// console.log('result from action', result);

		// return { score: result.score, total: result.total, accuracy: result.accuracy };
		return result;
	},
	startQuiz: async ({ request, cookies }) => {
		// const formData = await request.formData();
		// const sessionId = formData.get('sessionId')?.toString();
		// console.log('sessionid from start action', sessionId);
		const sessionId = cookies.get('quizSessionId');
		if (!sessionId) return { message: 'Could not start quiz. Please start again' };
		const quiz = quizStore.get(sessionId);
		if (!quiz) return { message: 'Could not start quiz. Please start again' };
		const expiresAt = Date.now() + 123000;
		quiz.expiresAt = expiresAt;
		// console.log('quiz from start quiz action', quiz);
		cleanExpiredPending();
		const currentQuiz = quizStore.get(sessionId);
		if (!currentQuiz) return { message: 'Could not start quiz. Please start again' };
		return {
			sessionId,
			questions: currentQuiz.question.map((q) => ({
				id: q.id,
				type: q.type,
				question: q.question,
				options: q.options,
				image: q.imageUrl
			})),
			expiresAt
		};
	},
	submitAnswer: async ({ request, cookies }) => {
		console.log('triggered submitanswer action');

		const formData = await request.formData();
		const selectedAnswer = formData.get('selectedAnswer')?.toString();
		const qId = formData.get('qId')?.toString();
		const index = formData.get('index')?.toString();
		const id = cookies.get('quizSessionId');
		console.log('before', selectedAnswer, qId, index);

		if (!selectedAnswer || !id || !qId || !index) {
			return { message: 'could not submit answer. Pleast retry' };
		}
		console.log(selectedAnswer, qId, index);

		const preAns = userAnswers.get(id);
		if (preAns) {
			preAns.answer.push({ id: qId, ans: selectedAnswer });
		} else {
			userAnswers.set(id, {
				answer: [
					{
						id: qId,
						ans: selectedAnswer
					}
				],
				createdAt: Date.now(),
				index: index
			});
		}
		console.log(userAnswers);

		// console.log('selectedAnswer from submitanswer action', selectedAnswer);
		// console.log('selectedAnswer from submitanswer action', id);
		// console.log('selectedAnswer from submitanswer action', qId);
	}
};
