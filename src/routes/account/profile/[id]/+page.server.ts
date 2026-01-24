import type { PageServerLoad } from '../$types';
type ID = {
	id: string;
};
export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	console.log(id);

	return {};
};
