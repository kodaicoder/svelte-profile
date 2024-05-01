import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const GET: RequestHandler = async () => {
	const socialLinks = await dataAccess()
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	console.log('API', JSON.stringify(socialLinks));

	return new Response(JSON.stringify(socialLinks));
};

const dataAccess = async () => {
	return await prisma.user.findFirst({
		where: {
			role: 'ADMIN'
		},
		select: {
			socialLinks: {
				where: {
					isActive: true
				},
				orderBy: {
					id: 'asc'
				},
				include: {
					image: {
						where: {
							isActive: true
						}
					}
				}
			}
		}
	});
};
