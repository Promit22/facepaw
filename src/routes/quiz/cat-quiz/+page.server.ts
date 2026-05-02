import { randomUUID } from 'node:crypto';
import type { PageServerLoad } from './$types';
import { generateQuizSession } from '$lib/server/models/question';
import { readBreed } from '$lib/server/models/breedCache';
import { quizStore } from '$lib/server/quiz/quizStore';
import type { PendingQuiz } from '$lib/types/quizQuestion';
// import type { QuizQuestion } from '$lib/types/quizQuestion';
import type { Quiz } from '$lib/types/quizQuestion';
import {
	checkIfQuizSessionValid,
	insertQuiz,
	getSession,
	updateSessionTime,
	getPreAns,
	insertAnswer,
	getQuestions,
	createSession,
	expireSession,
	deleteSession,
	getAns,
	incrementScore,
	countAnswer,
	updateQuizSession,
	updateQuizQuestion,
	getSessionById,
	getCompletedSession
} from '$lib/server/models/sessions.js';

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

export const load = async ({ locals, cookies }) => {
	const user = locals.user;
	const now = Math.floor(Date.now() / 1000);

	const session = getSession(user?.id, now);
	const guestQuizSession = cookies.get('guestQuizSession');

	const sessionId = user ? session?.id : guestQuizSession;
	if (!sessionId) return { started: false };

	// resolve the actual session row for both user and guest
	const resolvedSession = session ?? getSessionById(sessionId, now);
	if (!resolvedSession) return { started: false };

	const raw = getQuestions(sessionId);
	if (!raw) return { started: false };
	const question = JSON.parse(raw);

	const answers = getAns(sessionId);
	const currentIndex = answers.length;
	const safeQuestions = question.map(({ correct_answer, ...rest }) => rest);

	return {
		started: true,
		sessionId,
		questions: safeQuestions,
		currentIndex,
		score: resolvedSession.score ?? 0,
		expiresAt: resolvedSession.expires_at ?? 0 // now correct for guests too
	};
};

// export const load = async ({ locals, cookies }) => {
// 	const user = locals.user;

// 	const session = getSession(user?.id, Math.floor(Date.now() / 1000));
// 	const guestQuizSession = cookies.get('guestQuizSession');

// 	const sessionId = user ? session?.id : guestQuizSession;

// 	if (!sessionId) {
// 		return { started: false };
// 	}

// 	const raw = getQuestions(sessionId);
// 	if (!raw) return { started: false };
// 	const question = JSON.parse(raw);

// 	const answers = getAns(sessionId);

// 	const currentIndex = answers.length;
// 	console.log('currentIndex from load', currentIndex, 'answers', answers);
// 	const safeQuestions = question.map(({ correct_answer, ...rest }) => rest);

// 	return {
// 		started: true,
// 		sessionId,
// 		questions: safeQuestions,
// 		currentIndex,
// 		score: session?.score ?? 0,
// 		expiresAt: session?.expires_at ?? 0
// 	};
// };

function gradeQuizSession(
	sessionId: string,
	userAnswers: { questionId: string; answer: string }[]
) {
	const MAX_AGE = 5 * 60 * 1000;

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
	if (session && typeof session.questions === 'string')
		session.questions = JSON.parse(session.questions);
	for (const userAnswer of userAnswers) {
		const question = session.questions.find((q) => q.id === userAnswer.questionId);

		if (!question) continue;

		if (question.correctAnswer === userAnswer.answer) {
			score++;
		}
	}

	const total = session.questions.length;
	const accuracy = Math.round((score / total) * 100);

	return {
		score,
		total,
		accuracy
	};
}

export const actions = {
	start: async ({ locals, cookies }) => {
		console.log('clicked start');

		const userId = locals.user?.id ?? null;
		const sessionId = randomUUID();
		if (!userId) {
			cookies.set('guestQuizSession', sessionId, {
				path: '/',
				maxAge: 360
			});
		}

		// const mode = params.mode;
		const now = Math.floor(Date.now() / 1000);

		// Expire any leftover active sessions for this user+mode
		expireSession(userId);
		deleteSession();

		const breed = await readBreed('cat');
		const questions = generateQuizSession(breed);

		const questionsRowId = randomUUID();
		const expiresAt = now + 360;

		createSession(sessionId, userId, expiresAt);

		insertQuiz(questionsRowId, sessionId, 0, questions);

		const safeQuestions = questions.map(({ correct_answer, ...rest }) => rest);

		return {
			success: true,
			sessionId,
			questions: safeQuestions,
			expiresAt
		};
	},

	answer: async ({ request, locals, cookies }) => {
		const user = locals.user;
		const guestQuizSession = cookies.get('guestQuizSession');
		if (!user && !guestQuizSession) throw error(401);

		const data = await request.formData();
		const sessionId = data.get('sessionId')?.toString();
		const questionId = data.get('questionId')?.toString();
		const givenAnswer = data.get('answer')?.toString();

		if (!sessionId || !questionId || !givenAnswer) return { message: 'Missing data' };

		// Validate session belongs to user and isn't expired
		const now = Math.floor(Date.now() / 1000);
		const session = getSession(user?.id, now);
		const resolvedSessionId = user ? session?.id : guestQuizSession;

		if (!resolvedSessionId || resolvedSessionId !== sessionId) {
			return { message: 'Invalid session' };
		}

		// Get correct answer from DB — never trust the client
		const raw = getQuestions(sessionId);
		if (!raw) return { message: 'Questions not found' };

		const questions = JSON.parse(raw);
		const question = questions.find((q) => q.id === questionId);
		if (!question) return { message: 'Question not found' };

		const isCorrect = givenAnswer === question.correct_answer ? 1 : 0;
		insertAnswer(sessionId, questionId, givenAnswer, isCorrect);

		if (isCorrect) {
			incrementScore(sessionId);
		}

		// Update position
		const answerCount = countAnswer(sessionId).count;

		if (answerCount >= 10) {
			updateQuizSession(sessionId);
		} else {
			updateQuizQuestion(answerCount, sessionId);
		}

		return {
			isCorrect: !!isCorrect,
			correctAnswer: question.correct_answer
		};
	},
	getResult: async ({ locals, cookies }) => {
		const user = locals.user;
		const guestQuizSession = cookies.get('guestQuizSession');
		const now = Math.floor(Date.now() / 1000);

		const session = getSession(user?.id, now);
		const sessionId = user ? session?.id : guestQuizSession;
		if (!sessionId) return { message: 'No session found' };

		const completedSession = getCompletedSession(sessionId);
		if (!completedSession) return { message: 'Session not completed yet' };

		const answers = getAns(sessionId);
		const score = completedSession.score ?? 0;
		const total = answers.length;
		const accuracy = Math.round((score / total) * 100);

		return { score, total, accuracy };
	}
};
