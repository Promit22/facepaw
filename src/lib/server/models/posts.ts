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

export function getPosts(id?: number) {
	const postsByDId = db.prepare(
		`
			SELECT posts.id AS postId, posts.title, posts.content, posts.created_At, posts.likes_count, image.path as imagePath
			FROM posts LEFT JOIN image ON posts.id = image.post_id WHERE posts.user_id = ? ORDER BY posts.created_At DESC
		`
	);

	const allPosts = db.prepare(
		`
			SELECT posts.id AS postId, posts.title, posts.content, posts.created_At, posts.likes_count, posts.user_id, image.path as imagePath
			FROM posts LEFT JOIN image ON posts.id = image.post_id ORDER BY posts.created_At DESC
		`
	);
	if (id !== undefined) {
		return postsByDId.all(id) as Post[];
	}
	return allPosts.all() as Post[];
}

function getLikes(postId: number): number {
	const row = db.prepare(`SELECT likes_count FROM posts WHERE id = ?`).get(postId) as
		| { likes_count?: number }
		| undefined;

	return row?.likes_count ?? 0;
}

export function addLikeToPost(id: number) {
	console.log('called like function');

	db.prepare(
		`
		UPDATE posts SET likes_count = likes_count + 1 where id = ?;
		`
	).run(id);
}

export function addLike(post_id: number, user_id: number) {
	db.prepare(
		`
		INSERT INTO post_likes (post_id, user_id) VALUES(?, ?)
		`
	).run(post_id, user_id);
}

export function removeLikeFromPost(id: number) {
	console.log('called remove like from posts');

	db.prepare(
		`
	 	UPDATE posts SET likes_count = likes_count - 1 WHERE id = ?
		`
	).run(id);
}

export function removeLike(post_id: number, user_id: number) {
	console.log('called remove like function');

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
			console.log(post_id, user_id);

			console.log('likes from posts.ts', liked);

			if (liked) {
				removeLike(post_id, user_id);
				removeLikeFromPost(post_id);
			} else {
				addLike(post_id, user_id);
				addLikeToPost(post_id);
			}
			return {
				likes_count: getLikes(post_id)
			};
		});
		return trans();
	} catch (e) {
		return { message: 'failed to like' };
	}
}
