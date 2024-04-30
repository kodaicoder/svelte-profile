import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import type { IMotto } from '$lib/types/IMotto';

export const GET: RequestHandler = async () => {
	let allMotto: IMotto[] | void = [];

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
	return await prisma.motto.findMany();
}
