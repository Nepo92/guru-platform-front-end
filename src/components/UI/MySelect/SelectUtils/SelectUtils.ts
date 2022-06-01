import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";
import { iSelectSideEffectProps } from "@/components/MyMonitor/MonitorFilter/interfacesMonitorFilter/interfacesMonitorFilter";
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import { iMyInput } from "../../MyInput/interfacesMyInput/interfacesMyInput";
import {
	Entries,
	iPlatformFilter,
} from "@/components/Platform/interfacesPlatform/interfacesPlatform";
import { ref, watch, Ref } from "vue";

class SelectUtils {
	updateValueSideEffect(props: iSelectSideEffectProps) {
		const { columns, selectName, value } = props;

		(columns as Array<iFilterColumnItem>).forEach((item) => {
			item.items = [
				...item.items.map((el) => {
					if (el.name === selectName) {
						el.selected = value;
					}

					return el;
				}),
			];
		});
	}

	initSelectAfterComponentLoad(columns: Array<iFilterColumnItem>, filter: iPlatformFilter) {
		let funnelSelect = ref({} as Ref<iMySelect | iMyInput>);

		columns.forEach((item) => {
			item.items.forEach((el) => {
				if (el.name === "Воронка") {
					funnelSelect.value = el;
				}
			});
		});

		let setPlaceholderToFunnelSelect = true;

		if (funnelSelect.value) {
			watch(funnelSelect.value, (funnel) => {
				if (setPlaceholderToFunnelSelect) {
					const selectProps = {
						columns: <object>columns,
						selectName: "Воронка",
						value: <null | boolean | string | number>filter.idFunnel,
					};

					this.updateValueSideEffect(selectProps);

					setPlaceholderToFunnelSelect = false;
				}
			});
		}
	}
}

export default SelectUtils;
