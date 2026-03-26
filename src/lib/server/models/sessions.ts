import type { User } from '$lib/types/user';
import { db } from '../db/db';
import crypto from 'node:crypto';
import { quizStore } from '../quiz/quizStore';

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

export function checkIfQuizSessionValid(sessionId: string) {
	console.log('sessionid from check', sessionId);
	console.log('quizstore from check', quizStore);

	const session = quizStore.get(sessionId)?.expiresAt;
	console.log('session from check', session);

	if (!session) {
		return false;
	} else {
		if ((session - Date.now()) / 1000 > 10) {
			return true;
		} else {
			return false;
		}
	}
}
