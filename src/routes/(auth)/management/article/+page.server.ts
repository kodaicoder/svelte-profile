import type { Actions } from './$types';
import {
	articleCreateSchema,
	articleUpdateSchema,
	articleDeleteSchema
} from '$lib/validators/articleSchema';

import { setError, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
import axios from 'axios';
import type IArticle from '$lib/types/IArticle';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		const articleCreateForm = await superValidate(formData, zod(articleCreateSchema));

		if (!articleCreateForm.valid || !locals.user?.id) {
			return fail(400, withFiles({ articleCreateForm }));
		}

		const image = formData.get('uploadImage') as File;
		if (image.size == 0) {
			return setError(articleCreateForm, 'uploadImage', 'Please choose your article image.');
		}

		const userId = locals.user?.id;
		formData.append('userId', `${userId}`);

		const { id } = await axios
			.post<{ id: string }>(`/api/article/createArticle`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(async (response) => {
				return response.data;
			})
			.catch(async (e) => {
				console.error(e);
				const { status, statusText, data } = e;
				throw error(400, {
					message: JSON.stringify({ status, statusText, data })
				});
			});
		articleCreateForm.message = id ? `Article created` : 'Article not created';

		return withFiles({ articleCreateForm });
	},
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const articleUpdateForm = await superValidate(formData, zod(articleUpdateSchema));

		if (!articleUpdateForm.valid || !locals.user?.id) {
			return fail(400, withFiles({ articleUpdateForm }));
		}

		const userId = locals.user?.id;
		formData.append('userId', `${userId}`);

		Object.keys(articleUpdateForm.data).forEach((key) =>
			formData.append(key, articleUpdateForm.data[`${key}`])
		);

		const article = await axios
			.post<{ article: IArticle }>(`/api/article/updateArticle`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(async (response) => {
				return response.data.article;
			})
			.catch(async (e) => {
				console.error(e);
				const { status, statusText, data } = e;
				throw error(400, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		articleUpdateForm.message = article.id ? `Article updated` : 'Article not updated';
		articleUpdateForm.data = article;

		return withFiles({ articleUpdateForm });
	},
	delete: async ({ request, locals }) => {
		const articleDeleteForm = await superValidate(request, zod(articleDeleteSchema));

		if (!articleDeleteForm.valid) {
			return fail(400, { articleDeleteForm });
		}

		const { id } = articleDeleteForm.data;

		const article = await axios
			.post<{ id: number }>(`/api/article/deleteArticle`, { id, userId: locals?.user?.id })
			.then(async (response) => {
				return response.data;
			})
			.catch(async (e) => {
				console.error(e);
				const { status, statusText, data } = e;
				throw error(400, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		articleDeleteForm.message = article ? `Article deleted` : 'Article not found';
		return { articleDeleteForm };
	}
};
