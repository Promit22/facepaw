import type { User } from '$lib/types/user';
import { db } from '../db/db';
import crypto from 'node:crypto';

export function createSession(user_id: number) {
	const id = crypto.randomUUID();
	db.prepare(`INSERT INTO sessions (id, user_id) VALUES(?, ?)`).run(id, user_id);
	return id;
}

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
