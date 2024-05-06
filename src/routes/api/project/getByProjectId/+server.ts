import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({
	request,
	locals
}: {
	request: Request;
	locals: App.Locals;
}) => {
	const { id } = await request.json();

	if (!locals.user) {
		return error(404, { message: 'User not found' });
	}

	const motto = await dataAccess(+locals.user.id, +id)
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

async function dataAccess(userId: number, id: number) {
	return await prisma.project.findFirst({
		where: {
			userId: userId,
			id: id
		},
		include: {
			image: true
		}
	});
}
