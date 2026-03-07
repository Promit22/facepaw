import type { PageServerLoad } from './$types';
import { generateQuizSession } from '$lib/server/models/question';
import { readBreed } from '$lib/server/models/breedCache';
import { quizStore } from '$lib/server/quiz/quizStore';
import type { QuizQuestion } from '$lib/types/quizQuestion';
import type { Quiz } from '$lib/types/quizQuestion';

let sessionId: `${string}-${string}-${string}-${string}-${string}`;
let quiz: Quiz[];
export const load = (async () => {
	const breeds = await readBreed('cat');
	quiz = generateQuizSession(breeds, 10);
	sessionId = crypto.randomUUID();
	console.log(quiz);

	// store correct answers in memory/db/cache
	return {};
}) satisfies PageServerLoad;

function gradeQuizSession(
	sessionId: string,
	userAnswers: { questionId: string; answer: string }[]
) {
	const MAX_AGE = 5 * 60 * 1000; // 5 minutes

	for (const [id, session] of quizStore.entries()) {
		if (Date.now() - session.createdAt > MAX_AGE) {
			quizStore.delete(id);
		}
	}

	console.log(userAnswers);

	const session = quizStore.get(sessionId);
	// const sessionEntries = session.entries()
	if (!session) {
		throw new Error('Invalid session');
	}

	let score = 0;

	for (const userAnswer of userAnswers) {
		const question = session.question.find((q) => q.id === userAnswer.questionId);

		if (!question) continue;

		if (question.correctAnswer === userAnswer.answer) {
			score++;
		}
	}

	const total = session.question.length;
	const accuracy = Math.round((score / total) * 100);

	return {
		score,
		total,
		accuracy
	};
}

export const actions = {
	submitAns: async ({ request }) => {
		const formData = await request.formData();
		const sessionId = formData.get('sessionId')?.toString();
		const answers = formData.get('answers')?.toString();
		if (!sessionId || !answers) {
			return;
		}
		const obj = JSON.parse(answers);
		console.log(sessionId, answers);
		const result = gradeQuizSession(sessionId, obj);
		console.log('result from action', result);

		return { result };
	},
	startQuiz: async ({ request }) => {
		// const formData = await request.formData();
		// const id = formData.get('id');
		const expiresAt = Date.now() + 120000;
		quizStore.set(sessionId, {
			question: quiz,
			createdAt: Date.now(),
			expiresAt
		});
		return {
			sessionId,
			questions: quiz.map((q) => ({
				id: q.id,
				type: q.type,
				question: q.question,
				options: q.options,
				image: q.imageUrl
			})),
			expiresAt
		};
	}
};
