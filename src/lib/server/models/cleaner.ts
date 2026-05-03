import fs from 'fs/promises';
import path from 'path';

/**
 * Deletes an uploaded file from the static directory.
 * Expects a path relative to /static e.g. /images/profile/uuid.webp
 */
export async function deleteUploadedFile(relativePath: string | null | undefined) {
	if (!relativePath) return;
	try {
		// const absolute = path.join(process.cwd(), 'static', relativePath);
		const baseDir = process.env.UPLOAD_DIR_PROFILE
			? path.join(process.env.UPLOAD_DIR_PROFILE, '..') // points to /app/data/images
			: path.join(process.cwd(), 'static');
		const absolute = path.join(baseDir, relativePath);
		await fs.unlink(absolute);
	} catch (err: any) {
		if (err.code !== 'ENOENT') console.error('[cleanup] Failed to delete file:', err);
		// ENOENT = already gone, silently ignore
	}
}
