import {
	iAnalyticRowProperties,
	iAnalyticRowManagersProperties,
	iMetricColor,
} from "../../AnalyticTable/interfacesAnalyticTable/interfacesAnalyticTable";

export interface iAnalyticRenderRow {
	name: string;
	main: iAnalyticRowProperties;
	managers?: Array<iAnalyticRowManagersProperties> | null;
	units?: string;
	visible?: boolean;
	colors?: iMetricColor;
	nameEng: string;
}
