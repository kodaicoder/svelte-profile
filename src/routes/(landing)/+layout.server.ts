import axios from 'axios';
import type { LayoutServerLoad } from './$types';
import type ISocialLink from '$lib/types/ISocialLink';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	let isAdmin = false;

	if (locals.user) {
		const { role } = locals.user;
		isAdmin = role == 'ADMIN';
	}
	const socialLinks = await getSocialLinks();

	return { isAdmin, socialLinks };
}) satisfies LayoutServerLoad;

async function getSocialLinks() {
	return await axios
		.get<{ socialLinks: ISocialLink[] }>('/api/landing/getSocialLinks/')
		.then((response) => {
			return response.data.socialLinks;
		})
		.catch((err) => {
			const { status, statusText, data } = err;
			throw error(404, {
				message: JSON.stringify({ status, statusText, data })
			});
		});
}
