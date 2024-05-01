import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const GET: RequestHandler = async () => {
	const resume = await dataAccess()
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify(resume));
};

const dataAccess = async () => {
	return await prisma.user.findFirst({
		where: {
			role: 'ADMIN'
		},
		select: {
			resume: {
				where: {
					isActive: true
				}
			}
		}
	});
};
