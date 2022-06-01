import { getTemplateSelect } from "@/components/UI/MySelect/MySelectTemplate";
import { defineStore } from "pinia";
import { getTemplateInput } from "@/components/UI/MyInput/MyInputTemplate";

export const analyticStore = defineStore("analyticStore", {
	state() {
		const dealType = [
			{ name: "База", value: "additional" },
			{ name: "Трафик", value: "traffic" },
		];

		const employees = [true, false];

		// eslint-disable-next-line
		const filterData = filter || null;

		// eslint-disable-next-line
		const managersFilterData = managersFilter || null;
		// eslint-disable-next-line
		const projectsData = projects || null;
		// eslint-disable-next-line
		const coursesData = courses || null;
		// eslint-disable-next-line
		const advertisersData = advertisers || null;
		// eslint-disable-next-line
		const platformsData = platforms || null;
		// eslint-disable-next-line
		const channelsData = channels || null;
		// eslint-disable-next-line
		const totalRevenueData = totalRevenue || null;
		// eslint-disable-next-line
		const managerTotalRevenueData = managerTotalRevenue || null;
		// eslint-disable-next-line
		const trafficRevenueData = trafficRevenue || null;
		// eslint-disable-next-line
		const managerTrafficRevenueData = managerTrafficRevenue || null;
		// eslint-disable-next-line
		const additionalRevenueData = additionalRevenue || null;
		// eslint-disable-next-line
		const managerAdditionalRevenueData = managerAdditionalRevenue || null;
		// eslint-disable-next-line
		const managersData = managers || null;
		// eslint-disable-next-line
		const advExpensesData = advExpenses || null;
		// eslint-disable-next-line
		const managerAdvExpensesData = managerAdvExpenses || null;
		// eslint-disable-next-line
		const kpdData = kpd || null;
		// eslint-disable-next-line
		const managerKpdData = managerKpd || null;
		// eslint-disable-next-line
		const salesData = sales || null;
		// eslint-disable-next-line
		const managerSalesData = managerSales || null;
		// eslint-disable-next-line
		const salesTrafficData = salesTraffic || null;
		// eslint-disable-next-line
		const managerSalesTrafficData = managerSalesTraffic || null;
		// eslint-disable-next-line
		const salesMailingData = salesMailing || null;
		// eslint-disable-next-line
		const managerSalesMailingData = managerSalesMailing || null;
		// eslint-disable-next-line
		const salesAdditionalData = salesAdditional || null;
		// eslint-disable-next-line
		const managerSalesAdditionalData = managerSalesAdditional || null;
		// eslint-disable-next-line
		const rejectsRowData = rejectsRow || null;
		// eslint-disable-next-line
		const mRejectsRowData = mRejectsRow || null;
		// eslint-disable-next-line
		const averageData = average || null;
		// eslint-disable-next-line
		const managerAverageData = managerAverage || null;
		// eslint-disable-next-line
		const averageTrafficMailingData = averageTrafficMailing || null;
		// eslint-disable-next-line
		const managerAverageTrafficMailingData = managerAverageTrafficMailing || null;
		// eslint-disable-next-line
		const averageAdditionalData = averageAdditional || null;
		// eslint-disable-next-line
		const managerAverageAdditionalData = managerAverageAdditional || null;
		// eslint-disable-next-line
		const profitData = profit || null;
		// eslint-disable-next-line
		const managerProfitData = managerProfit || null;
		// eslint-disable-next-line
		const ratingData = rating || null;
		// eslint-disable-next-line
		const managerRatingData = managerRating || null;
		// eslint-disable-next-line
		const shareAdvExpensesTrafficPageData = shareAdvExpensesTrafficPage || null;
		// eslint-disable-next-line
		const managerShareAdvExpensesTrafficPageData = managerShareAdvExpensesTrafficPage || null;
		// eslint-disable-next-line
		const advShowData = advShow || null;
		// eslint-disable-next-line
		const managerAdvShowData = managerAdvShow || null;
		// eslint-disable-next-line
		const advClickData = advClick || null;
		// eslint-disable-next-line
		const managerAdvClickData = managerAdvClick || null;
		// eslint-disable-next-line
		const advApplicationData = advApplication || null;
		// eslint-disable-next-line
		const managerAdvApplicationData = managerAdvApplication || null;
		// eslint-disable-next-line
		const importantRowData = importantRow || null;
		// eslint-disable-next-line
		const managerImportantRowData = managerImportantRow || null;
		// eslint-disable-next-line
		const invoicesData = invoices || null;
		// eslint-disable-next-line
		const managerInvoicesData = managerInvoices || null;
		// eslint-disable-next-line
		const salesNewClientData = salesNewClient || null;
		// eslint-disable-next-line
		const managerSalesNewClientData = managerSalesNewClient || null;
		// eslint-disable-next-line
		const salesNewClientNMData = salesNewClientNM || null;
		// eslint-disable-next-line
		const salesMNewClientNMData = salesMNewClientNM || null;
		// eslint-disable-next-line
		const salesNewClientMData = salesNewClientM || null;
		// eslint-disable-next-line
		const salesMNewClientMData = salesMNewClientM || null;
		// eslint-disable-next-line
		const newClientsDoData = newClientsDo || null;
		// eslint-disable-next-line
		const newMClientsDoData = newMClientsDo || null;
		// eslint-disable-next-line
		const newClientsTrafficData = newClientsTraffic || null;
		// eslint-disable-next-line
		const newMClientsTrafficData = newMClientsTraffic || null;
		// eslint-disable-next-line
		const newClientsAllData = newClientsAll || null;
		// eslint-disable-next-line
		const newMClientsAllData = newMClientsAll || null;
		// eslint-disable-next-line
		const newClientsWithoutMailingData = newClientsWithoutMailing || null;
		// eslint-disable-next-line
		const newMClientsWithoutMailingData = newMClientsWithoutMailing || null;
		// eslint-disable-next-line
		const newClientsWithMailingData = newClientsWithMailing || null;
		// eslint-disable-next-line
		const newMClientsWithMailingData = newMClientsWithMailing || null;
		// eslint-disable-next-line
		const averageCheckTrafficData = averageCheckTraffic || null;
		// eslint-disable-next-line
		const managerAverageCheckTrafficData = managerAverageCheckTraffic || null;
		// eslint-disable-next-line
		const showPriceData = showPrice || null;
		// eslint-disable-next-line
		const mShowPriceData = mShowPrice || null;
		// eslint-disable-next-line
		const clickPriceData = clickPrice || null;
		// eslint-disable-next-line
		const mClickPriceData = mClickPrice || null;
		// eslint-disable-next-line
		const applicationPriceData = applicationPrice || null;
		// eslint-disable-next-line
		const mApplicationPriceData = mApplicationPrice || null;
		// eslint-disable-next-line
		const importantPriceRowData = importantPriceRow || null;
		// eslint-disable-next-line
		const mImportantPriceRowData = mImportantPriceRow || null;
		// eslint-disable-next-line
		const invoicePriceData = invoicePrice || null;
		// eslint-disable-next-line
		const mInvoicePriceData = mInvoicePrice || null;
		// eslint-disable-next-line
		const clientPriceDoData = clientPriceDo || null;
		// eslint-disable-next-line
		const mClientPriceDoData = mClientPriceDo || null;
		// eslint-disable-next-line
		const showToClickData = showToClick || null;
		// eslint-disable-next-line
		const mShowToClickData = mShowToClick || null;
		// eslint-disable-next-line
		const clickToApplicationData = clickToApplication || null;
		// eslint-disable-next-line
		const mClickToApplicationData = mClickToApplication || null;
		// eslint-disable-next-line
		const applicationToInvoiceData = applicationToInvoice || null;
		// eslint-disable-next-line
		const mApplicationToInvoiceData = mApplicationToInvoice || null;
		// eslint-disable-next-line
		const invoiceToClientData = invoiceToClient || null;
		// eslint-disable-next-line
		const mInvoiceToClientData = mInvoiceToClient || null;
		// eslint-disable-next-line
		const mApplicationToClientData = mApplicationToClient || null;
		// eslint-disable-next-line
		const applicationToClientData = applicationToClient || null;
		// eslint-disable-next-line
		const clickToApplicationDoData = clickToApplicationDo || null;
		// eslint-disable-next-line
		const mClickToApplicationDoData = mClickToApplicationDo || null;
		// eslint-disable-next-line
		const CV5RowData = CV5Row || null;
		// eslint-disable-next-line
		const mCV5RowData = mCV5Row || null;
		// eslint-disable-next-line
		const prescribedData = prescribed || null;
		// eslint-disable-next-line
		const managerPrescribedData = managerPrescribed || null;
		// eslint-disable-next-line
		const prescribedToSaleData = prescribedToSale || null;
		// eslint-disable-next-line
		const managerPrescribedToSaleData = managerPrescribedToSale || null;
		// eslint-disable-next-line
		const kpdColorData = kpdColor || null;
		// eslint-disable-next-line
		const ratingColorData = ratingColor || null;
		// eslint-disable-next-line
		const clientPriceData = clientPrice || null;
		// eslint-disable-next-line
		const mClientPriceData = mClientPrice || null;

		return {
			filter: filter || null,
			selectPeriod: getTemplateSelect({
				name: "",
				nameEng: [
					{
						tabs: ["Общая", "Трафик", "База"],
						name: "idSort",
					},
				],
				selected: filter.idSort,
				options: [
					{
						tabs: ["Общая", "Трафик", "База"],
						name: "По месяцам",
						value: 0,
					},
					{
						tabs: ["Общая", "Трафик", "База"],
						name: "По неделям",
						value: 1,
					},
					{
						tabs: ["Общая", "Трафик", "База"],
						name: "По дням",
						value: 2,
					},
				],
				tabs: ["Общая", "Трафик", "База"],
				hasSideEffect: true,
			}),
			datepickers: [],
			months: [
				"Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октярь",
				"Ноябрь",
				"Декабрь",
			],
			title: [
				{
					title: "Фильтровать аналитику",
					tabs: ["Общая"],
				},
				{
					title: "Фильтровать воронку",
					tabs: ["Трафик", "База"],
				},
			],
			filterProps: {
				columns: [
					{
						name: "Параметры",
						items: [
							getTemplateSelect({
								name: "Менеджер",
								nameEng: [
									{
										name: "idManager",
										tabs: ["Общая", "Трафик"],
									},
								],
								selected: filterData?.idManager,
								options: [
									{
										name: "Все Менеджеры",
										value: 0,
										title: null,
									},
									...(managersFilterData || []).map((el) => {
										return {
											name: el.name,
											value: el.id,
											title: el.name,
										};
									}),
								],
								tabs: ["Общая", "Трафик"],
							}),
							getTemplateSelect({
								name: "Проект",
								nameEng: [
									{
										tabs: ["Общая", "Трафик"],
										name: "project",
									},
								],
								selected: filterData?.project,
								options: [
									{
										name: "Все проекты",
										value: 0,
									},
									...(projectsData || []).map((project) => {
										return {
											name: project.name,
											value: project.id,
										};
									}),
								],
								tabs: ["Общая", "Трафик"],
							}),
							getTemplateSelect({
								name: "Продукт",
								nameEng: [
									{
										tabs: ["Общая", "Трафик"],
										name: "course",
									},
								],
								selected: filterData?.course,
								options: [
									{
										name: "Все продукты",
										value: "all",
									},
									...(coursesData || []).map((el) => {
										return {
											name: el,
											value: el,
										};
									}),
								],
								tabs: ["Общая", "Трафик"],
							}),
							getTemplateSelect({
								name: "Тип сделки",
								nameEng: [
									{
										tabs: ["Общая"],
										name: "dealType",
									},
								],
								selected: filterData?.dealType,
								options: [
									{
										name: "Все сделки",
										value: filter.dealType === null ? null : "all",
									},
									...(dealType || []).map((el) => {
										return {
											name: el.name,
											value: el.value,
										};
									}),
								],
								tabs: ["Общая"],
								hasSideEffect: true,
							}),
							getTemplateSelect({
								name: "Сотрудники",
								nameEng: [
									{
										tabs: ["Общая", "Трафик"],
										name: "isNotDismiss",
									},
								],
								selected: filterData?.isNotDismiss,
								options: [
									{
										name: "Все сотрудники",
										value: null,
									},
									...(employees || []).map((el) => {
										return {
											name: el ? "Работающие" : "Уволенные",
											value: el,
										};
									}),
								],
								tabs: ["Общая", "Трафик"],
							}),
							getTemplateSelect({
								name: "Воронка",
								nameEng: [
									{
										tabs: ["Общая"],
										name: "idFunnel",
									},
								],
								selected: filterData?.idFunnel,
								options: [
									{
										name: "Все воронки",
										value: 0,
									},
								],
								tabs: ["Общая"],
							}),
							getTemplateSelect({
								name: "Цели",
								nameEng: [
									{
										tabs: ["Общая", "Трафик"],
										name: "target",
									},
								],
								selected: filterData?.target,
								options: [
									{
										name: "Все цели",
										value: "all",
									},
									{
										name: "Профиль",
										value: "Подписка",
									},
									{
										name: "Посадочная",
										value: "Заявка",
									},
								],
								tabs: ["Трафик"],
							}),
						],
						tabs: ["Общая", "Трафик"],
					},
					{
						name: "Аудитории",
						items: [
							getTemplateSelect({
								name: "Рекламный кабинет",
								nameEng: [
									{
										name: "idUser",
										tabs: ["Трафик"],
									},
								],
								selected: filterData?.idUser,
								options: [
									{
										name: "Все кабинеты",
										value: 0,
										title: null,
									},
									...(advertisersData || []).map((el) => {
										return {
											name: el.name,
											value: el.id,
											title: el.name,
										};
									}),
								],
								hasSideEffect: true,
								tabs: ["Трафик"],
							}),
							getTemplateSelect({
								name: "Площадка",
								nameEng: [
									{
										name: "platform",
										tabs: ["Трафик"],
									},
								],
								selected: filterData?.platform,
								options: [
									{
										name: "Все площадки",
										value: "all",
										title: null,
									},
									{
										name: "Неизвестно",
										value: "unknown",
										title: "Неизвестно",
									},
									...(platformsData || []).map((el) => {
										return {
											name: el,
											value: el,
											title: el,
										};
									}),
								],
								hasSideEffect: true,
								tabs: ["Трафик"],
							}),
							getTemplateSelect({
								name: "Источники трафика",
								nameEng: [
									{
										name: "channel",
										tabs: ["/funnel/traffic/"],
									},
								],
								selected: filterData?.channel,
								options: [
									{
										name: "Все источники",
										value: "all",
										title: "Все источники",
									},
								],
								hasSideEffect: true,
								tabs: ["Трафик"],
							}),
							getTemplateInput({
								name: "Аудитории",
								nameEng: [
									{
										name: "communites",
										tabs: ["Трафик"],
									},
								],
								value: filterData?.communites,
								tabs: ["Трафик"],
								hasSideEffect: true,
							}),
						],
						tabs: ["Трафик"],
					},
				],
			},
			analyticData: {
				managers: managersData,
				rows: [
					{
						tabs: "Общая",
						items: [
							{
								name: "Выручка общая",
								nameEng: "totalRevenueData",
								main: totalRevenueData,
								managers: managerTotalRevenueData
									? Object.entries(managerTotalRevenueData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "Выручка с трафика",
								nameEng: "trafficRevenue",
								main: trafficRevenueData,
								managers: managerTrafficRevenueData
									? Object.entries(managerTrafficRevenueData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "Выручка с базы",
								nameEng: "additionalRevenue",
								main: additionalRevenueData,
								managers: managerAdditionalRevenueData
									? Object.entries(managerAdditionalRevenueData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "Расходы на рекламу",
								nameEng: "advExpenses",
								main: advExpensesData,
								managers: managerAdvExpensesData
									? Object.entries(managerAdvExpensesData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "КПД",
								nameEng: "KPD",
								main: kpdData,
								managers: managerKpdData
									? Object.entries(managerKpdData).map((item) => {
											return item[1];
									  })
									: null,
							},
							{
								name: "Продажи всего",
								nameEng: "sales",
								main: salesData,
								managers: managerSalesData
									? Object.entries(managerSalesData).map((item) => {
											return item[1];
									  })
									: null,
							},
							{
								name: "Продажи трафик",
								nameEng: "salesTraffic",
								main: salesTrafficData,
								managers: managerSalesTrafficData
									? Object.entries(managerSalesTrafficData).map((item) => {
											return item[1];
									  })
									: null,
							},
							{
								name: "Продажи рассылка",
								nameEng: "salesMailing",
								main: salesMailingData,
								managers: managerSalesMailingData
									? Object.entries(managerSalesMailingData).map((item) => {
											return item[1];
									  })
									: null,
							},
							{
								name: "Продажи база",
								nameEng: "salesAdditional",
								main: salesAdditionalData,
								managers: managerSalesAdditionalData
									? Object.entries(managerSalesAdditionalData).map((item) => {
											return item[1];
									  })
									: null,
							},
							{
								name: "Отказов",
								nameEng: "rejectsRow",
								main: rejectsRowData,
								managers: mRejectsRowData
									? Object.entries(mRejectsRowData).map((item) => {
											return item[1];
									  })
									: null,
							},
							{
								name: "Средний чек",
								nameEng: "average",
								main: averageData,
								managers: managerAverageData
									? Object.entries(managerAverageData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "Средний чек трафик",
								nameEng: "averageTrafficMailing",
								main: averageTrafficMailingData,
								managers: managerAverageTrafficMailingData
									? Object.entries(managerAverageTrafficMailingData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "Средний чек база",
								nameEng: "averageAdditional",
								main: averageAdditionalData,
								managers: managerAverageAdditionalData
									? Object.entries(managerAverageAdditionalData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "Выручка общая - расходы на рекламу",
								nameEng: "profit",
								main: profitData,
								managers: managerProfitData
									? Object.entries(managerProfitData).map((item) => {
											return item[1];
									  })
									: null,
								units: "₽",
							},
							{
								name: "Рейтинг",
								nameEng: "rating",
								main: ratingData,
								managers: managerRatingData
									? Object.entries(managerRatingData).map((item) => {
											return item[1];
									  })
									: null,
							},
						],
					},
					{
						tabs: "Трафик",
						items: [
							{
								name: "Выручка общая",
								nameEng: "totalRevenue",
								main: totalRevenueData,
								managers: managerTotalRevenueData,
								units: "₽",
								visible: filterData?.visableSetting.blockProceed,
							},
							{
								name: "Расходы на рекламу",
								nameEng: "advExpenses",
								main: advExpensesData,
								managers: managerAdvExpensesData,
								units: "₽",
								visible: filterData?.visableSetting.blockAdvertisingExpenses,
							},
							{
								name: "Выручка общая - расходы на рекламу",
								nameEng: "profit",
								main: profitData,
								managers: managerProfitData,
								units: "₽",
								visible: filterData?.visableSetting.blockProceedAdvertisingExpenses,
							},
							{
								name: "% ДРР (доля рекламных расходов)",
								nameEng: "shareAdvExpensesTrafficPage",
								main: shareAdvExpensesTrafficPageData,
								managers: managerShareAdvExpensesTrafficPageData,
								units: "%",
								visible: filterData?.visableSetting.blockPercentNetProceed,
							},
							{
								name: "КПД",
								nameEng: "KPD",
								main: kpdData,
								managers: managerKpdData,
								visible: filterData?.visableSetting.blockKPD,
							},
							{
								name: "Показов",
								nameEng: "advShow",
								main: advShowData,
								managers: managerAdvShowData,
								visible: filterData?.visableSetting.blockShows,
							},
							{
								name: "Кликов",
								nameEng: "advClick",
								main: advClickData,
								managers: managerAdvClickData,
								visible: filterData?.visableSetting.blockClicks,
							},
							{
								name: "Заявок",
								nameEng: "advApplication",
								main: advApplicationData,
								managers: managerAdvApplicationData,
								visible: filterData?.visableSetting.blockApplications,
							},
							{
								name: "Целевых заявок",
								nameEng: "importantRow",
								main: importantRowData,
								managers: managerImportantRowData,
								visible: filterData?.visableSetting.blockAveragePrepayment,
							},
							{
								name: "Заказов",
								nameEng: "invoices",
								main: invoicesData,
								managers: managerInvoicesData,
								visible: filterData?.visableSetting.blockBills,
							},
							{
								name: "Продаж",
								nameEng: "salesNewClient",
								main: salesNewClientData,
								managers: managerSalesNewClientData,
								visible: filterData?.visableSetting.blockSales,
							},
							{
								name: "Продаж без рассылки",
								nameEng: "salesNewClientNM",
								main: salesNewClientNMData,
								managers: salesMNewClientNMData,
								visible: filterData?.visableSetting.blockSalesWithoutSales,
							},
							{
								name: "Продаж c рассылки",
								nameEng: "salesNewClientM",
								main: salesNewClientMData,
								managers: salesMNewClientMData,
								visible: filterData?.visableSetting.blockSalesWithSales,
							},
							{
								name: "Отказов",
								nameEng: "rejectsRow",
								main: rejectsRowData,
								managers: mRejectsRowData,
								visible: filterData?.visableSetting.blockSurcharges,
							},
							{
								name: "Новых клиентов по ДО",
								nameEng: "newClientsDo",
								main: newClientsDoData,
								managers: newMClientsDoData,
								visible: filterData?.visableSetting.blockClientsDO,
							},
							{
								name: "Новых клиентов с трафика за период",
								nameEng: "newClientsTraffic",
								main: newClientsTrafficData,
								managers: newMClientsTrafficData,
								visible: filterData?.visableSetting.blockClientsTraffic,
							},
							{
								name: "Дотекло клиентов по ДО",
								nameEng: "newClientsAll",
								main: newClientsAllData,
								managers: newMClientsAllData,
								visible: filterData?.visableSetting.blockSalesDo,
							},
							{
								name: "Дотекло клиентов по ДО (без рассылки)",
								nameEng: "newClientsWithoutMailing",
								main: newClientsWithoutMailingData,
								managers: newMClientsWithoutMailingData,
								visible: filterData?.visableSetting.blockSalesDoWithoutMailing,
							},
							{
								name: "Дотекло клиентов по ДО (по рассылке)",
								nameEng: "newClientsWithMailing",
								main: newClientsWithMailingData,
								managers: newMClientsWithMailingData,
								visible: filterData?.visableSetting.blockSalesDoWithMailing,
							},
							{
								name: "Средний чек",
								nameEng: "averageCheckTraffic",
								main: averageCheckTrafficData,
								managers: managerAverageCheckTrafficData,
								units: "₽",
								visible: filterData?.visableSetting.blockAverage,
							},
							{
								name: "Стоимость 1000 показов",
								nameEng: "showPrice",
								main: showPriceData,
								managers: mShowPriceData,
								units: "₽",
								visible: filterData?.visableSetting.blockPriceShows,
							},
							{
								name: "Стоимость клика",
								nameEng: "clickPrice",
								main: clickPriceData,
								managers: mClickPriceData,
								units: "₽",
								visible: filterData?.visableSetting.blockPriceClick,
							},
							{
								name: "Стоимость заявки",
								nameEng: "applicationPrice",
								main: applicationPriceData,
								managers: mApplicationPriceData,
								units: "₽",
								visible: filterData?.visableSetting.blockPriceApplication,
							},
							{
								name: "Стоимость целевой заявки",
								nameEng: "importantPriceRow",
								main: importantPriceRowData,
								managers: mImportantPriceRowData,
								units: "₽",
								visible: filterData?.visableSetting.blockAverageSurcharge,
							},
							{
								name: "Стоимость заказа",
								nameEng: "invoicePrice",
								main: invoicePriceData,
								managers: mInvoicePriceData,
								units: "₽",
								visible: filterData?.visableSetting.blockPriceBill,
							},
							{
								name: "Стоимость клиента",
								nameEng: "clientPrice",
								main: clientPriceData,
								managers: mClientPriceData,
								units: "₽",
								visible: filterData?.visableSetting.blockClient,
							},
							{
								name: "Стоимость клиента по ДО",
								nameEng: "clientPriceDo",
								main: clientPriceDoData,
								managers: mClientPriceDoData,
								units: "₽",
								visible: filterData?.visableSetting.blockClientDO,
							},
							{
								name: "CV из показа в клик",
								nameEng: "showToClick",
								main: showToClickData,
								managers: mShowToClickData,
								units: "%",
								visible: filterData?.visableSetting.blockShowToClick,
							},
							{
								name: "CV1 из клика в заявку",
								nameEng: "clickToApplication",
								main: clickToApplicationData,
								managers: mClickToApplicationData,
								units: "%",
								visible: filterData?.visableSetting.blockClickToApplication,
							},
							{
								name: "CV2 из заявки в заказ",
								nameEng: "applicationToInvoice",
								main: applicationToInvoiceData,
								managers: mApplicationToInvoiceData,
								units: "%",
								visible: filterData?.visableSetting.blockApplicationToBill,
							},
							{
								name: "CV3 из заказа в оплату",
								nameEng: "invoiceToClient",
								main: invoiceToClientData,
								managers: mInvoiceToClientData,
								units: "%",
								visible: filterData?.visableSetting.blockBillToClient,
							},
							{
								name: "CV4 из заявки в оплату",
								nameEng: "applicationToClient",
								main: applicationToClientData,
								managers: mApplicationToClientData,
								units: "%",
								visible: filterData?.visableSetting.blockApplicationToClient,
							},
							{
								name: "CV4 из заявки в оплату по ДО",
								nameEng: "clickToApplicationDo",
								main: clickToApplicationDoData,
								managers: mClickToApplicationDoData,
								units: "%",
								visible: filterData?.visableSetting.blockPrepaymentProceed,
							},
							{
								name: "CV из целевой заявки в оплату по ДО",
								nameEng: "CV5Row",
								main: CV5RowData,
								managers: mCV5RowData,
								units: "%",
								visible: filterData?.visableSetting.blockApplicationToClientDO,
							},
						],
					},
					{
						tabs: "База",
						items: [
							{
								name: "Выручка",
								nameEng: "totalRevenue",
								main: totalRevenueData,
								managers: managerTotalRevenueData,
								units: "₽",
							},
							{
								name: "Количество прописанных людей",
								nameEng: "prescribed",
								main: prescribedData,
								managers: managerPrescribedData,
							},
							{
								name: "Отказов",
								nameEng: "rejectsRow",
								main: rejectsRowData,
								managers: mRejectsRowData,
							},
							{
								name: "Средний чек",
								nameEng: "average",
								main: averageData,
								managers: managerAverageData,
								units: "₽",
							},
							{
								name: "CV из прописанных людей в продажи",
								nameEng: "prescribedToSale",
								main: prescribedToSaleData,
								managers: managerPrescribedToSaleData,
								units: "%",
							},
						],
					},
				],
				colors: {
					kpdColor: kpdColorData,
					ratingColor: ratingColorData,
				},
				currentIndex: null,
			},
			searchRow: null,
			headerProps: {
				title: "Аналитика",
				settings: null,
				tabs: [
					{
						name: "Общая",
						settings: true,
						link: "/funnel/",
						nameClass: "analytic",
					},
					{
						name: "Трафик",
						settings: true,
						link: "/funnel/traffic/",
						nameClass: "analytic",
					},
					{
						name: "База",
						settings: false,
						link: "/funnel/additional/",
						nameClass: "analytic",
					},
				],
				color: true,
				border: false,
			},
			selectsArray: [],
			funnelColors: {
				size: "small",
				hasApply: true,
				applyText: "Применить изменения",
				apply() {},
				title: "Настройки воронки",
				hasCancel: false,
				cancel() {},
				cancelText: "",
				nested: false,
				hasSideEffect: false,
			},
			funnelTrafficSettings: {
				size: "small",
				hasApply: true,
				applyText: "Применить изменения",
				apply() {},
				title: "Настройки воронки",
				hasCancel: false,
				cancel() {},
				cancelText: "",
				nested: false,
				hasSideEffect: false,
			},
			audienceList: {
				size: "large",
				hasApply: false,
				applyText: "",
				apply() {},
				title: "Список аудиторий",
				hasCancel: false,
				cancel() {},
				cancelText: "",
				nested: true,
				hasSideEffect: true,
			},
		};
	},
});
