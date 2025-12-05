import type { Handle } from '@sveltejs/kit';
import { getUserFromSession } from '$lib/server/models/sessions';
import type { User } from '$lib/types/user';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');

	if (sessionId) {
		const user: User | undefined = getUserFromSession(sessionId);
		console.log('user form hook', user);
		console.log('sessionid hook', sessionId);
		console.log('sessionid type', typeof sessionId);

		event.locals.user = user ?? null;
	} else {
		event.locals.user = null;
	}

	return await resolve(event);
};
