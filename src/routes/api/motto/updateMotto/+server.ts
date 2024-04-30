import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { id, content, author } = await request.json();

	const motto = await dataAccess(+id, content, author)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
		});

	if (!motto) {
		throw new Error('Motto not found');
	}

	return new Response(
		JSON.stringify({
			id: motto.id
		})
	);
};

async function dataAccess(id: number, content: string, author: string) {
	return await prisma.motto.update({
		where: {
			id: id
		},
		data: {
			content: content,
			author: author
		}
	});
}
