import type { Skill, SkillImage } from '@prisma/client';

export default interface ISkill extends Required<Skill & SkillImage> {
	image: SkillImage;
}
