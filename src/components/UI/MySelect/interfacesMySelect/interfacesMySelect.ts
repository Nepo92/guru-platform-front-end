import { InputHTMLAttributes } from "vue";

export interface iNameFilterItem {
  tabs: Array<string>;
  name: string;
}

export interface iSelectOption {
  name: string;
  value: string;
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
