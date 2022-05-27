import { iMySelectProps } from "./interfacesMySelect/interfacesMySelect";

export function getTemplateSelect(selectProps: iMySelectProps) {
  const { nameEng, selected, options, tabs } = selectProps;

  return {
    type: "select",
    nameEng,
    selected,
    options() {
      return options;
    },
    selectedName() {
      return this.options().find((el) => el.value === this.selected);
    },
    tabs,
  };
}
