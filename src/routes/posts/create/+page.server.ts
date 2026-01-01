import sharp from 'sharp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	console.log('from load', user);
};

export const actions = {
	compress: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title');
		const image = data.get('image') as File;
		const description = data.get('description');
		console.log(image);

		// if (!image) return 'not';
		const buffer = await image.arrayBuffer();
		console.log('image', buffer);
		await sharp(buffer)
			.resize(1200, 630, { fit: 'cover' })
			.sharpen({ sigma: 0.8 })
			.webp({
				quality: 65
			})
			.toFile('src/lib/assets/test.webp');
	}
};

/*
	when user publishes a post their id needs to be retrieved from the users 
	table and store the title anad des in the posts table while the image info
	will be saved to the image table such as image path
*/

/*
	current plan: on publish store necessary data in posts table and store image path in image table
	all of this will be done by functions. need to write two functions which will do the following:
	user posts so a function 
*/
