import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(25, { message: 'Password must be at most 25 characters' })
			.regex(new RegExp('.*[A-Z].*'), {
				message: 'Password must contain at least one Uppercase and one lowercase and one number'
			})
			.regex(new RegExp('.*[a-z].*'), {
				message: 'Password must contain at least one Uppercase and one lowercase and one number'
			})
			.regex(new RegExp('.*[0-9].*'), {
				message: 'Password must contain at least one Uppercase and one lowercase and one number'
			}),

		confirmPassword: z.string().min(6).max(25),
		firstName: z
			.string()
			.min(2, 'First name must be at least 2 letters')
			.max(100, 'First name must be at most 100 letters'),
		lastName: z
			.string()
			.min(2, 'Last name must be at least 2 letters')
			.max(100, 'Last name must be at most 100 letters')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});
