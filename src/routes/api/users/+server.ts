import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	const allUsers = await getAll()
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	console.log(allUsers);
	return new Response(JSON.stringify(allUsers));
};

async function getAll() {
	const allUsers = await prisma.user.findMany();
	console.log(allUsers);
	return allUsers;
}
