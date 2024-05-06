export default interface IShowCaseCard {
	id: number;
	title: string;
	content: string;
	images?: (string | undefined)[] | null;
	sourceLink?: string | null;
	link: string | null;
}
