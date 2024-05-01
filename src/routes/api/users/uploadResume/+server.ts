import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { put, del } from '@vercel/blob';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const userId = formData.get('userId') as string;
	const uploadResume = formData.get('uploadResume') as File;
	const url = formData.get('url') as string;

	const resume = await dataAccess(+userId, url, uploadResume)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify({ resume }));
};

const dataAccess = async (userId: number, oldResumeUrl: string, uploadResume: File) => {
	//! delete old image
	await del(oldResumeUrl);

	//! upload image to blob storage
	const blobResponse = await put(`resume/${userId}/${uploadResume.name}`, uploadResume, {
		access: 'public'
	});

	const newResume = await prisma.resume.upsert({
		where: {
			userId: userId
		},
		update: {
			url: blobResponse.url, // default image
			isActive: true
		},
		create: {
			userId: userId,
			url: blobResponse.url // default image
		}
	});

	return newResume;
};
