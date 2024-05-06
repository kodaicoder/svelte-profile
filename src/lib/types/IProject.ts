import type { Project, ProjectImage } from '@prisma/client';

export default interface IProject extends Project {
	image?: ProjectImage | null;
}
