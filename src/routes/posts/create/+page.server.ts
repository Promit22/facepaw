export const actions = {
	compress: async ({ request }) => {
		const data = await request.formData();
		const image = data.get('image') as File;
		console.log('image', image);
	}
};
