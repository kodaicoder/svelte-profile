import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	let isAdmin = false;
	if (!locals.user) {
		redirect(301, '/login');
	} else {
		const { role } = locals.user;
		if (role != 'ADMIN') {
			redirect(301, '/');
		}
		isAdmin = true;
	}
	return { isAdmin };
}) satisfies LayoutServerLoad;
