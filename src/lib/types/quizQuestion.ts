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
	score: number;
	expires_at: number;
};

export type PendingQuiz = {
	question: Quiz[];
	createdAt: number;
};

export interface QuizSessionQuestion {
	id: string;
	session_id: string;
	position: number;
	questions: Quiz[]; // Defined below based on your needs
}

export interface QuizAnswerRow {
	session_id: string;
	question_id: string;
	given_answer: string;
	/**
	 * SQLite uses 0 (false) and 1 (true)
	 */
	is_correct: 0 | 1;
}
