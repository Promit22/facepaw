// import type { PageServerLoad } from './$types';

// export const load = (async () => {
// 	return {};
// }) satisfies PageServerLoad;

import { getBestScore } from '$lib/server/models/users';
import type { LeaderboardData } from '$lib/types/user';
// import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// const cat = db.prepare(`
	//     SELECT name, best_score_cat AS best_score
	//     FROM users
	//     WHERE best_score_cat IS NOT NULL
	//     ORDER BY best_score_cat DESC
	//     LIMIT 50
	// `).all();

	// const dog = db.prepare(`
	//     SELECT name, best_score_dog AS best_score
	//     FROM users
	//     WHERE best_score_dog IS NOT NULL
	//     ORDER BY best_score_dog DESC
	//     LIMIT 50
	// `).all();

	// const dog = getBestScore('dog');

	// const hybrid = db.prepare(`
	//     SELECT name, best_score_hybrid AS best_score
	//     FROM users
	//     WHERE best_score_hybrid IS NOT NULL
	//     ORDER BY best_score_hybrid DESC
	//     LIMIT 50
	// `).all();

	// const hybrid = getBestScore('hybrid');

	const leaderboard: LeaderboardData = {
		cat: getBestScore('cat'),
		dog: getBestScore('dog'),
		hybrid: getBestScore('hybrid')
	};

	return { leaderboard };
};
