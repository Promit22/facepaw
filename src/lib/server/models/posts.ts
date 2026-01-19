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

export function addLikeToPost(id: number) {
	console.log('called like function');

	return db
		.prepare(
			`
		UPDATE posts SET likes_count = likes_count + 1 where id = ?;
		`
		)
		.run(id);
}

export function addLike(post_id: number, user_id: number) {
	db.prepare(
		`
		INSERT INTO post_like (post_id, user_id) VALUES(?, ?)
		`
	).run(post_id, user_id);
}

export function removeLikeFromPost(id: number) {
	return db
		.prepare(
			`
	 	UPDATE posts SET likes_count = likes_count - 1 WHERE id = ?
		`
		)
		.run(id);
}

export function removeLike(post_id: number, user_id: number) {
	db.prepare(
		`
		DELETE FROM post_likes
		where post_id = ? AND user_id = ?
		`
	).run(post_id, user_id);
}

export function hasLiked(post_id: number, user_id: number) {
	const row = db
		.prepare(
			`
		SELECT 1 FROM post_likes
	    WHERE post_id = ? AND user_id = ?
		`
		)
		.get(post_id, user_id);

	return !!row;
}

export function toggleLike(post_id: number, user_id: number) {
	try {
		const trans = db.transaction(() => {
			const liked = hasLiked(post_id, user_id);
			if (liked) {
				removeLike(post_id, user_id);
				removeLikeFromPost(post_id);
				return { liked: false };
			} else {
				addLike(post_id, user_id);
				addLikeToPost(post_id);
				return { liked: true };
			}
		});
		trans();
	} catch (e) {
		return { message: 'failed to like' };
	}
}
