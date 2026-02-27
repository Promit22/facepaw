export type QuizQuestion = {
	id: string;
	type: 'origin' | 'lifespan' | 'image';
	question: string;
	options: string[];
	correctAnswer: string;
};
