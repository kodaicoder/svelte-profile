import type { Actions } from './$types';
import {
	projectCreateSchema,
	projectUpdateSchema,
	projectDeleteSchema
} from '$lib/validators/projectSchema';
import { setError, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
import axios from 'axios';
import type IProject from '$lib/types/IProject';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const formData = await request.formData();
		const projectCreateForm = await superValidate(formData, zod(projectCreateSchema));

		if (!projectCreateForm.valid || !locals.user?.id) {
			return fail(400, withFiles({ projectCreateForm }));
		}

		const image = formData.get('uploadImage') as File;
		if (image.size == 0) {
			return setError(projectCreateForm, 'uploadImage', 'Please choose your project image.');
		}

		const userId = locals.user?.id;
		formData.append('userId', `${userId}`);

		const { id } = await axios
			.post<{ id: string }>(`/api/project/createProject`, formData, {
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
		projectCreateForm.message = id ? `Project created` : 'Project not created';

		return withFiles({ projectCreateForm });
	},
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const projectUpdateForm = await superValidate(formData, zod(projectUpdateSchema));

		if (!projectUpdateForm.valid || !locals.user?.id) {
			return fail(400, withFiles({ projectUpdateForm }));
		}

		const userId = locals.user?.id;
		formData.append('userId', `${userId}`);

		Object.keys(projectUpdateForm.data).forEach((key) =>
			formData.append(key, projectUpdateForm.data[`${key}`])
		);

		const project = await axios
			.post<{ project: IProject }>(`/api/project/updateProject`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(async (response) => {
				return response.data.project;
			})
			.catch(async (e) => {
				console.error(e);
				const { status, statusText, data } = e;
				throw error(400, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		console.log('UPDATED RPOJECT', project);

		projectUpdateForm.message = project.id ? `Project updated` : 'Project not updated';
		projectUpdateForm.data = project;

		return withFiles({ projectUpdateForm });
	},
	delete: async ({ request, locals }) => {
		const projectDeleteForm = await superValidate(request, zod(projectDeleteSchema));

		if (!projectDeleteForm.valid) {
			return fail(400, { projectDeleteForm });
		}

		const { id } = projectDeleteForm.data;

		const project = await axios
			.post<{ id: number }>(`/api/project/deleteProject`, { id, userId: locals?.user?.id })
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

		projectDeleteForm.message = project ? `Project deleted` : 'Project not found';
		return { projectDeleteForm };
	}
};
