import { iChangeDealTypeProps } from "../../interfacesAnalyticFilter/interfacesAnalyticFilter";
import { Entries } from "@/components/Platform/interfacesPlatform/interfacesPlatform";
import { funnelsTypes } from "../../interfacesAnalyticFilter/interfacesAnalyticFilter";
import { iFunnel } from "../../interfacesAnalyticFilter/interfacesAnalyticFilter";

class ChangeDealType {
	changeDealType(props: iChangeDealTypeProps) {
		const { funnels } = props;
		let { columns } = props;

		funnels.then((funnelsMap) => {
			const currentFunnels = this.#getCurrentFunnels(props, funnelsMap);

			columns.forEach((el) => {
				el.items.forEach((item) => {
					if (item.name === "Воронка") {
						item.options = () => {
							return [
								{
									name: "Все воронки",
									value: 0,
								},
								...(currentFunnels || []).map((elem) => {
									return {
										name: elem.funnelName,
										value: elem.idFunnel,
									};
								}),
							];
						};

						item.selected = 0;
					}
				});
			});
		});
	}

	#getCurrentFunnels(props: iChangeDealTypeProps, funnelsMap: funnelsTypes) {
		const { value } = props;

		const funnels = <Entries<funnelsTypes>>Object.entries(funnelsMap);

		const currentFunnels = <[string, iFunnel[]]>(
			funnels.find((el: [string, iFunnel[]]) => el[0] === value)
		);

		if (currentFunnels) {
			const [, data] = currentFunnels;

			return data;
		}
	}
}

export default ChangeDealType;
