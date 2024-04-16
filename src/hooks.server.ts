import { lucia } from '$lib/service/auth';
import type { Handle } from '@sveltejs/kit';
import axios from 'axios';

export const handle: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url);

	//!set default base url for axios
	axios.defaults.baseURL = `${url.protocol}//${url.host}`;

	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response) {
			if (error.response.data instanceof Buffer) {
				const decoder = new TextDecoder('utf-8');
				error.response.data = decoder.decode(error.response.data).replace(/"/g, '');
			}
			return Promise.reject(error.response);
		} else if (error.request) {
			if (!error.request.aborted) {
				const newError = {
					status: 500,
					statusText: 'A request was made but something went wrong unexpected on server side'
				};
				return Promise.reject(newError);
			}
		} else {
			const newError = {
				status: 400,
				statusText: 'Uncaught error in axios - Something happened in setting up the request'
			};
			return Promise.reject(newError);
		}
	}
);
