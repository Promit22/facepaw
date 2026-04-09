export type Quiz = {
	id: string;
	type: string;
	question: string;
	options: string[];
	imageUrl?: string;
	correctAnswer: string;
};

export type QuizQuestion = {
	id: string;
	questions: Quiz[] | string;
	createdAt: number;
	expiresAt: number;
};

export type PendingQuiz = {
	question: Quiz[];
	createdAt: number;
};
