import type { PageServerLoad } from './$types';
import { generateQuizSession } from '$lib/server/models/question';
import { readBreed } from '$lib/server/models/breedCache';
import { quizStore } from '$lib/server/quiz/quizStore';
import type { PendingQuiz } from '$lib/types/quizQuestion';
// import type { QuizQuestion } from '$lib/types/quizQuestion';
import type { Quiz } from '$lib/types/quizQuestion';

const pendingQuiz = new Map<string, PendingQuiz>();

function cleanExpiredPending() {
	const MAX_AGE = 30 * 60 * 1000;
	pendingQuiz.forEach((value, key) => {
		// console.log('value', value);
		if (Date.now() - value.createdAt > MAX_AGE) {
			pendingQuiz.delete(key);
		}
	});
}

export const load = (async () => {
	const breeds = await readBreed('cat');
	let sessionId: `${string}-${string}-${string}-${string}-${string}`;
	let quiz: Quiz[];
	quiz = generateQuizSession(breeds, 2);
	sessionId = crypto.randomUUID();
	// console.log('quiz', quiz);
	pendingQuiz.set(sessionId, { question: quiz, createdAt: Date.now() });
	console.log(pendingQuiz);
	// store correct answers in memory/db/cache
	return { sessionId };
}) satisfies PageServerLoad;

function gradeQuizSession(
	sessionId: string,
	userAnswers: { questionId: string; answer: string }[]
) {
	console.log('sessionid', sessionId);
	console.log('ans', userAnswers);

	const MAX_AGE = 5 * 60 * 1000; // 5 minutes

	for (const [id, session] of quizStore.entries()) {
		if (Date.now() - session.createdAt > MAX_AGE) {
			quizStore.delete(id);
		}
	}

	console.log('userAnswer', userAnswers);

	const session = quizStore.get(sessionId);
	// const sessionEntries = session.entries()
	if (!session) {
		throw new Error('Invalid session');
	}

	let score = 0;

	for (const userAnswer of userAnswers) {
		const question = session.question.find((q) => q.id === userAnswer.questionId);
		console.log('questionId', userAnswer.questionId);
		console.log('questionId', userAnswer.answer);

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
		console.log(sessionId, answers, obj);
		const result = gradeQuizSession(sessionId, obj);
		console.log('result from action', result);

		// return { score: result.score, total: result.total, accuracy: result.accuracy };
		return result;
	},
	startQuiz: async ({ request }) => {
		const formData = await request.formData();
		const sessionId = formData.get('sessionId')?.toString();
		const expiresAt = Date.now() + 123000;
		if (!sessionId) return { message: 'Could not start quiz. Please start again' };
		const quiz = pendingQuiz.get(sessionId);
		if (!quiz) return { message: 'Could not start quiz. Please start again' };
		quizStore.set(sessionId, {
			question: quiz.question,
			createdAt: Date.now(),
			expiresAt
		});
		console.log('quiz from start quiz action', quiz);
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
	submitAnswer: async ({ request }) => {
		console.log('triggered submitanswer action');

		const formData = await request.formData();
		const selectedAnswer = formData.get('selectedAnswer');
		console.log('selectedAnswer from submitanswer action', selectedAnswer);
	}
};
