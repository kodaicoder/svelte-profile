import type { Article, ArticleImage } from '@prisma/client';

export default interface IArticle extends Article {
	image?: ArticleImage | null;
}
