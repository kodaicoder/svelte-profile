import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(301, '/login');
	} else {
		const { role } = locals.user;
		if (role != 'ADMIN') {
			redirect(301, '/');
		}
	}
	return {};
}) satisfies LayoutServerLoad;
