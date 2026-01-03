import { db } from '../db/db';

export function storeImagePath(post_Id: number, path: string) {
	db.prepare(
		`
        INSERT INTO image (post_id, path) VALUES(?, ?)
        `
	).run(post_Id, path);
}
