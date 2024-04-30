import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	let isAdmin = false;
	//console.log(locals.user);
	if (locals.user) {
		const { role } = locals.user;
		isAdmin = role == 'ADMIN';
	}
	return { isAdmin };
}) satisfies LayoutServerLoad;
