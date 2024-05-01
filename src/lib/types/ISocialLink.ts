import type { SocialLink, SocialLinkImage } from '@prisma/client';

export default interface ISocialLink extends Required<SocialLink & SocialLinkImage> {
	image: SocialLinkImage;
}
