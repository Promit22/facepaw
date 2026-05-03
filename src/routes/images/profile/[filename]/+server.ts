import fs from 'fs';

export async function GET({ params }) {
	const dir = process.env.UPLOAD_DIR_PROFILE ?? 'static/images/profile';
	const file = fs.readFileSync(`${dir}/${params.filename}`);
	return new Response(file, {
		headers: { 'content-type': 'image/webp' }
	});
}
