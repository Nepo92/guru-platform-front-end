import { defineStore } from "pinia";

export const monitorWidgets = defineStore("monitorWidgets", {
	state() {
		// eslint-disable-next-line
		const tilesData = tiles || null;
		// eslint-disable-next-line
		const generalRowData = generalRow || null;

		return {
			// eslint-disable-next-line
			filter: filter || null,
			widgets: [
				{
					name: "Заявки (Ц)",
					nameEng: "order",
					value: "Виджет отключен",
					percent: null,
					plan: null,
					description: "Количество целевых обращений, учитываются из CRM",
					period: [null, 1, 2, 3, 4],
					metric: {
						green: 99,
						yellow: 65,
					},
					tabs: ["Продажи"],
				},
				{
					name: "Заказы",
					nameEng: "application",
					value: tilesData?.bill.value,
					percent: tilesData?.bill.percent,
					plan: tilesData?.bill.plan,
					description:
						"Количество оформленных заказов, учитываются как оплаченные так и не оплаченные",
					period: [null, 1, 2, 3, 4],
					metric: {
						green: 99,
						yellow: 65,
					},
					tabs: ["Продажи"],
				},
				{
					name: "Продажи",
					nameEng: "sales",
					value: tilesData?.sale.value,
					percent: tilesData?.sale.percent,
					plan: tilesData?.sale.plan,
					description:
						"Количество оплаченных заказов, учитываются как предоплаты так и полные оплаты",
					period: [null, 4, 1, 2, 3],
					metric: {
						green: 99,
						yellow: 65,
					},
					tabs: ["Продажи"],
				},
				{
					name: "Выручка",
					nameEng: "revenue",
					value: tilesData?.proceed.value,
					percent: tilesData?.proceed.percent,
					plan: tilesData?.proceed.plan,
					description: "Сумма вырученных от продаж денег",
					period: [null, 1, 2, 3, 4],
					metric: {
						green: 99,
						yellow: 65,
					},
					units: "roubles",
					tabs: ["Продажи"],
				},
				{
					name: "Прогноз",
					nameEng: "prediction",
					value: "Нет прогноза",
					percent: null,
					plan: null,
					description:
						"Прогноз выручки, считается по формуле: (факт по выручке / на количество прошедших дней) * количество дней в месяце",
					period: [null, 1, 2, 3],
					metric: {
						green: 99,
						yellow: 65,
					},
					units: "roubles",
					tabs: ["Продажи"],
				},
				{
					name: "Прогноз",
					nameEng: "prediction",
					value: tilesData?.prediction.plan,
					percent: tilesData?.deviation.percent,
					plan: tilesData?.deviation.plan,
					description:
						"Прогноз выручки, считается по формуле: (факт по выручке / на количество прошедших дней) * количество дней в месяце",
					period: [4],
					metric: {
						green: 99,
						yellow: 65,
					},
					units: "roubles",
					tabs: ["Продажи"],
				},
				{
					name: "Проверено сделок",
					nameEng: "deal-count",
					value: generalRowData?.dealCount,
					percent: null,
					description: "Количество проверенных сделок",
					period: [1, 2, 3, 4],
					metric: null,
					units: null,
					tabs: ["Контроль"],
				},
				{
					name: "Поставлено оценок",
					nameEng: "rate-count",
					value: generalRowData?.rateCount,
					percent: null,
					description: "Количество разрешенных споров",
					period: [1, 2, 3, 4],
					metric: null,
					units: null,
					tabs: ["Контроль"],
				},
				{
					name: "Споров отработано",
					nameEng: "debate-count",
					value: generalRowData?.debateCount,
					percent: null,
					description: "Количество измененных оценок в спорах",
					period: [1, 2, 3, 4],
					metric: null,
					units: null,
					tabs: ["Контроль"],
				},
				{
					name: "Изменений оценок в спорах",
					nameEng: "debate-count-estimation",
					value: generalRowData?.debateCount,
					percent: null,
					description: "Количество измененных оценок в спорах",
					period: [1, 2, 3, 4],
					metric: null,
					units: null,
					tabs: ["Контроль"],
				},
				{
					name: "Средняя оценка",
					nameEng: "score",
					value: generalRowData?.score,
					percent: null,
					description: "Средняя оценка менеджеров",
					period: [1, 2, 3, 4],
					metric: null,
					units: null,
					tabs: ["Контроль"],
				},
			],
		};
	},
});
