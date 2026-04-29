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
	createSession
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

export const load = async ({ locals, params }) => {
	const user = locals.user;
	if (!user) throw redirect(302, '/login');

	// Check for an active, non-expired session for this user+mode
	// const session = db
	// 	.prepare(
	// 		`
	//     SELECT * FROM quiz_sessions
	//     WHERE user_id = ? AND status = 'active' AND expires_at > ?
	// `
	// 	)
	// 	.get(user.id,) as QuizSession | undefined;
	const session = getSession(user.id, Math.floor(Date.now() / 1000));
	if (!session) {
		return { started: false };
	}

	const row = JSON.parse(getQuestions(session.id));

	// const allQuestions: Question[] = JSON.parse(row.question);

	// How many has the user answered so far?
	const answers = db
		.prepare(
			`
        SELECT * FROM quiz_answers WHERE session_id = ?
    `
		)
		.all(session.id) as QuizAnswer[];

	const currentIndex = answers.length;

	// Strip correct_answer before sending to client
	const safeQuestions = allQuestions.map(({ correct_answer, ...rest }) => rest);

	return {
		started: true,
		sessionId: session.id,
		questions: safeQuestions,
		currentIndex,
		score: session.score,
		expiresAt: session.expires_at
	};
};

// export const load = (async ({ cookies }) => {
// 	const sessionCookie = cookies.get('quizSessionId');
// 	console.log('sessionCookie', sessionCookie);

// 	if (sessionCookie) {
// 		console.log('sessionCookie available');

// 		const isSessionValid = checkIfQuizSessionValid(sessionCookie);
// 		console.log(isSessionValid);

// 		if (isSessionValid.valid) {
// 			console.log('session is valid');

// 			console.log('useranswers sessioncookie', userAnswers.get(sessionCookie));
// 			console.log('userAnswers', userAnswers);
// 			if (isSessionValid.session && typeof isSessionValid.session?.questions === 'string') {
// 				console.log('session exists and typeof question is string');

// 				isSessionValid.session.questions = JSON.parse(isSessionValid.session.questions);
// 				console.log('question after pare', isSessionValid.session.questions);
// 			}
// 			const currentIndex = getPreAns(sessionCookie).length;

// 			if (isSessionValid.session && currentIndex) {
// 				console.log('session and correctindex exists', currentIndex);

// 				console.log('currentIndex', currentIndex);
// 				if (typeof isSessionValid.session.questions === 'string') return;
// 				console.log('typeof questions is no longer/not string');

// 				return {
// 					questions: isSessionValid.session.questions.map((q) => ({
// 						id: q.id,
// 						type: q.type,
// 						question: q.question,
// 						options: q.options,
// 						image: q.imageUrl
// 					})),
// 					currentIndex,
// 					sessionId: sessionCookie,
// 					expiresAt: isSessionValid.session.expiresAt
// 				};
// 			}
// 		}
// 	}

// 	const breeds = await readBreed('cat');
// 	const sessionId: `${string}-${string}-${string}-${string}-${string}` = crypto.randomUUID();
// 	const quiz: Quiz[] = generateQuizSession(breeds, 2);
// 	// console.log('quiz', quiz);
// 	insertQuiz({ id: sessionId, questions: quiz, createdAt: Date.now(), expiresAt: 0 });
// 	// quizStore.set(sessionId, { question: quiz, createdAt: Date.now(), expiresAt: 0 });
// 	// console.log(pendingQuiz);
// 	cookies.set('quizSessionId', sessionId, {
// 		path: '/',
// 		httpOnly: true,
// 		sameSite: 'strict',
// 		maxAge: 10 * 60
// 	});
// 	return { sessionId };
// }) satisfies PageServerLoad;

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
	if (session && typeof session.questions === 'string')
		session.questions = JSON.parse(session.questions);
	for (const userAnswer of userAnswers) {
		const question = session.questions.find((q) => q.id === userAnswer.questionId);
		// console.log('questionId', userAnswer.questionId);
		// console.log('questionId', userAnswer.answer);

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
	// return { score, total };
}

export const actions = {
	start: async ({ locals, params }) => {
		const user = locals.user;
		if (!user) throw error(401);

		const mode = params.mode;
		const now = Math.floor(Date.now() / 1000);

		// Expire any leftover active sessions for this user+mode
		db.prepare(
			`
            UPDATE quiz_sessions SET status = 'expired'
            WHERE user_id = ? AND mode = ? AND status = 'active'
        `
		).run(user.id, mode);

		// Generate questions using your existing generator
		const breed = await readBreed('cat');
		const questions = generateQuizSession(breed); // returns array of 10 objects

		const sessionId = randomUUID();
		const questionsRowId = randomUUID();
		const expiresAt = now + 360; // 6 minutes hard cutoff

		createSession(sessionId, user.id, expiresAt);
		// db.prepare(
		// 	`
		//     INSERT INTO quiz_sessions (id, user_id, mode, expires_at)
		//     VALUES (?, ?, ?, ?)
		// `
		// ).run(sessionId, user.id, mode, expiresAt);

		insertQuiz(questionsRowId, sessionId, 0, questions);
		db.prepare(
			`
            INSERT INTO quiz_questions (id, session_id, position, question)
            VALUES (?, ?, ?, ?)
        `
		).run(questionsRowId, sessionId, 0, JSON.stringify(questions));

		return { success: true };
	},

	answer: async ({ request, locals }) => {
		const user = locals.user;
		if (!user) throw error(401);

		const data = await request.formData();
		const sessionId = data.get('sessionId')?.toString();
		const questionId = data.get('questionId')?.toString();
		const givenAnswer = data.get('answer')?.toString();

		if (!sessionId || !questionId || !givenAnswer) throw error(400);

		const now = Math.floor(Date.now() / 1000);

		// Validate session belongs to user and isn't expired
		const session = db
			.prepare(
				`
            SELECT * FROM quiz_sessions
            WHERE id = ? AND user_id = ? AND status = 'active' AND expires_at > ?
        `
			)
			.get(sessionId, user.id, now) as QuizSession | undefined;

		if (!session) throw error(403, 'Session invalid or expired');

		// Get correct answer from DB — never trust the client
		const row = db
			.prepare(
				`
            SELECT question FROM quiz_questions WHERE session_id = ?
        `
			)
			.get(sessionId) as QuizQuestionsRow;

		const questions: Question[] = JSON.parse(row.question);
		const question = questions.find((q) => q.id === questionId);

		if (!question) throw error(404, 'Question not found');

		const isCorrect = givenAnswer === question.correct_answer ? 1 : 0;

		db.prepare(
			`
            INSERT INTO quiz_answers (session_id, question_id, given_answer, is_correct)
            VALUES (?, ?, ?, ?)
        `
		).run(sessionId, questionId, givenAnswer, isCorrect);

		if (isCorrect) {
			db.prepare(
				`
                UPDATE quiz_sessions SET score = score + 1 WHERE id = ?
            `
			).run(sessionId);
		}

		// Update position
		const answerCount = (
			db
				.prepare(
					`
            SELECT COUNT(*) as count FROM quiz_answers WHERE session_id = ?
        `
				)
				.get(sessionId) as { count: number }
		).count;

		if (answerCount >= 10) {
			db.prepare(
				`
                UPDATE quiz_sessions SET status = 'completed' WHERE id = ?
            `
			).run(sessionId);
		} else {
			db.prepare(
				`
                UPDATE quiz_questions SET position = ? WHERE session_id = ?
            `
			).run(answerCount, sessionId);
		}

		return {
			isCorrect: !!isCorrect,
			correctAnswer: question.correct_answer
		};
	}
};

// export const actions = {
// 	submitAns: async ({ request }) => {
// 		const formData = await request.formData();
// 		const sessionId = formData.get('sessionId')?.toString();
// 		const answers = formData.get('answers')?.toString();
// 		if (!sessionId || !answers) {
// 			return;
// 		}
// 		const obj = JSON.parse(answers);
// 		// console.log(sessionId, answers, obj);
// 		const result = gradeQuizSession(sessionId, obj);
// 		// console.log('result from action', result);

// 		// return { score: result.score, total: result.total, accuracy: result.accuracy };
// 		return result;
// 	},
// 	startQuiz: async ({ request, cookies }) => {
// 		// const formData = await request.formData();
// 		// const sessionId = formData.get('sessionId')?.toString();
// 		// console.log('sessionid from start action', sessionId);
// 		const sessionId = cookies.get('quizSessionId');
// 		if (!sessionId) return { message: 'Could not start quiz. Please start again' };
// 		const quiz = getSession(sessionId);
// 		if (!quiz) return { message: 'Could not start quiz. Please start again' };
// 		const expiresAt = Date.now() + 123000;
// 		updateSessionTime(expiresAt, sessionId);
// 		// console.log('quiz from start quiz action', quiz);

// 		const currentQuiz = getSession(sessionId);
// 		if (!currentQuiz) return { message: 'Could not start quiz. Please start again' };
// 		console.log(typeof currentQuiz.questions);
// 		if (typeof currentQuiz.questions !== 'string') return;
// 		return {
// 			sessionId,
// 			questions: JSON.parse(currentQuiz.questions).map((q) => ({
// 				id: q.id,
// 				type: q.type,
// 				question: q.question,
// 				options: q.options,
// 				image: q.imageUrl
// 			})),
// 			expiresAt
// 		};
// 	},
// 	submitAnswer: async ({ request, cookies }) => {
// 		console.log('triggered submitanswer action');

// 		const formData = await request.formData();
// 		const selectedAnswer = formData.get('selectedAnswer')?.toString();
// 		const qId = formData.get('qId')?.toString();
// 		const index = formData.get('index')?.toString();
// 		const id = cookies.get('quizSessionId');
// 		console.log('before', selectedAnswer, qId, index);

// 		if (!selectedAnswer || !id || !qId || !index) {
// 			return { message: 'could not submit answer. Pleast retry' };
// 		}
// 		console.log(selectedAnswer, qId, index);
// 		insertAnswer(id, qId, selectedAnswer);
// 		// const preAns = getPreAns(id);
// 		// if (preAns) {
// 		// 	preAns.answer.push({ id: qId, ans: selectedAnswer });
// 		// } else {
// 		// 	userAnswers.set(id, {
// 		// 		answer: [
// 		// 			{
// 		// 				id: qId,
// 		// 				ans: selectedAnswer
// 		// 			}
// 		// 		],
// 		// 		createdAt: Date.now(),
// 		// 		index: index
// 		// 	});
// 		// }
// 		console.log(userAnswers);

// 		// console.log('selectedAnswer from submitanswer action', selectedAnswer);
// 		// console.log('selectedAnswer from submitanswer action', id);
// 		// console.log('selectedAnswer from submitanswer action', qId);
// 	}
// };
