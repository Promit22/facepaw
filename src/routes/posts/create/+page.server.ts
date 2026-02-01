import sharp from 'sharp';
import { createPost } from '$lib/server/models/posts.js';
import { getString } from '$lib/helper/string.js';
import { getRandomId } from '$lib/helper/randomid.js';
import { storeImagePath } from '$lib/server/models/image.js';
import path from 'node:path';
import { processImage } from '$lib/server/models/imageService.js';

export const actions = {
	compress: async ({ request, locals }) => {
		const data = await request.formData();
		const title = getString(data.get('title'));
		const image = data.get('image') as File;
		const description = getString(data.get('description'));
		const user = locals.user;
		const fileName = `${getRandomId()}.webp`;
		const currentPath = path.join('static', 'images', 'posts', fileName);
		// const currentPath = `${dir}/${getRandomId()}.webp`;
		const buffer = await image.arrayBuffer();
		processImage(buffer, currentPath, 1200, 630);
		// await sharp(buffer)
		// 	.resize(1200, 630, { fit: 'cover' })
		// 	.sharpen({ sigma: 0.8 })
		// 	.webp({
		// 		quality: 65
		// 	})
		// 	.toFile(currentPath);
		if (user && title && description) {
			// const postId = getNumber(createPost(user.id, title, description).lastInsertRowid);
			const postId = createPost(user.id, title, description).lastInsertRowid;

			if (postId) storeImagePath(postId as number, currentPath.replace('static', ''));
		}
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
