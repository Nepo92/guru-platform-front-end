import { iChangeAdvCabinetProps } from "../../interfacesAnalyticFilter/interfacesAnalyticFilter";
import { iSelectOption } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import AnalyticFilterUtils from "../AnalyticFilterUtils";
import { iMyInput } from "@/components/UI/MyInput/interfacesMyInput/interfacesMyInput";

const analyticFilterUtils = new AnalyticFilterUtils();

class ChangeAdvertiserCabinet {
	changeAdvertisingСabinet(props: iChangeAdvCabinetProps) {
		const { columns, activeTab } = props;

		const currentColumns = analyticFilterUtils.getCurrentColumns(columns, activeTab);

		if (currentColumns.length) {
			let sourceItem;
			let platformItem;
			let audienceItem;

			currentColumns.forEach((item) => {
				const source = item.items.find((el) => el.name === "Источники трафика");
				const platform = item.items.find((el) => el.name === "Площадка");
				const audience = item.items.find((el) => el.name === "Аудитории");

				if (source) {
					sourceItem = <iMySelect>source;
				}

				if (platform) {
					platformItem = <iMySelect>platform;
				}

				if (audience) {
					audienceItem = <iMyInput>audience;
				}
			});

			if (sourceItem) {
				(sourceItem as iMySelect).options = (): Array<iSelectOption> => {
					return [
						{
							name: "Все источники",
							value: "all",
						},
					];
				};

				(sourceItem as iMySelect).selected = "all";
			}

			if (platformItem) {
				(platformItem as iMySelect).selected = "all";
			}

			if (audienceItem) {
				(audienceItem as iMyInput).value = ["Все аудитории"];
			}
		}
	}
}

export default ChangeAdvertiserCabinet;
