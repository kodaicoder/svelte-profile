import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { content, author } = await request.json();

	const motto = await dataAccess(content, author)
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

async function dataAccess(content: string, author: string) {
	return await prisma.motto.create({
		data: {
			content: content,
			author: author
		}
	});
}
