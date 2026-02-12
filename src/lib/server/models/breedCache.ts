import fs from 'node:fs/promises';
import path from 'node:path';

const dataDir = path.join(process.cwd(), 'data');
const oneWeek = 7 * 24 * 60 * 60 * 1000;

async function ensureDataDir() {
	await fs.mkdir(dataDir, { recursive: true });
}
