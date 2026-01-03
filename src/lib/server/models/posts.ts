import { db } from '../db/db';
// import crypto from 'node:crypto';

export function createPost(user_id: number, title: string, content: string) {
	return db
		.prepare(
			`
        INSERT INTO posts (user_id, title, content) VALUES(?, ?, ?))
        `
		)
		.run(user_id, title, content);
}
