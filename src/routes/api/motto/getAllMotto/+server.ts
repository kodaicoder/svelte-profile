import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	const allMotto = await getAll()
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
		});
	return new Response(JSON.stringify(allMotto));
};

async function getAll() {
	return await prisma.motto.findMany();
}
