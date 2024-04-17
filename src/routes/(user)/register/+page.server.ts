import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import axios, { type AxiosResponse } from 'axios';
import type { User } from '@prisma/client';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '$lib/validators/registerSchema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(registerSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(registerSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password, firstName, lastName } = form.data;

		const hashedPassword = await new Argon2id().hash(password);
		const user = await axios
			.post('/api/users/getUserByEmail/', { email })
			.then((response: AxiosResponse<{ user: User }>) => {
				return response.data.user;
			})
			.catch((err) => {
				const { status, statusText, data } = err;
				throw error(status, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		if (user) {
			return setError(form, 'email', 'E-mail already been used.');
		}

		await axios
			.post('/api/users/createUser/', {
				email,
				password: hashedPassword,
				firstName,
				lastName
			})
			.then((response: AxiosResponse<{ userId: number }>) => {
				return response.data.userId;
			})
			.catch((err) => {
				const { status, statusText, data } = err;
				throw error(404, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		form.message = { type: 'success', message: 'Account created successfully' };
		return { form };
	}
};
