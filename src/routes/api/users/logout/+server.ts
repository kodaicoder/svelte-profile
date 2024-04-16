import { lucia } from '$lib/service/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.session) {
		return new Response(null, { status: 302, headers: { location: '/' } });
	}

	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});

	return new Response(null, { status: 302, headers: { location: '/' } });
};
