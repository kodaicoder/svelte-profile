import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: true
			// secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			email: attributes.email,
			role: attributes.role
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;

		DatabaseUserAttributes: DatabaseUserAttributes;
		UserId: number;
	}
}

interface DatabaseUserAttributes {
	email: string;
	role: string;
}
