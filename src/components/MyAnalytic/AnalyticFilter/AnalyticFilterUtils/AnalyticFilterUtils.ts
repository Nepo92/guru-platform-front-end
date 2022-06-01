import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";
import { Ref } from "vue";

class AnalyticFilterUtils {
	getCurrentColumns(columns: Array<iFilterColumnItem>, activeTab: Ref<string>) {
		return columns.filter((el) => el.tabs.includes(activeTab.value));
	}
}

export default AnalyticFilterUtils;
