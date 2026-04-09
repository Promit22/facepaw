import type { User } from '$lib/types/user';
import { db } from '../db/db';
import crypto from 'node:crypto';
import { quizStore } from '../quiz/quizStore';
import type { QuizQuestion } from '$lib/types/quizQuestion';

export function createSession(user_id: number) {
	const id = crypto.randomUUID();
	db.prepare(`INSERT INTO sessions (id, user_id) VALUES(?, ?)`).run(id, user_id);
	return id;
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

export function insertQuiz(quiz: QuizQuestion) {
	return db
		.prepare(
			`
			INSERT INTO quiz (id, questions, createdAt, expiresAt) VALUES(?, ?, ?, ?)
		`
		)
		.run(quiz.id, JSON.stringify(quiz.questions), quiz.createdAt, quiz.expiresAt);
}

export function getSession(id: string) {
	return db
		.prepare(
			`
			SELECT * from quiz where quiz.id = ?
		`
		)
		.get(id) as QuizQuestion;
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
