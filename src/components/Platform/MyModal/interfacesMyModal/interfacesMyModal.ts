import { Ref } from "vue";

export interface iCreateModal {
	modal: Ref<HTMLElement>;
	wrapper: Ref<HTMLElement>;
	slotData?: unknown;
}

export interface iModal {
	modal: Ref<HTMLElement>;
	wrapper: Ref<HTMLElement>;
	isOverflowed: boolean;
}

export interface iModalWrapper {
	applyText: string;
	apply(e: MouseEvent): void;
	title: string;
	hasCancel: boolean;
	cancel(): void;
	cancelText: string;
	nested: boolean;
	hasApply: boolean;
	size: string;
}
