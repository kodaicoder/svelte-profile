import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	const skills = await dataAccess()
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify(skills));
};

const dataAccess = async () => {
	return await prisma.user.findFirst({
		where: {
			role: 'ADMIN'
		},
		select: {
			skills: {
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