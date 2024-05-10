import type { SocialLink, SocialLinkImage } from '@prisma/client';

export default interface ISocialLink extends SocialLink {
	image: SocialLinkImage | null;
	uploadImage?: File | null | undefined;
}
