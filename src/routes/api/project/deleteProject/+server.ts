import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { del } from '@vercel/blob';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { id, userId } = await request.json();
	if (!userId) {
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
	}

	console.log('DELETE PROJECT API', id, userId);

	const project = await dataAccess(+userId, +id)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
		});

	if (!project) {
		throw new Error('Project not found');
	}

	return new Response(
		JSON.stringify({
			id: project.id
		})
	);
};

async function dataAccess(userId: number, id: number) {
	const oldImage = await prisma.projectImage.findFirst({
		where: {
			project: {
				userId: userId,
				id: id
			}
		},
		select: {
			url: true
		}
	});
	if (oldImage) await del(oldImage.url);

	return await prisma.project.delete({
		where: {
			userId: userId,
			id: id
		}
	});
}
