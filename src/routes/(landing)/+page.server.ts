import axios from 'axios';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { UserImage } from '@prisma/client';
import type ISkill from '$lib/types/ISkill';

export const load = (async ({ locals }) => {
	const user = locals.user;

	const [imageUrl, skills] = await Promise.all([getProfilePicture(), getSkill()]);

	return { user, imageUrl, skills };
}) satisfies PageServerLoad;

async function getProfilePicture() {
	const image = await axios
		.get<{ image: UserImage }>('/api/landing/getProfilePicture/')
		.then((response) => {
			return response.data.image;
		})
		.catch((err) => {
			const { status, statusText, data } = err;
			throw error(404, {
				message: JSON.stringify({ status, statusText, data })
			});
		});

	return image.url;
}

async function getSkill() {
	return await axios
		.get<{ skills: ISkill[] }>('/api/landing/getSkill/')
		.then((response) => {
			return response.data.skills;
		})
		.catch((err) => {
			const { status, statusText, data } = err;
			throw error(404, {
				message: JSON.stringify({ status, statusText, data })
			});
		});
}
