import { getPosts, toggleLike } from '$lib/server/models/posts';
import type { PageServerLoad } from './$types.js';
import { getUserById } from '$lib/server/models/users.js';
import type { Post } from '$lib/types/post.js';
import type { User } from '$lib/types/user.js';
// import type { Post } from '$lib/types/post';

/*
 it will be great if this load could return the relevant user along with each post
*/

export const load: PageServerLoad = async () => {
	const posts = getPosts();
	const length = posts.length;
	const postsAndUsers: { post: Post; user: { name: string; email: string; id: number } }[] = [];
	for (let i = 0; i < length; i++) {
		const post = posts[i];
		const user = getUserById(post.user_id);
		postsAndUsers.push({ post: post, user: user });
	}

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
