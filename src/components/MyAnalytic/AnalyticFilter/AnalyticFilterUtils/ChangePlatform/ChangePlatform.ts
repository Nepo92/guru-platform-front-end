import { iChangePlatformProps } from "../../interfacesAnalyticFilter/interfacesAnalyticFilter";
import { monitorAPI } from "@/api/api";
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import { iSelectOption } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import { iChangeSourceOptionsProps } from "../../interfacesAnalyticFilter/interfacesAnalyticFilter";
import AnalyticFilterUtils from "../AnalyticFilterUtils";
import { iMyInput } from "@/components/UI/MyInput/interfacesMyInput/interfacesMyInput";
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";

const analyticFilterUtils = new AnalyticFilterUtils();
const loaderUtils = new LoaderUtils();

class ChangePlatform {
	changePlatform(props: iChangePlatformProps) {
		const { value, columns, activeTab, loader } = props;

		const currentColumns = analyticFilterUtils.getCurrentColumns(columns, activeTab);

		const formData = new FormData();

		formData.set("platform", `${value}`);

		const getChannels = monitorAPI.getChannels(formData);

		const showLoader = setTimeout(() => {
			loaderUtils.showLoader(loader);
		}, 400);

		getChannels.then(
			(channels) => {
				clearTimeout(showLoader);
				loaderUtils.hideLoader(loader);

				const changeOptionsProps = {
					columns: currentColumns,
					activeTab,
					value,
					channels,
				};

				this.#changeOptionsInSourceSelect(changeOptionsProps);

				let audienceItem;

				columns.forEach((item) => {
					const audience = item.items.find((el) => el.name === "Аудитории");

					if (audience) {
						audienceItem = audience;
					}
				});

				if (audienceItem) {
					(audienceItem as iMyInput).value = ["Все aудитории"];
				}
			},
			() => {
				clearTimeout(showLoader);
				loaderUtils.hideLoader(loader);
			}
		);
	}

	#changeOptionsInSourceSelect(changeOptionsProps: iChangeSourceOptionsProps) {
		const { value, channels, columns, activeTab } = changeOptionsProps;

		let sourceItem;
		let platformItem;

		columns.forEach((item) => {
			const source = item.items.find((el) => el.name === "Источники трафика");
			const platform = item.items.find((el) => el.name === "Площадка");

			if (source) {
				sourceItem = source;
			}

			if (platform) {
				platformItem = <iMySelect>platform;
			}
		});

		if (sourceItem && platformItem) {
			const sourceData = this.#getSourceOptions.find((el) => el.value === value);

			if (sourceData) {
				(sourceItem as iMySelect).options = sourceData.options;
				(sourceItem as iMySelect).selected = sourceData.selected;
			} else {
				(sourceItem as iMySelect).options = (): Array<iSelectOption> => [
					{
						value: "all",
						name: "Все источники",
					},
					...channels.map((el: string) => <iSelectOption>{ value: el, name: el }),
				];

				(sourceItem as iMySelect).selected = "all";
			}
		}
	}

	get #getSourceOptions() {
		return [
			{
				value: "all",
				selected: "all",
				options() {
					return [
						{
							value: "all",
							name: "Все источники",
						},
					];
				},
			},
			{
				value: "unknown",
				selected: "unknown",
				options() {
					return <Array<iSelectOption>>[
						{
							value: "unknown",
							name: "Неизвестно",
						},
					];
				},
			},
		];
	}
}

export default ChangePlatform;
