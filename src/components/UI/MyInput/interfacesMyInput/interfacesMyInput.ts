import { iNameFilterItem } from "../../MySelect/interfacesMySelect/interfacesMySelect";

export interface iMyInput {
  nameEng: Array<iNameFilterItem>;
  value: number | string | null | boolean;
  pages: Array<string>;
  name: string;
  type: string;
}
