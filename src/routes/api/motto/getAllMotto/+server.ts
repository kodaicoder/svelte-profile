import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import type { IMotto } from '$lib/types/IMotto';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }: { locals: App.Locals }) => {
	let allMotto: IMotto[] | void = [];
	// if (!locals.user) {
	// 	return error(404, { message: 'User not found' });
	// }

	// allMotto = await dataAccess(+locals.user.id)
	allMotto = await dataAccess()
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

async function dataAccess() {
	return await prisma.motto.findMany({
		where: {
			user: {
				id: 2
			}
		}
	});
}
