import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	let isAdmin = false;
	if (locals.user) {
		const { role } = locals.user;
		isAdmin = role == 'ADMIN';
	}
	return { isAdmin };
}) satisfies LayoutServerLoad;
