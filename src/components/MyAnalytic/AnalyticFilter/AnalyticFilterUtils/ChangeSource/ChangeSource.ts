import { iMyInput } from "@/components/UI/MyInput/interfacesMyInput/interfacesMyInput";
import { iChangeSourceProps } from "../../interfacesAnalyticFilter/interfacesAnalyticFilter";

class ChangeSource {
	changeSource(props: iChangeSourceProps) {
		const { columns } = props;

		let audienceItem;

		columns.forEach((item) => {
			const audience = item.items.find((el) => el.name === "Аудитории");

			if (audience) {
				audienceItem = audience;
			}
		});

		if (audienceItem) {
			(audienceItem as iMyInput).value = ["Все аудитории"];
		}
	}
}

export default ChangeSource;
