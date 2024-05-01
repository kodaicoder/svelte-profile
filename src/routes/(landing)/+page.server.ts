import axios from 'axios';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Resume, UserImage } from '@prisma/client';
import type ISkill from '$lib/types/ISkill';
import type ISocialLink from '$lib/types/ISocialLink';

export const load = (async ({ locals }) => {
	const user = locals.user;

	const [imageUrl, skills, resumeUrl, socialLinks] = await Promise.all([
		getProfilePicture(),
		getSkills(),
		getResumeUrl(),
		getSocialLinks()
	]);

	return { user, imageUrl, skills, resumeUrl, socialLinks };
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

async function getSkills() {
	return await axios
		.get<{ skills: ISkill[] }>('/api/landing/getSkills/')
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

async function getResumeUrl() {
	const resume = await axios
		.get<{ resume: Resume }>('/api/landing/getResume/')
		.then((response) => {
			return response.data.resume;
		})
		.catch((err) => {
			const { status, statusText, data } = err;
			throw error(404, {
				message: JSON.stringify({ status, statusText, data })
			});
		});

	return resume.url;
}

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
