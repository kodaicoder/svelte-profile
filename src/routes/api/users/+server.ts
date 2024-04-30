import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

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

	return new Response(JSON.stringify(allUsers));
};

async function getAll() {
	const allUsers = await prisma.user.findMany();
	return allUsers;
}
