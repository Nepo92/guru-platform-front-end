import { iMyInputProps } from "./interfacesMyInput/interfacesMyInput";

export function getTemplateInput(props: iMyInputProps) {
	const { name, nameEng, value, tabs, hasSideEffect } = props;

	return {
		type: "input",
		name,
		nameEng,
		value,
		tabs,
		hasSideEffect,
	};
}
