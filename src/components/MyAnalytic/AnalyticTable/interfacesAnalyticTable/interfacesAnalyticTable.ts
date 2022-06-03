import { Ref } from "vue";
import { iFunnelVisible } from "@/components/Platform/interfacesPlatform/interfacesPlatform";

export interface iAnalyticRowProperties {
	sum: number;
	sums: Array<number>;
}

export interface iAnalyticRowManagersProperties {
	id?: number;
	sum: number;
	sums: Array<number>;
	[key: number]: iAnalyticRowProperties;
	name: string;
}

export interface iMetricColor {
	green: number;
	yellow: number;
	red: number;
}

export interface iAnalyticRow {
	name: string;
	main: iAnalyticRowProperties;
	managers: iAnalyticRowManagersProperties | null;
	units?: string;
	visible?: boolean;
	colors?: iMetricColor;
	nameEng: string;
}

export interface iCurrentAnalytic {
	tabs: string;
	items: Array<iAnalyticRow>;
}

export interface iCurrentProps {
	searchRow: Ref<string>;
	rows: Array<iCurrentAnalytic>;
	activeTab: string;
	colors: iAnalyticColors;
	visibleSettings: iFunnelVisible;
}

export interface iAnalyticColors {
	kpdColor: iMetricColor;
	ratingColor: iMetricColor;
}

export interface iGetPeriodItemsProps {
	currentRows: Ref<Array<iAnalyticRow>>;
	start: number;
	periodSeparate: number;
	months: Array<string>;
	periodLength?: number;
}
