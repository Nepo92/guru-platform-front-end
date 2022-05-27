import { iMyInput } from "@/components/UI/MyInput/interfacesMyInput/interfacesMyInput";
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";

export interface iFilterColumnItem {
  name: string;
  items: Array<iMySelect | iMyInput>;
  tabs: Array<string>;
}
