import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { del, put } from '@vercel/blob';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const formData = await request.formData();

	const userId = formData.get('userId') as string;
	const id = formData.get('id') as string;
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;
	const sourceLink = formData.get('sourceLink') as string;
	const link = formData.get('link') as string;
	const uploadImage = (formData.get('uploadImage') as File) ?? null;

	if (!userId) {
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
	}

	const project = await dataAccess(+userId, +id, title, content, sourceLink, link, uploadImage)
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
			project
		})
	);
};

async function dataAccess(
	userId: number,
	id: number,
	title: string,
	content: string,
	sourceLink: string,
	link: string,
	uploadImage: File | null
) {
	let blobResponse;
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

	if (uploadImage) {
		if (oldImage) await del(oldImage.url);
		//! upload image to blob storage
		blobResponse = await put(`project/${userId}/${uploadImage.name}`, uploadImage, {
			access: 'public'
		});
	}

	return await prisma.project.update({
		where: {
			userId: userId,
			id: id
		},
		data: {
			title: title,
			content: content,
			sourceLink: sourceLink,
			link: link,
			image: {
				update: {
					url: blobResponse ? blobResponse.url : oldImage ? oldImage.url : ''
				}
			}
		},
		include: {
			image: true
		}
	});
}
