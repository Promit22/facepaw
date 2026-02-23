import sharp from 'sharp';

export async function processImage(
	buffer: ArrayBuffer,
	outputDir: string,
	width: number,
	height: number
) {
	await sharp(buffer)
		.autoOrient()
		.resize(width, height, { fit: 'cover' })
		.sharpen({ sigma: 0.8 })
		.webp({
			quality: 65
		})
		.toFile(outputDir);
}
