import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { put } from '@vercel/blob';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const formData = await request.formData();

	const userId = formData.get('userId') as string;
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;
	const sourceLink = formData.get('sourceLink') as string;
	const link = formData.get('link') as string;
	const uploadImage = formData.get('uploadImage') as File;

	if (!userId) {
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
	}

	const project = await dataAccess(+userId, title, content, sourceLink, link, uploadImage)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
		});

	if (!project) {
		throw new Error('Project can not created');
	}

	return new Response(
		JSON.stringify({
			id: project.id
		})
	);
};

async function dataAccess(
	userId: number,
	title: string,
	content: string,
	sourceLink: string,
	link: string,
	uploadImage: File
) {
	//! upload image to blob storage
	const blobResponse = await put(`project/${userId}/${uploadImage.name}`, uploadImage, {
		access: 'public'
	});

	const newProject = await prisma.project.create({
		data: {
			title: title,
			content: content,
			sourceLink: sourceLink,
			link: link,
			userId: userId,
			image: {
				create: {
					url: blobResponse.url
				}
			}
		}
	});

	return newProject;
}
