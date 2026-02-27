import { pickUniqueRandomBreeds } from '$lib/helper/questionHelper';
import type { Cats, Dogs } from '$lib/types/breed';
import { getRandomType } from '$lib/helper/questionHelper';
import { pickRandom } from '$lib/helper/questionHelper';
import { shuffle } from '$lib/helper/questionHelper';
function generateQuizSession(breeds: Cats[] | Dogs[], count = 10) {
	const selectedBreeds = pickUniqueRandomBreeds(breeds, count);

	return selectedBreeds.map((breed, index) => {
		const type = getRandomType();
		return generateQuestionByType(type, breed, breeds);
	});
}

function generateOriginQuestion(correctBreed: Cats | Dogs, allBreeds: Cats[] | Dogs[]) {
	const correctValue = correctBreed.origin;

	const pool = new Set(allBreeds.map((b) => b.origin).filter((v) => v && v !== correctValue));

	const wrongOptions = pickRandom([...pool], 3);

	if (!wrongOptions || !correctValue) return;

	const options = shuffle([correctValue, ...wrongOptions]);

	return {
		id: crypto.randomUUID(),
		type: 'origin',
		breedId: correctBreed.id,
		question: `Which country does ${correctBreed.name} originate from?`,
		options,
		correctAnswer: correctValue
	};
}

function generateLifespanQuestion(correctBreed: Cats | Dogs, allBreeds: Cats[] | Dogs[]) {
	const correctKey = `${correctBreed.minLifeSpan}-${correctBreed.maxLifeSpan}`;

	const pool: Set<string> = new Set(
		allBreeds
			.filter((b) => b.minLifeSpan && b.maxLifeSpan)
			.map((b) => `${b.minLifeSpan}-${b.maxLifeSpan}`)
			.filter((v) => v !== correctKey)
	);

	const wrongOptions = pickRandom([...pool], 3);

	if (!wrongOptions) return;

	const displayCorrect = `${correctBreed.minLifeSpan} - ${correctBreed.maxLifeSpan} years`;
	const displayWrong = wrongOptions.map((v) => {
		const [min, max] = v.split('-');
		return `${min} - ${max} years`;
	});

	const options = shuffle([displayCorrect, ...displayWrong]);

	return {
		id: crypto.randomUUID(),
		type: 'lifespan',
		breedId: correctBreed.id,
		question: `What is the typical lifespan of ${correctBreed.name}?`,
		options,
		correctAnswer: displayCorrect
	};
}

function generateImageQuestion(correctBreed: Cats | Dogs, allBreeds: Cats[] | Dogs[]) {
	const pool = allBreeds.filter((b) => b.id !== correctBreed.id && b.image?.url).map((b) => b.name);

	const wrongOptions = pickRandom(pool, 3);

	if (!wrongOptions || !correctBreed.name) return;

	const options = shuffle([correctBreed.name, ...wrongOptions]);

	return {
		id: crypto.randomUUID(),
		type: 'image',
		breedId: correctBreed.id,
		question: `Which breed is shown in this image?`,
		options,
		correctAnswer: correctBreed.name,
		imageUrl: correctBreed.image.url
	};
}

function generateQuestionByType(type: string, breed: Cats | Dogs, allBreeds: Cats[] | Dogs[]) {
	switch (type) {
		case 'origin':
			return generateOriginQuestion(breed, allBreeds);
		case 'lifespan':
			return generateLifespanQuestion(breed, allBreeds);
		case 'image':
			return generateImageQuestion(breed, allBreeds);
	}
}
