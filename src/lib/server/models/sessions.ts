import type { User } from '$lib/types/user';
import { db } from '../db/db';
import crypto from 'node:crypto';
import { quizStore } from '../quiz/quizStore';
import type {
	Quiz,
	QuizAnswerRow,
	QuizQuestion,
	QuizSessionQuestion
} from '$lib/types/quizQuestion';

export function createSession(session_id: string, user_id: number | null, expires_at: number) {
	db.prepare(
		`
            INSERT INTO quiz_sessions (id, user_id, expires_at)
            VALUES (?, ?, ?)
        `
	).run(session_id, user_id, expires_at);
}

export function createUserSession(userId: number) {
	const id = crypto.randomUUID();

	db.prepare(
		`
		INSERT INTO sessions (id, user_id)
		VALUES (?, ?)
	`
	).run(id, userId);

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

export function expireSession(id: number | null) {
	db.prepare(
		`
            UPDATE quiz_sessions SET status = 'expired'
            WHERE user_id = ? AND status = 'active'
        `
	).run(id);
}

export function deleteUserSession(id: string) {
	db.prepare(`DELETE FROM sessions WHERE id = ?`).run(id);
}

export function deleteSession() {
	db.prepare(`DELETE FROM quiz_sessions WHERE status = 'expired'`).run();
}

export function insertQuiz(
	questions_row_id: string,
	session_id: string,
	position: number,
	questions: Quiz[]
) {
	db.prepare(
		`
            INSERT INTO quiz_questions (id, session_id, position, questions)
            VALUES (?, ?, ?, ?)
        `
	).run(questions_row_id, session_id, position, JSON.stringify(questions));
}

export function getSession(user_id: number | undefined, expires_at: number) {
	return db
		.prepare(
			`
			SELECT * FROM quiz_sessions
        WHERE user_id = ? AND status = 'active' AND expires_at > ?
		`
		)
		.get(user_id, expires_at) as QuizQuestion;
}

export function getSessionById(id: string, expires_at: number) {
	return db
		.prepare(
			`
        SELECT * FROM quiz_sessions
        WHERE id = ? AND status = 'active' AND expires_at > ?
    `
		)
		.get(id, expires_at) as QuizQuestion;
}

export function getCompletedSession(id: string) {
	return db
		.prepare(
			`
        SELECT * FROM quiz_sessions
        WHERE id = ? AND status = 'completed'
    `
		)
		.get(id) as QuizQuestion;
}

export function getQuestions(session_id: string | undefined) {
	const row = db
		.prepare(`SELECT questions FROM quiz_questions WHERE session_id = ?`)
		.get(session_id) as { questions: string } | undefined;

	return row?.questions;
}

// export function getQuestions(session_id: string | undefined) {
// 	return db
// 		.prepare(
// 			`
// 			SELECT questions FROM quiz_questions WHERE session_id = ?
// 		`
// 		)
// 		.get(session_id) as string;
// }

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
	session_id: string,
	question_id: string,
	given_answer: string,
	is_correct: 1 | 0
) {
	db.prepare(
		`
        INSERT OR IGNORE INTO quiz_answers (session_id, question_id, given_answer, is_correct) 
        VALUES (?, ?, ?, ?)
    `
	).run(session_id, question_id, given_answer, is_correct);
}

// export function insertAnswer(
// 	session_id: string,
// 	question_id: string,
// 	given_answer: string,
// 	is_correct: 1 | 0
// ) {
// 	db.prepare(
// 		`
// 			INSERT INTO quiz_answers (session_id, question_id, given_answer, is_correct) values(?, ?, ?, ?)
// 		`
// 	).run(session_id, question_id, given_answer, is_correct);
// }

export function getAns(sessionId: string | undefined) {
	return db
		.prepare(
			`
        SELECT * FROM quiz_answers WHERE session_id = ?
    `
		)
		.all(sessionId) as QuizAnswerRow[];
}

export function incrementScore(session_id: string) {
	db.prepare(
		`
                UPDATE quiz_sessions SET score = score + 1 WHERE id = ?
            `
	).run(session_id);
}

export function countAnswer(session_id: string) {
	return db
		.prepare(
			`
            SELECT COUNT(*) as count FROM quiz_answers WHERE session_id = ?
        `
		)
		.get(session_id) as { count: number };
}

export function updateQuizSession(session_id: string) {
	db.prepare(
		`
                UPDATE quiz_sessions SET status = 'completed' WHERE id = ?
            `
	).run(session_id);
}

export function updateQuizQuestion(answer_count: number, session_id: string) {
	db.prepare(
		`
                UPDATE quiz_questions SET position = ? WHERE session_id = ?
            `
	).run(answer_count, session_id);
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
