import type { User } from '$lib/types/user';
import { db } from '../db/db';
import crypto from 'node:crypto';
import { quizStore } from '../quiz/quizStore';
import type { Quiz, QuizQuestion } from '$lib/types/quizQuestion';

export function createSession(session_id: string, user_id: number, expires_at: number) {
	db.prepare(
		`
            INSERT INTO quiz_sessions (id, user_id, expires_at)
            VALUES (?, ?, ?, ?)
        `
	).run(session_id, user_id, expires_at);
}
//this function is not production ready(credentials exposed)
export function getUserFromSession(id: string): User | undefined {
	return db
		.prepare(
			`SELECT users.* 
			 FROM sessions
			 JOIN users ON users.id = sessions.user_id
			 WHERE sessions.id = ?`
		)
		.get(id) as User | undefined;
}

export function deleteSessioin(id: string) {
	db.prepare(`DELETE FROM sessions WHERE id = ?`).run(id);
}

export function insertQuiz(
	questions_row_id: string,
	session_id: string,
	position: number,
	questions: Quiz[]
) {
	db.prepare(
		`
            INSERT INTO quiz_questions (id, session_id, position, question)
            VALUES (?, ?, ?, ?)
        `
	).run(questions_row_id, session_id, position, JSON.stringify(questions));
}

export function getSession(user_id: number, expires_at: number) {
	return db
		.prepare(
			`
			SELECT * FROM quiz_sessions
        WHERE user_id = ? AND status = 'active' AND expires_at > ?
		`
		)
		.get(user_id, expires_at) as QuizQuestion;
}

export function getQuestions(session_id: string) {
	return db
		.prepare(
			`
			SELECT questions FROM quiz_questions WHERE session_id = ?
		`
		)
		.get(session_id);
}

export function updateSessionTime(expiresAt: number, id: string) {
	return db
		.prepare(
			`
			UPDATE quiz SET expiresAt = ? WHERE id = ?
		`
		)
		.run(expiresAt, id);
}

export function insertAnswer(
	sessionId: string,
	questionId: string,
	answer: string,
	createdAt: number = Date.now()
) {
	db.prepare(
		`
			INSERT INTO users_answer (id, qId, answer, createdAt) values(?, ?, ?, ?) ON CONFLICT DO UPDATE SET answer = excluded.answer
		`
	).run(sessionId, questionId, answer, createdAt);
}

export function getPreAns(sessionId: string) {
	return db
		.prepare(
			`
			SELECT qId, answer FROM users_answer where id = ?
		`
		)
		.all(sessionId) as { qId: string; answer: string }[];
}

export function checkIfQuizSessionValid(sessionId: string) {
	console.log('sessionid from check', sessionId);
	console.log('quizstore from check', quizStore);

	const session = getSession(sessionId);
	// console.log('/');
	console.log('session expiresAt', session.expiresAt);

	console.log('session from check', session);

	if (!session) {
		return { valid: false, session: null };
	} else {
		if (session.expiresAt - Date.now() > 10000) {
			return { valid: true, session };
		} else {
			return { valid: false, session: null };
		}
	}
}
