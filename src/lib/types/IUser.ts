import type { User, UserImage, Resume } from '@prisma/client';
import type ISkill from './ISkill';
import type ISocialLink from './ISocialLink';

export default interface IUser extends User {
	image: UserImage;
	resume: Resume;
	skills: ISkill[];
	socialLinks: ISocialLink[];
}
