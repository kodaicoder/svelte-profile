import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { id } = await request.json();

	const motto = await dataAccess(+id)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
		});
	return new Response(JSON.stringify(motto));
};

async function dataAccess(id: number) {
	return await prisma.motto.findFirst({
		where: {
			id: id
		}
	});
}
