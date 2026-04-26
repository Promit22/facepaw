import { getPosts, toggleLike } from '$lib/server/models/posts';
import {
	getCommentsByPostId,
	addComment,
	deleteComment,
	editComment
} from '$lib/server/models/comments';
import type { PageServerLoad } from './$types.js';
import { getUserById } from '$lib/server/models/users.js';
import type { Post } from '$lib/types/post.js';

export const load: PageServerLoad = async () => {
	const posts = getPosts();
	const postsAndUsers: {
		post: Post;
		puser: { name: string; id: number; image: string };
		comments: any[];
	}[] = [];

	posts.forEach((post) => {
		const user = getUserById(post.user_id);
		const comments = getCommentsByPostId(post.postId);
		postsAndUsers.push({ post, puser: user, comments });
	});

	return { postsAndUsers };
};

export const actions = {
	like: async ({ request }) => {
		const data = await request.formData();
		const postId = Number(data.get('postId'));
		const userId = Number(data.get('userId'));
		if (postId && userId) {
			return toggleLike(postId, userId);
		}
	},

	addComment: async ({ request }) => {
		const data = await request.formData();
		const postId = Number(data.get('postId'));
		const userId = Number(data.get('userId'));
		const content = String(data.get('content')).trim();
		if (!content) return { error: 'Comment cannot be empty' };
		if (postId && userId) {
			addComment(postId, userId, content);
			return { comments: getCommentsByPostId(postId) };
		}
	},

	deleteComment: async ({ request }) => {
		const data = await request.formData();
		const commentId = Number(data.get('commentId'));
		const userId = Number(data.get('userId'));
		const postId = Number(data.get('postId'));
		if (commentId && userId) {
			deleteComment(commentId, userId);
			return { comments: getCommentsByPostId(postId) };
		}
	},

	editComment: async ({ request }) => {
		const data = await request.formData();
		const commentId = Number(data.get('commentId'));
		const userId = Number(data.get('userId'));
		const postId = Number(data.get('postId'));
		const content = String(data.get('content')).trim();
		if (!content) return { error: 'Comment cannot be empty' };
		if (commentId && userId) {
			editComment(commentId, userId, content);
			return { comments: getCommentsByPostId(postId) };
		}
	}
};

// import { getPosts, toggleLike } from '$lib/server/models/posts';
// import type { PageServerLoad } from './$types.js';
// import { getUserById } from '$lib/server/models/users.js';
// import type { Post } from '$lib/types/post.js';
// // import type { Post } from '$lib/types/post';

// /*
//  it will be great if this load could return the relevant user along with each post
// */

// export const load: PageServerLoad = async () => {
// 	const posts = getPosts();
// 	// const length = posts.length;
// 	const postsAndUsers: { post: Post; puser: { name: string; id: number; image: string } }[] = [];
// 	// for (let i = 0; i < length; i++) {
// 	// 	const post = posts[i];
// 	// 	const user = getUserById(post.user_id);
// 	// 	postsAndUsers.push({ post: post, user: user });
// 	// 	console.log('times');
// 	// }

// 	posts.forEach((post) => {
// 		const user = getUserById(post.user_id);
// 		postsAndUsers.push({ post: post, puser: user });
// 		console.log('times');
// 	});

// 	return { postsAndUsers };
// };

// export const actions = {
// 	like: async ({ request }) => {
// 		const data = await request.formData();
// 		const postId = Number(data.get('postId'));
// 		const userId = Number(data.get('userId'));
// 		if (postId && userId) {
// 			return toggleLike(postId, userId);
// 			// const likeStatus = toggleLike(postId, userId);
// 			//
// 		}
// 	}
// };

// //next stop: precision like
