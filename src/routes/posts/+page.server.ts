import { getPosts, toggleLike } from '$lib/server/models/posts';
// import type { Post } from '$lib/types/post';

export const load = async () => {
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
