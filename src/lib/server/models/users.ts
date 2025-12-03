import type { User } from '$lib/types/user';
import { db } from '../db/db';

export function createUser(name: string, email: string, password: string) {
	return db
		.prepare(`INSERT INTO users (name, email, password) VALUES(?, ?, ?)`)
		.run(name, email, password);
}

export function getUserByEmail(email: string): User | undefined {
	return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as User | undefined;
}
