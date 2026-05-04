import { randomUUID } from 'node:crypto';
import { generateQuizSession } from '$lib/server/models/question';
import { readBreed } from '$lib/server/models/breedCache';
import { error } from '@sveltejs/kit';
import {
	insertQuiz,
	getSession,
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
	getCompletedSession,
	cleanupSessions,
	getLatestSessionId
} from '$lib/server/models/sessions.js';
import { updateBestScore } from '$lib/server/models/users.js';

export const load = async ({ locals, cookies }) => {
	cleanupSessions();
	const user = locals.user;
	const now = Math.floor(Date.now() / 1000);

	const session = getSession(user?.id, now);
	const guestQuizSession = cookies.get('guestQuizSession');

	const sessionId = user ? session?.id : guestQuizSession;
	if (!sessionId) return { started: false };

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
		expiresAt: resolvedSession.expires_at ?? 0
	};
};

export const actions = {
	start: async ({ locals, cookies }) => {
		console.log('clicked start');

		const userId = locals.user?.id ?? null;
		const sessionId = randomUUID();
		if (!userId) {
			cookies.set('guestQuizSession', sessionId, {
				path: '/',
				maxAge: 363
			});
		}

		// const mode = params.mode;
		const now = Math.floor(Date.now() / 1000);
		expireSession(userId);
		deleteSession();

		const breed = await readBreed('dog');
		const sampled = breed.sort(() => Math.random() - 0.5).slice(0, 50);
		console.log('sampled', sampled.length);
		const questions = generateQuizSession(sampled); //to make it lightweight for railway free tier
		console.log('questions generated', questions.length);
		const questionsRowId = randomUUID();
		const expiresAt = now + 363;

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

		const raw = getQuestions(sessionId);
		if (!raw) return { message: 'Questions not found' };

		const questions = JSON.parse(raw);
		const question = questions.find((q) => q.id === questionId);
		if (!question) return { message: 'Question not found' };

		const isCorrect = givenAnswer === question.correctAnswer ? 1 : 0;
		insertAnswer(sessionId, questionId, givenAnswer, isCorrect);

		// console.log(
		// 	'givenAnswer',
		// 	givenAnswer,
		// 	'correct',
		// 	question.correctAnswer,
		// 	'isCorrect',
		// 	isCorrect
		// );
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
			correctAnswer: question.correctAnswer
		};
	},

	getResult: async ({ locals, cookies }) => {
		console.log('called getResule');

		const user = locals.user;
		const guestQuizSession = cookies.get('guestQuizSession');

		const session = getLatestSessionId(user?.id);
		const sessionId = user ? session : guestQuizSession;
		console.log('user:', user?.id);
		console.log('sessionId:', sessionId);
		if (!sessionId) return { message: 'No session found' };
		let resolvedSession = getCompletedSession(sessionId);
		console.log('resolvedSession:', resolvedSession);

		if (!resolvedSession) {
			updateQuizSession(sessionId);
			resolvedSession = getCompletedSession(sessionId);
		}

		if (!resolvedSession) return { message: 'Session not found' };

		const answers = getAns(sessionId);
		const score = resolvedSession.score ?? 0;
		const raw = getQuestions(sessionId);
		const allQuestions = JSON.parse(raw ? raw : '');
		const total = allQuestions.length;
		const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
		if (user) {
			updateBestScore(user.id, score, accuracy, 'dog');
		}

		const review = answers.map((ans) => {
			const q = allQuestions.find((q) => q.id === ans.question_id);
			return {
				id: q.id,
				question: q.question,
				yourAnswer: ans.given_answer,
				correctAnswer: q.correctAnswer,
				type: q.type,
				imageUrl: q.imageUrl ? q.imageUrl : undefined
			};
		});

		return { score, total, accuracy, review };
	}
};
