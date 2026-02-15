import fs from 'node:fs/promises';
import path from 'node:path';
import { CAT_API_KEY, DOG_API_KEY } from '$env/static/private';

const dataDir = path.join(process.cwd(), 'data');
const oneWeek = 7 * 24 * 60 * 60 * 1000;

export async function ensureDataDir(type: 'cat' | 'dog') {
	await fs.mkdir(dataDir, { recursive: true });
	const filePath = path.join(dataDir, `${type}_breeds.json`);

	try {
		const state = fs.stat(filePath);
		const age = Date.now() - (await state).mtime.getTime();
		if (age > oneWeek) {
			await refreshBreeds(type, filePath);
		} else {
			//breed available
		}
	} catch (e) {
		await refreshBreeds(type, filePath);
		console.log(e);
	}
}

async function refreshBreeds(type: 'cat' | 'dog', filePath: string) {
	const url =
		type === 'cat' ? 'https://api.thecatapi.com/v1/breeds' : 'https://api.thedogapi.com/v1/breeds';

	const key = type === 'cat' ? CAT_API_KEY : DOG_API_KEY;
	console.log(type === 'cat' ? `cat api key= ${key}` : `dog api key= ${key}`);

	const headers = new Headers();

	if (key) {
		headers.append('x-api-key', key);
	}

	const res = await fetch(url, {
		method: 'GET',
		headers: headers
	});

	const data = await res.json();

	await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function readBreed(type: 'cat' | 'dog') {
	const filePath = path.join(dataDir, `${type}_breeds.json`);
	const data = await fs.readFile(filePath, 'utf8');
	return JSON.parse(data);
}
