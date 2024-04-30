import { Prisma } from '@prisma/client';

type IUser = Prisma.UserGetPayload<{
	include: {
		image: true;
		resume: true;
		socialLinks: {
			include: {
				image: true;
			};
		};
		skills: {
			include: {
				image: true;
			};
		};
	};
}>;

export type { IUser };
