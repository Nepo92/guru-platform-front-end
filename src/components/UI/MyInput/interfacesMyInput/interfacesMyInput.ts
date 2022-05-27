import { iNameFilterItem } from "../../MySelect/interfacesMySelect/interfacesMySelect";

export interface iMyInput {
  nameEng: Array<iNameFilterItem>;
  value: number | string | null | boolean;
  pages: Array<string>;
  name: string;
  type: string;
  tabs?: Array<string>;
  options?: Array<any>;
}

export interface iMyInputProps {
  name: string;
  nameEng: Array<iNameFilterItem>;
  selected: number | string | null | boolean;
  value: number | string | null | boolean;
  tabs: Array<string>;
  options?: Array<any>;
}
