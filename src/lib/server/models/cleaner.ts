import fs from 'fs/promises';
import path from 'path';

/**
 * Deletes an uploaded file from the static directory.
 * Expects a path relative to /static e.g. /images/profile/uuid.webp
 */
export async function deleteUploadedFile(relativePath: string | null | undefined) {
	if (!relativePath) return;
	try {
		const absolute = path.join(process.cwd(), 'static', relativePath);
		await fs.unlink(absolute);
	} catch (err: any) {
		if (err.code !== 'ENOENT') console.error('[cleanup] Failed to delete file:', err);
		// ENOENT = already gone, silently ignore
	}
}
