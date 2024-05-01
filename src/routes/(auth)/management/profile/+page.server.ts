import { fail, setError, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
	profileDetailSchema,
	profilePictureSchema,
	resumeFileSchema
} from '$lib/validators/profileSchema';
import { lucia } from '$lib/service/auth';
import { error, redirect } from '@sveltejs/kit';
import axios from 'axios';
import type { IUser } from '$lib/types/IUser';
import type { UserImage } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		redirect(301, '/login');
	}
	const { user } = await lucia.validateSession(locals.session.id);
	const userData = await axios
		.post<{ user: IUser }>('/api/users/getUserByEmail/', {
			email: user?.email
		})
		.then((response) => {
			return response.data.user;
		})
		.catch((err) => {
			const { status, statusText, data } = err;
			throw error(404, {
				message: JSON.stringify({ status, statusText, data })
			});
		});

	const { image, resume, ...restUserData } = userData;
	const initailImage = { ...image, userId: user?.id };

	const profilePictureForm = await superValidate(initailImage, zod(profilePictureSchema));
	const profileDetailForm = await superValidate(restUserData, zod(profileDetailSchema));
	const resumeFileForm = await superValidate(resume, zod(resumeFileSchema));

	return {
		profilePictureForm,
		profileDetailForm,
		resumeFileForm
	};
};

export const actions: Actions = {
	profilePictureUpload: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(profilePictureSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const image = formData.get('uploadImage') as File;
		if (image.size == 0) {
			return setError(form, 'uploadImage', 'Please choose your new profile picture.');
		}

		const newProfilePicture = await axios
			.post<UserImage>('/api/users/uploadProfilePicture/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				const { status, statusText, data } = err;
				// console.log(err);
				throw error(404, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		form.data = newProfilePicture;
		return { form };
	},
	resumeUpload: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(resumeFileSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const resume = formData.get('uploadResume') as File;
		if (resume.size == 0) {
			return setError(form, 'uploadResume', 'Please choose your new resume file.');
		}

		const newResume = await axios
			.post<UserImage>('/api/users/uploadResume/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				const { status, statusText, data } = err;
				// console.log(err);
				throw error(404, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		form.data = newResume;
		return { form };
	}
};
