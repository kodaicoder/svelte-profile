import type { Skill, SkillImage } from '@prisma/client';

export default interface ISkill extends Skill {
	image: SkillImage | null;
	uploadImage?: File | null | undefined;
}
