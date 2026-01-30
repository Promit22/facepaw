import { getPosts, toggleLike } from '$lib/server/models/posts';
import type { PageServerLoad } from './$types.js';
import { getUserById } from '$lib/server/models/users.js';
import type { Post } from '$lib/types/post.js';
// import type { Post } from '$lib/types/post';

/*
 it will be great if this load could return the relevant user along with each post
*/

export const load: PageServerLoad = async () => {
	const posts = getPosts();
	// const length = posts.length;
	const postsAndUsers: { post: Post; puser: { name: string; id: number } }[] = [];
	// for (let i = 0; i < length; i++) {
	// 	const post = posts[i];
	// 	const user = getUserById(post.user_id);
	// 	postsAndUsers.push({ post: post, user: user });
	// 	console.log('times');
	// }

	posts.forEach((post) => {
		const user = getUserById(post.user_id);
		postsAndUsers.push({ post: post, puser: user });
		console.log('times');
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
			// const likeStatus = toggleLike(postId, userId);
			//
		}
	}
};

//next stop: precision like
