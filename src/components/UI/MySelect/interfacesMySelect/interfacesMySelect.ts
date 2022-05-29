import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";

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
  selected: number | string | null | boolean;
  options(): Array<iSelectOption>;
  selectedName(): iSelectOption;
  tabs: Array<string>;
  hasSideEffect?: boolean;
}

export interface iMySelectProps {
  name: string;
  nameEng: Array<iNameFilterItem>;
  selected: number | string | null | boolean;
  options: Array<iSelectOption>;
  tabs: Array<string>;
  hasSideEffect?: boolean;
}

export interface iFunnel {
  dealType: string;
  funnelName: string;
  idCompany: number;
  idFunnel: number;
}

export type FunnelsTypes = {
  [key: string]: Array<iFunnel>;
};

export interface iChangeDealTypeProps {
  columns: Array<iFilterColumnItem>;
  value: null | boolean | string | number;
  funnels: Promise<FunnelsTypes>;
  selectName: string;
}

export interface iEmitSideEffectProps {
  selectName: string;
  value: null | boolean | string | number;
  target: HTMLElement | null;
}
