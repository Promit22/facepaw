import { getPosts, like } from '$lib/server/models/posts';
// import type { Post } from '$lib/types/post';

export const load = async () => {
	const posts = getPosts();
	return { posts };
};

export const actions = {
	like: async ({ request }) => {
		const data = await request.formData();
		const postId = Number(data.get('postId'));
		like(postId);
		// if (typeof postId === 'number') like(postId);
		console.log('post id from post server', postId);
	}
};

//next stop: precision like
