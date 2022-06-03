import { defineStore } from "pinia";

export const contractStore = defineStore("contractStore", {
	state() {
		return {
			headerProps: {
				title: "Договора",
				tabs: [
					{
						name: "Для клиента",
						link: null,
						settings: false,
					},
					{
						name: "Для исполнителя",
						link: null,
						settings: false,
					},
				],
				color: true,
				settings: false,
				border: false,
				activeTab: "Для клиента",
			},
		};
	},
});
