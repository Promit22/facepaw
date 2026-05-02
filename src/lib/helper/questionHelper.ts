import type { Cats, Dogs } from '$lib/types/breed';

const ranDomtype = ['origin', 'lifespan', 'image'];

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getRandomBreeds(randomNum: number[], breeds: Cats[] | Dogs[]) {
	return randomNum.map((n) => breeds[n]);
}

function getRandomNumberOfBreeds(min: 0, limit: number, breeds: Cats[] | Dogs[]) {
	const filteredBreeds = breeds.filter((v) => v?.image?.url); // filter first
	const ranDomSet: Set<number> = new Set();
	while (ranDomSet.size < limit) {
		ranDomSet.add(getRandomInt(min, filteredBreeds.length)); // use filtered length
	}
	const randomArray = Array.from(ranDomSet);
	return getRandomBreeds(randomArray, filteredBreeds); // index into filtered array
}

// function getRandomNumberOfBreeds(min: 0, max: number, limit: number, breeds: Cats[] | Dogs[]) {
// 	const ranDomSet: Set<number> = new Set();
// 	while (ranDomSet.size < limit) {
// 		ranDomSet.add(getRandomInt(min, max));
// 	}
// 	const randomArray = Array.from(ranDomSet);
// 	const filteredBreeds = breeds.filter((v) => v?.image?.url);
// 	return getRandomBreeds(randomArray, filteredBreeds);
// }

export function getRandomType() {
	const rnd = getRandomInt(0, ranDomtype.length);
	return ranDomtype[rnd];
}

export function pickUniqueRandomBreeds(breeds: Cats[] | Dogs[], count: number) {
	const length = breeds.length;
	if (length < count) {
		throw new Error('count exeeds the total length of breed');
	}
	const selectedBreeds = getRandomNumberOfBreeds(0, count, breeds);
	return selectedBreeds;
}

// export function pickRandom(value: (string | undefined)[], count: number) {
// 	if (value.includes(undefined)) {
// 		return;
// 	}
// 	const ranDomSet: Set<string> = new Set();
// 	while (ranDomSet.size < count) {
// 		ranDomSet.add(value[getRandomInt(0, value.length)]!);
// 	}
// 	return Array.from(ranDomSet)!;
// }

export function pickRandom(value: (string | undefined)[], count: number) {
	// Filter out undefined values and type guard
	const stringValues = value.filter((item): item is string => item !== undefined);

	if (stringValues.length < count) {
		return stringValues;
	}

	const ranDomSet: Set<string> = new Set();

	while (ranDomSet.size < count) {
		ranDomSet.add(stringValues[getRandomInt(0, stringValues.length)]);
	}
	return Array.from(ranDomSet);
}

export function shuffle(option: string[]) {
	let currentIndex = option.length;

	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[option[currentIndex], option[randomIndex]] = [option[randomIndex], option[currentIndex]];
	}
	return option;
}
