import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { email, password, firstName, lastName } = await request.json();

	const userId = await dataAccess(email, password, firstName, lastName)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify({ userId }));
};

const dataAccess = async (email: string, password: string, firstName: string, lastName: string) => {
	///create user
	const user = await prisma.user.create({
		data: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}
	});

	return user.id;
};
