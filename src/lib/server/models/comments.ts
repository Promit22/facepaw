import { db } from '../db/db';

export function getCommentsByPostId(postId: number) {
	return db
		.prepare(
			`
        SELECT comments.id, comments.content, comments.created_at, comments.updated_at,
               users.id as userId, users.name, users.image
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.post_id = ?
        ORDER BY comments.created_at ASC
    `
		)
		.all(postId);
}

export function addComment(postId: number, userId: number, content: string) {
	return db
		.prepare(
			`
        INSERT INTO comments (post_id, user_id, content)
        VALUES (?, ?, ?)
    `
		)
		.run(postId, userId, content);
}

export function deleteComment(commentId: number, userId: number) {
	// user_id check ensures users can only delete their own comments
	return db
		.prepare(
			`
        DELETE FROM comments WHERE id = ? AND user_id = ?
    `
		)
		.run(commentId, userId);
}

export function editComment(commentId: number, userId: number, content: string) {
	return db
		.prepare(
			`
        UPDATE comments
        SET content = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
        WHERE id = ? AND user_id = ?
    `
		)
		.run(content, commentId, userId);
}
