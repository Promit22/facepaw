export interface User {
	id: number;
	image: string;
	name: string;
	email: string;
	password: string;
}

export interface LeaderboardEntry {
	name: string;
	best_score: number;
}

export interface LeaderboardData {
	cat: LeaderboardEntry[];
	dog: LeaderboardEntry[];
	hybrid: LeaderboardEntry[];
}
