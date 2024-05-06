import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { email } = await request.json();
	const user = await dataAccess(email)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify({ user }));
};

const dataAccess = async (email: string) => {
	const user = await prisma.user.findFirst({
		include: {
			image: {
				where: {
					isActive: true
				}
			},
			resume: true,
			skills: {
				include: {
					image: true
				},
				orderBy: {
					id: 'asc'
				}
			},
			socialLinks: {
				include: {
					image: true
				}
			}
		},
		where: {
			email: email
		}
	});
	return user;
};
