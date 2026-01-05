import { getPosts } from '$lib/server/models/posts';

export const load = async () => {
	return getPosts();
};
