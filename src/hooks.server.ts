import type { Handle } from '@sveltejs/kit';
import { getUserFromSession } from '$lib/server/models/sessions';
import type { User } from '$lib/types/user';
import { ensureDataDir } from '$lib/server/models/breedCache';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');

	if (sessionId) {
		const user: User | undefined = getUserFromSession(sessionId);

		event.locals.user = user ?? null;
	} else {
		event.locals.user = null;
	}

	return await resolve(event);
};

ensureDataDir('cat');
ensureDataDir('dog');
