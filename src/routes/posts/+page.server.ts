import { getPosts } from '$lib/server/models/posts';
// import type { Post } from '$lib/types/post';

export const load = async () => {
	const posts = getPosts();
	return { posts };
};
