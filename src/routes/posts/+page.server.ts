import { getPosts, toggleLike } from '$lib/server/models/posts';
import type { PageServerLoad } from './$types.js';
// import type { Post } from '$lib/types/post';

/*
 it will be great if this load could return the relevant user along with each post
*/

export const load: PageServerLoad = async () => {
	const posts = getPosts();

	return { posts };
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
