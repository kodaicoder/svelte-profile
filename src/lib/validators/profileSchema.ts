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
	url: z.string().url().optional(),
	isActive: z.boolean().default(true),
	uploadImage: uploadProfilePicture.optional()
});

const uploadSkillIconImage = z
	.instanceof(File, {
		message: 'Please choose your project image.'
	})
	.refine((file) => file.size < 500000, { message: 'File size must be less than 500 KB.' })
	.refine(
		(file) => {
			const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
			return allowedExtensions.includes(file.type);
		},
		{ message: 'File type must be .jpg, .jpeg .png or .webp.' }
	);

const uploadSocialIconImage = z
	.instanceof(File, {
		message: 'Please choose your project image.'
	})
	.refine((file) => file.size < 500000, { message: 'File size must be less than 500 KB.' })
	.refine(
		(file) => {
			const allowedExtensions = ['image/svg+xml'];
			return allowedExtensions.includes(file.type);
		},
		{ message: 'File type must be .jpg, .jpeg .png or .webp.' }
	);

export const profileDetailSchema = z.object({
	id: z.number().int().optional().nullable(),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(8),
	role: z.string(),

	skills: z.array(
		z.object({
			id: z.number().int(),
			userId: z.number().int().optional().nullable(),
			name: z
				.string()
				.min(1, { message: 'please input skill name' })
				.max(255, { message: 'skill name must be less than 255 characters' }),
			level: z
				.number()
				.positive({ message: 'level value must be positive' })
				.multipleOf(0.5, { message: 'Level must be a multiple of 0.5' }),
			uploadImage: uploadSkillIconImage.optional().nullable(),
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
	),
	socialLinks: z.array(
		z.object({
			id: z.number().int(),
			userId: z.number().int().optional(),
			uploadImage: uploadSocialIconImage.optional().nullable(),
			image: z
				.object({
					id: z.number().int().optional().nullable(),
					url: z.string().url(),
					isActive: z.boolean().default(true),
					socialLinkId: z.number().int().optional().nullable()
				})
				.optional()
				.nullable(),
			link: z.string().min(1, { message: 'please input link to social media' }),
			isActive: z.boolean().default(true)
		})
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
