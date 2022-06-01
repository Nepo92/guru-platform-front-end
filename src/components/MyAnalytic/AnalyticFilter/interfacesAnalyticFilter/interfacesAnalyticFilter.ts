import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";
import { Ref } from "vue";

export interface iFunnel {
	dealType: string;
	funnelName: string;
	idCompany: number;
	idFunnel: number;
}

export interface iAnalyticFilterProps {
	start: number;
	end: number;
	periodSeparate: number;
}

export type funnelsTypes = {
	[key: string]: Array<iFunnel>;
};

export interface iChangeDealTypeProps {
	columns: Array<iFilterColumnItem>;
	value: null | boolean | string | number;
	funnels: Promise<funnelsTypes>;
	selectName: string;
	activeTab: string;
}

export interface iChangePlatformProps {
	columns: Array<iFilterColumnItem>;
	value: null | boolean | string | number;
	selectName: string;
	activeTab: Ref<string>;
	loader: Ref<HTMLElement>;
}

export interface iChangeSourceOptionsProps {
	columns: Array<iFilterColumnItem>;
	activeTab: Ref<string>;
	value: string | number | boolean | null;
	channels: Array<string>;
}

export interface iChangeAdvCabinetProps {
	columns: Array<iFilterColumnItem>;
	activeTab: Ref<string>;
	value: string | number | boolean | null;
}

export interface iChangeSourceProps {
	columns: Array<iFilterColumnItem>;
	activeTab: Ref<string>;
	value: string | number | boolean | null;
}
