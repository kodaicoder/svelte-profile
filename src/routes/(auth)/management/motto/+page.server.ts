import type { Actions } from './$types';
import {
	mottoCreateSchema,
	mottoUpdateSchema,
	mottoDeleteSchema
} from '$lib/validators/mottoSchema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
import type { IMotto } from '$lib/types/IMotto';
import axios from 'axios';

export const actions: Actions = {
	create: async ({ request }) => {
		const mottoCreateForm = await superValidate(request, zod(mottoCreateSchema));

		if (!mottoCreateForm.valid) {
			return fail(400, { mottoCreateForm });
		}

		const { content, author } = mottoCreateForm.data;

		const motto = await axios
			.post<IMotto | null>(`/api/motto/createMotto`, { content, author })
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

		mottoCreateForm.message = motto ? `Motto created` : 'Motto not created';
		return { mottoCreateForm };
	},
	update: async ({ request }) => {
		const mottoEditForm = await superValidate(request, zod(mottoUpdateSchema));

		console.log(mottoEditForm);

		if (!mottoEditForm.valid) {
			return fail(400, { mottoEditForm });
		}

		const { id, content, author } = mottoEditForm.data;

		const motto = await axios
			.post<IMotto | null>(`/api/motto/updateMotto`, { id, content, author })
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

		console.log(motto?.id);
		mottoEditForm.message = motto ? `Motto updated` : 'Motto not found';
		return { mottoEditForm };
	},
	delete: async ({ request }) => {
		const mottoDeleteForm = await superValidate(request, zod(mottoDeleteSchema));

		if (!mottoDeleteForm.valid) {
			return fail(400, { mottoDeleteForm });
		}

		const { id } = mottoDeleteForm.data;

		const motto = await axios
			.post<IMotto | null>(`/api/motto/deleteMotto`, { id })
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

		mottoDeleteForm.message = motto ? `Motto deleted` : 'Motto not found';
		return { mottoDeleteForm };
	}
};
