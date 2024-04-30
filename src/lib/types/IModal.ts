import type { ModalSettings } from '@skeletonlabs/skeleton';

export interface CustomModalSettings<T = null> extends ModalSettings {
	meta?: IMetaData<T>;
}

export interface IMetaData<T> {
	initialData?: T;
	title: string;
	form?: {
		name: string;
		method: string;
		action: string;
		children: {
			name: string;
			element: string;
			type: string;
			label?: string | null;
		}[];
	};
	button: {
		submit: {
			label: string;
		};
		cancel: {
			label: string;
		};
	};
	swal?: {
		success: {
			title: string;
			text?: string;
			html?: string;
		};
		error: {
			title: string;
			text?: string;
			html?: string;
		};
	};
}
