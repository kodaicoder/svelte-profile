import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { id, content, author, userId } = await request.json();

	if (!userId) {
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
	}

	const motto = await dataAccess(+userId, +id, content, author)
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

async function dataAccess(userId: number, id: number, content: string, author: string) {
	return await prisma.motto.update({
		where: {
			userId: userId,
			id: id
		},
		data: {
			content: content,
			author: author
		}
	});
}
