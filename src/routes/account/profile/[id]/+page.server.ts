import type { PageServerLoad } from './$types';
import { deletePost, getOldPost, getPosts, getUserIdFromPosts } from '$lib/server/models/posts';
import { getUserById } from '$lib/server/models/users';
import { deleteUserSession } from '$lib/server/models/sessions.js';
import { redirect, fail } from '@sveltejs/kit';
import { deleteUploadedFile } from '$lib/server/models/cleaner.js';
export const load: PageServerLoad = async ({ params }) => {
	// const { id }: { id: string } = params;
	const id = Number(params.id);
	const puser = getUserById(id);
	console.log('puser from profile', puser);
	const posts = getPosts(id);

	return { posts, puser };
};

export const actions = {
	logout: async (event) => {
		const id = event.cookies.get('session');
		console.log('id', id);
		deleteUserSession(id ? id : '');
		event.locals.user = null;
		event.cookies.delete('session', { path: '/' });
		throw redirect(303, '/account/connect');
	},

	deletePost: async ({ request, locals }) => {
		console.log('in delete post action');

		const user = locals.user;
		if (!user) return fail(401, { message: 'Not logged in' });

		const data = await request.formData();
		const postId = Number(data.get('postId'));
		console.log('postId', postId);

		if (!postId || typeof postId !== 'number') {
			return fail(400, { message: 'Invalid post ID' });
		}
		console.log('going to check ownership');

		// Ownership check — never trust the client alone
		const post = getUserIdFromPosts(postId);
		console.log('post', post);

		if (!post) return fail(404, { message: 'Post not found' });
		if (post.user_id !== user.id) return fail(403, { message: 'Not your post' });
		console.log('deleting post');
		const postPath = getOldPost(postId);
		await deleteUploadedFile(postPath?.path);
		deletePost(postId);

		// Stay on the same profile page; SvelteKit will re-run load()
		return { success: true };
	}
};
