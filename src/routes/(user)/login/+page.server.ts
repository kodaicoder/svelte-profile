import type { PageServerLoad, Actions } from './$types';
import { lucia } from '$lib/service/auth';
import { error, fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

import axios, { type AxiosResponse } from 'axios';
import type { User } from '@prisma/client';

import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/validators/loginSchema';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		const { role } = locals.user;

		if (role) {
			if (role != 'ADMIN') {
				redirect(301, '/');
			} else {
				redirect(301, '/management');
			}
		}
	}

	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		const user = await axios
			.post('/api/users/getUserByEmail/', {
				email
			})
			.then((response: AxiosResponse<{ user: User }>) => {
				return response.data.user;
			})
			.catch((err) => {
				const { status, statusText, data } = err;
				throw error(404, {
					message: JSON.stringify({ status, statusText, data })
				});
			});

		if (!user) {
			return setError(form, 'password', 'Incorrect username or password');
		}

		const validPassword = await new Argon2id().verify(user.password, password);
		if (!validPassword) {
			return setError(form, 'password', 'Incorrect username or password');
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		let gotoLink = '/';
		if (user.role === 'ADMIN') {
			gotoLink = '/management';
		}

		form.message = { type: 'success', message: 'Login successfully', gotoLink };
		return { form };
	}
};
