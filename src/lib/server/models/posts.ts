import { db } from '../db/db';

export function createPost(user_id: number, title: string, content: string) {
	return db
		.prepare(
			`
        INSERT INTO posts (user_id, title, content) VALUES(?, ?, ?)
        `
		)
		.run(user_id, title, content);
}

export function getPosts() {
	const posts = db
		.prepare(
			`
			SELECT posts.id AS postId, posts.title, posts.content, posts.created_At, image.path as imagePath
			FROM posts LEFT JOIN image ON posts.id = image.post_id ORDER BY posts.created_At DESC
		`
		)
		.all();
	return { posts };
}
