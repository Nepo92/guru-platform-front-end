import { iMyInputProps } from "./interfacesMyInput/interfacesMyInput";

export function getTemplateInput(props: iMyInputProps) {
  const { name, nameEng, value, tabs } = props;

  return {
    name,
    nameEng,
    value,
    tabs,
  };
}
