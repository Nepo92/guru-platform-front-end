export interface iNameFilterItem {
	tabs: Array<string>;
	name: string;
}

export interface iSelectOption {
	name: string;
	value: string | number | boolean | null;
	tabs?: Array<string>;
}

export interface iMySelect {
	type: string;
	name: string;
	nameEng: Array<iNameFilterItem>;
	selected: number | string | null | boolean | Array<string>;
	options(): Array<iSelectOption>;
	selectedName(): iSelectOption;
	tabs: Array<string>;
	hasSideEffect?: boolean;
}

export interface iMySelectProps {
	name: string;
	nameEng: Array<iNameFilterItem>;
	selected: number | string | null | boolean | Array<string>;
	options: Array<iSelectOption>;
	tabs: Array<string>;
	hasSideEffect?: boolean;
}

export interface iEmitSideEffectProps {
	selectName: string;
	value: null | boolean | string | number;
	target: HTMLElement | null;
	activeTab: string;
}
