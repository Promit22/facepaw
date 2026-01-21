import { getPosts, toggleLike } from '$lib/server/models/posts';
// import type { Post } from '$lib/types/post';

export const load = async () => {
	const posts = getPosts();
	console.log('posts from page server', posts);

	return { posts };
};

export const actions = {
	like: async ({ request }) => {
		const data = await request.formData();
		const postId = Number(data.get('postId'));
		const userId = Number(data.get('userId'));
		if (postId && userId) {
			console.log(userId, 'liked', 'postid', postId);

			return toggleLike(postId, userId);
			// const likeStatus = toggleLike(postId, userId);
			// console.log('likestatus', likeStatus);
		}
	}
};

//next stop: precision like
