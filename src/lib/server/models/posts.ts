import type { Post } from '$lib/types/post';
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
	const posts: Post[] = db
		.prepare(
			`
			SELECT posts.id AS postId, posts.title, posts.content, posts.created_At, image.path as imagePath
			FROM posts LEFT JOIN image ON posts.id = image.post_id ORDER BY posts.created_At DESC
		`
		)
		.all() as Post[];
	console.log('posts from posts.ts', posts);

	return posts;
}

export function like(id: number) {
	return db
		.prepare(
			`
		UPDATE posts SET likes_count = likes_count + 1 where id = ?;
		`
		)
		.run(id);
}

export function unLike(id: number) {
	return db
		.prepare(
			`
	 	UPDATE posts SET likes_count = likes_count - 1 WHERE id = ?
		`
		)
		.run(id);
}
