import {
	iAnalyticRow,
	iAnalyticRowManagersProperties,
} from "../../AnalyticTable/interfacesAnalyticTable/interfacesAnalyticTable";
import { Entries } from "@/components/Platform/interfacesPlatform/interfacesPlatform";
import { iAnalyticRenderRow } from "../interfacesAnalyticStore/interfacesAnalyticStore";
import { iManager } from "@/components/Platform/interfacesPlatform/interfacesPlatform";

export function getTemplateAnalyticRow(
	analyticRowProps: Array<iAnalyticRow>,
	managersData: Array<iManager>
) {
	return analyticRowProps.map((item) => {
		const { name, nameEng, main, managers, units, visible } = item;

		const row: iAnalyticRenderRow = {
			name,
			nameEng,
			main,
			managers: null,
		};

		if (managers) {
			const managersEntries = <Entries<iAnalyticRowManagersProperties>>(
				Object.entries(managers as iAnalyticRowManagersProperties)
			);

			row.managers = managers
				? (managersEntries.map((item) => {
						if (managersData) {
							const currentManager = managersData.find((el) => el.id === (item ? +item[0] : null));

							return {
								id: item ? +item[0] : null,
								name: currentManager?.name,
								...(item ? (item[1] as iAnalyticRowManagersProperties) : null),
							};
						}
				  }) as Array<iAnalyticRowManagersProperties>)
				: null;
		}

		if (units) {
			row.units = units;
		}

		if (visible) {
			row.visible = visible;
		}

		return row;
	});
}
