import { z } from 'zod';

const uploadProfilePicture = z
	.instanceof(File, {
		message: 'Please choose your new profile picture.'
	})
	.refine((file) => file.size < 500000, { message: 'File size must be less than 500 kb.' })
	.refine(
		(file) => {
			const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
			return allowedExtensions.includes(file.type);
		},
		{ message: 'File type must be .jpg, .jpeg .png or .webp.' }
	);

export const profilePictureSchema = z.object({
	id: z.number().int().optional().nullable(),
	userId: z.number().int().optional().nullable(),
	url: z.string().url().optional().nullable(),
	isActive: z.boolean().default(true),
	uploadImage: uploadProfilePicture.optional()
});

export const profileDetailSchema = z.object({
	id: z.number().int().optional().nullable(),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(8),
	role: z.string(),
	// .enum(['USER', 'ADMIN']),
	socialLinks: z.array(
		z
			.object({
				id: z.number().int().optional(),
				userId: z.number().int().optional(),
				image: z
					.object({
						id: z.number().int().optional().nullable(),
						url: z.string().url(),
						isActive: z.boolean().default(true),
						socialLinkId: z.number().int().optional().nullable()
					})
					.optional()
					.nullable(),
				link: z.string().optional().nullable(),
				type: z.string()
				// enum(['GITHUB', 'FACEBOOK', 'TWITTER', 'INSTAGRAM', 'LINE', 'LINKEDIN'])
			})
			.optional()
	),
	skills: z.array(
		z
			.object({
				id: z.number().int().optional().nullable(),
				userId: z.number().int().optional().nullable(),
				name: z.string().max(255),
				level: z
					.number()
					.positive({ message: 'level value must be positive' })
					.multipleOf(0.5, { message: 'Level must be a multiple of 0.5' }),
				image: z
					.object({
						id: z.number().int().optional().nullable(),
						skillId: z.number().int().optional().nullable(),
						url: z.string().url(),
						isActive: z.boolean().default(true)
					})
					.optional()
					.nullable(),
				link: z.string().url().optional().nullable(),
				isActive: z.boolean().default(true)
			})
			.optional()
	)
});

const uploadResumeSchema = z
	.instanceof(File, {
		message: 'Please choose your new resume file.'
	})
	.refine((file) => file.size < 5000000, { message: 'File size must be less than 5MB.' })
	.refine(
		(file) => {
			const allowedExtensions = [
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				'application/pdf'
			];
			return allowedExtensions.includes(file.type);
		},
		{ message: 'File type must be .doc, .docx or .pdf.' }
	);

export const resumeFileSchema = z.object({
	id: z.number().int().optional().nullable(),
	userId: z.number().int().optional().nullable(),
	url: z.string().url().optional().nullable(),
	isActive: z.boolean().default(true),
	uploadResume: uploadResumeSchema.optional()
});
