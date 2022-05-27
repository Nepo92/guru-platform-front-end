import { InputHTMLAttributes } from "vue";

export interface iNameFilterItem {
  tabs: Array<string>;
  name: string;
}

export interface iSelectOption {
  name: string;
  value: string;
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
}

export interface iMySelectProps {
  name: string;
  nameEng: Array<iNameFilterItem>;
  selected: number | string | null | boolean;
  options: Array<iSelectOption>;
  tabs: Array<string>;
}
