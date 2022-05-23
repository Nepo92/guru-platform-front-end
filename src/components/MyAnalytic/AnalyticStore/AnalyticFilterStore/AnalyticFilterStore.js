import { defineStore } from "pinia";
import { dealAPI } from "@/api/api.js";
import DateUtils from "@/utils/DateUtils/DateUtils.js";

const dateUtils = new DateUtils();

export const analyticFilterStore = defineStore("analyticFilter", {
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
      dealType: filterData.dealType,
      filterProps: {
        filter: filterData || null,
        title: [
          {
            title: "Фильтровать аналитику",
            pages: ["/funnel/"],
          },
          {
            title: "Фильтровать воронку",
            pages: ["/funnel/traffic/", "/funnel/additional/"],
          },
        ],
        filterPeriod: {
          select: {
            nameEng: "idSort",
            selected: filterData?.idSort,
            options() {
              return [
                {
                  name: "По месяцам",
                  value: 0,
                },
                {
                  name: "По неделям",
                  value: 1,
                },
                {
                  name: "По дням",
                  value: 2,
                },
              ];
            },
            selectedName() {
              return this.options().find((el) => el.value === this.selected)?.name || null;
            },
          },
          datepickerMonth: [],
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
        },
        columns: [
          {
            name: "Параметры",
            items: [
              {
                type: "select",
                name: "Менеджер",
                nameEng: [
                  {
                    name: "idManager",
                    pages: ["/funnel/", "/funnel/traffic/"],
                  },
                ],
                selected: filterData?.idManager,
                options() {
                  return [
                    {
                      name: "Все Менеджеры",
                      value: 0,
                      title: null,
                    },
                    ...managersFilterData.map((el) => {
                      return {
                        name: el.name,
                        value: el.id,
                        title: el.name,
                      };
                    }),
                  ];
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/", "/funnel/traffic/"],
              },
              {
                type: "select",
                name: "Проект",
                nameEng: [
                  {
                    pages: ["/monitor/", "/monitor-control/"],
                    name: "projectId",
                  },
                  {
                    pages: ["/funnel/", "/funnel/traffic/"],
                    name: "project",
                  },
                ],
                selected: filterData?.project,
                options() {
                  return [
                    {
                      name: "Все проекты",
                      value: 0,
                    },
                    ...projectsData.map((project) => {
                      return {
                        name: project.name,
                        value: project.id,
                      };
                    }),
                  ];
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/monitor/", "/monitor-control/", "/funnel/", "/funnel/traffic/"],
              },
              {
                type: "select",
                name: "Продукт",
                nameEng: [
                  {
                    pages: ["/funnel/", "/funnel/traffic/"],
                    name: "course",
                  },
                ],
                selected: filterData?.course,
                options() {
                  return [
                    {
                      name: "Все продукты",
                      value: "all",
                    },
                    ...coursesData.map((el) => {
                      return {
                        name: el,
                        value: el,
                      };
                    }),
                  ];
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/", "/funnel/traffic/"],
              },
              {
                type: "select",
                name: "Тип сделки",
                nameEng: [
                  {
                    pages: ["/funnel/"],
                    name: "dealType",
                  },
                ],
                selected: filterData?.dealType,
                options() {
                  return [
                    {
                      name: "Все сделки",
                      value: null,
                    },
                    ...dealType.map((el) => {
                      return {
                        name: el.name,
                        value: el.value,
                      };
                    }),
                  ];
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/"],
              },
              {
                type: "select",
                name: "Сотрудники",
                nameEng: [
                  {
                    pages: ["/funnel/", "/funnel/traffic/"],
                    name: "isNotDismiss",
                  },
                ],
                selected: filterData?.isNotDismiss,
                options() {
                  return [
                    {
                      name: "Все сотрудники",
                      value: null,
                    },
                    ...employees.map((el) => {
                      return {
                        name: el ? "Работающие" : "Уволенные",
                        value: el,
                      };
                    }),
                  ];
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/", "/funnel/traffic/"],
              },
              {
                type: "select",
                name: "Воронка",
                nameEng: [
                  {
                    pages: ["/funnel/"],
                    name: "idFunnel",
                  },
                ],
                selected: filterData?.idFunnel,
                options() {
                  return [
                    {
                      name: "Все воронки",
                      value: 0,
                    },
                  ];
                },
                selectedName() {
                  return (
                    this.options().find((el) => el.value === this.selected)?.name || "Все воронки"
                  );
                },
                pages: ["/funnel/"],
              },
              {
                type: "select",
                name: "Цели",
                nameEng: [
                  {
                    pages: ["/funnel/", "/funnel/traffic/"],
                    name: "target",
                  },
                ],
                selected: filterData?.idFunnel,
                options() {
                  return [
                    {
                      name: "Все цели",
                      value: "all",
                    },
                    {
                      name: "Профиль",
                      value: "Подписка",
                    },
                    {
                      name: "Заявка",
                      value: "Посадочная",
                    },
                  ];
                },
                selectedName() {
                  return (
                    this.options().find((el) => el.value === this.selected)?.name || "Все воронки"
                  );
                },
                pages: ["/funnel/traffic/"],
              },
            ],
            pages: ["/funnel/", "/funnel/traffic/"],
          },
          {
            name: "Аудитории",
            items: [
              {
                type: "select",
                name: "Рекламный кабинет",
                nameEng: [
                  {
                    name: "idUser",
                    pages: ["/funnel/traffic/"],
                  },
                ],
                selected: filterData?.idUser,
                options() {
                  return [
                    {
                      name: "Все кабинеты",
                      value: 0,
                      title: null,
                    },
                    ...advertisersData.map((el) => {
                      return {
                        name: el.name,
                        value: el.id,
                        title: el.name,
                      };
                    }),
                  ];
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/traffic/"],
              },
              {
                type: "select",
                name: "Площадка",
                nameEng: [
                  {
                    name: "platform",
                    pages: ["/funnel/traffic/"],
                  },
                ],
                selected: filterData?.platform,
                options() {
                  return [
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
                    ...platformsData.map((el) => {
                      return {
                        name: el,
                        value: el,
                        title: el,
                      };
                    }),
                  ];
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/traffic/"],
              },
              {
                type: "select",
                name: "Источники трафика",
                nameEng: [
                  {
                    name: "channel",
                    pages: ["/funnel/traffic/"],
                  },
                ],
                selected: filterData?.channel,
                options() {
                  const unknownOptions = [
                    {
                      name: "Неизвестно",
                      value: "unknown",
                      title: "Неизвестно",
                    },
                  ];

                  const options = [
                    {
                      name: "Все источники",
                      value: "all",
                      title: "Все источники",
                    },
                    ...channelsData.map((el) => {
                      return {
                        name: el,
                        value: el,
                        title: el,
                      };
                    }),
                  ];

                  return filterData.channel === "unknown" ? unknownOptions : options;
                },
                selectedName() {
                  return this.options().find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/traffic/"],
              },
              {
                type: "input",
                name: "Аудитории",
                nameEng: [
                  {
                    name: "communites",
                    pages: ["/funnel/traffic/"],
                  },
                ],
                value: filterData?.communites,
                pages: ["/funnel/traffic/"],
              },
            ],
            pages: ["/funnel/traffic/"],
          },
        ],
      },
      analyticData: {
        managers: managersData,
        rows: [
          {
            page: "/funnel/",
            items: [
              {
                name: "Выручка общая",
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
                main: kpdData,
                managers: managerKpdData
                  ? Object.entries(managerKpdData).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи всего",
                main: salesData,
                managers: managerSalesData
                  ? Object.entries(managerSalesData).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи трафик",
                main: salesTrafficData,
                managers: managerSalesTrafficData
                  ? Object.entries(managerSalesTrafficData).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи рассылка",
                main: salesMailingData,
                managers: managerSalesMailingData
                  ? Object.entries(managerSalesMailingData).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи база",
                main: salesAdditionalData,
                managers: managerSalesAdditionalData
                  ? Object.entries(managerSalesAdditionalData).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Отказов",
                main: rejectsRowData,
                managers: mRejectsRowData
                  ? Object.entries(mRejectsRowData).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Средний чек",
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
            page: "/funnel/traffic/",
            items: [
              {
                name: "Выручка общая",
                main: totalRevenueData,
                managers: managerTotalRevenueData,
                units: "₽",
                visible: filterData?.visableSetting.blockProceed,
              },
              {
                name: "Расходы на рекламу",
                main: advExpensesData,
                managers: managerAdvExpensesData,
                units: "₽",
                visible: filterData?.visableSetting.blockAdvertisingExpenses,
              },
              {
                name: "Выручка общая - расходы на рекламу",
                main: profitData,
                managers: managerProfitData,
                units: "₽",
                visible: filterData?.visableSetting.blockProceedAdvertisingExpenses,
              },
              {
                name: "% ДРР (доля рекламных расходов)",
                main: shareAdvExpensesTrafficPageData,
                managers: managerShareAdvExpensesTrafficPageData,
                units: "%",
                visible: filterData?.visableSetting.blockPercentNetProceed,
              },
              {
                name: "КПД",
                main: kpdData,
                managers: managerKpdData,
                visible: filterData?.visableSetting.blockKPD,
              },
              {
                name: "Показов",
                main: advShowData,
                managers: managerAdvShowData,
                visible: filterData?.visableSetting.blockShows,
              },
              {
                name: "Кликов",
                main: advClickData,
                managers: managerAdvClickData,
                visible: filterData?.visableSetting.blockClicks,
              },
              {
                name: "Заявок",
                main: advApplicationData,
                managers: managerAdvApplicationData,
                visible: filterData?.visableSetting.blockApplications,
              },
              {
                name: "Целевых заявок",
                main: importantRowData,
                managers: managerImportantRowData,
                visible: filterData?.visableSetting.blockAveragePrepayment,
              },
              {
                name: "Заказов",
                main: invoicesData,
                managers: managerInvoicesData,
                visible: filterData?.visableSetting.blockBills,
              },
              {
                name: "Продаж",
                main: salesNewClientData,
                managers: managerSalesNewClientData,
                visible: filterData?.visableSetting.blockSales,
              },
              {
                name: "Продаж без рассылки",
                main: salesNewClientNMData,
                managers: salesMNewClientNMData,
                visible: filterData?.visableSetting.blockSalesWithoutSales,
              },
              {
                name: "Продаж c рассылки",
                main: salesNewClientMData,
                managers: salesMNewClientMData,
                visible: filterData?.visableSetting.blockSalesWithSales,
              },
              {
                name: "Отказов",
                main: rejectsRowData,
                managers: mRejectsRowData,
                visible: filterData?.visableSetting.blockSurcharges,
              },
              {
                name: "Новых клиентов по ДО",
                main: newClientsDoData,
                managers: newMClientsDoData,
                visible: filterData?.visableSetting.blockClientsDO,
              },
              {
                name: "Новых клиентов с трафика за период",
                main: newClientsTrafficData,
                managers: newMClientsTrafficData,
                visible: filterData?.visableSetting.blockClientsTraffic,
              },
              {
                name: "Дотекло клиентов по ДО",
                main: newClientsAllData,
                managers: newMClientsAllData,
                visible: filterData?.visableSetting.blockSalesDo,
              },
              {
                name: "Дотекло клиентов по ДО (без рассылки)",
                main: newClientsWithoutMailingData,
                managers: newMClientsWithoutMailingData,
                visible: filterData?.visableSetting.blockSalesDoWithoutMailing,
              },
              {
                name: "Дотекло клиентов по ДО (по рассылке)",
                main: newClientsWithMailingData,
                managers: newMClientsWithMailingData,
                visible: filterData?.visableSetting.blockSalesDoWithMailing,
              },
              {
                name: "Средний чек",
                main: averageCheckTrafficData,
                managers: managerAverageCheckTrafficData,
                units: "₽",
                visible: filterData?.visableSetting.blockAverage,
              },
              {
                name: "Стоимость 1000 показов",
                main: showPriceData,
                managers: mShowPriceData,
                units: "₽",
                visible: filterData?.visableSetting.blockPriceShows,
              },
              {
                name: "Стоимость клика",
                main: clickPriceData,
                managers: mClickPriceData,
                units: "₽",
                visible: filterData?.visableSetting.blockPriceClick,
              },
              {
                name: "Стоимость заявки",
                main: applicationPriceData,
                managers: mApplicationPriceData,
                units: "₽",
                visible: filterData?.visableSetting.blockPriceApplication,
              },
              {
                name: "Стоимость целевой заявки",
                main: importantPriceRowData,
                managers: mImportantPriceRowData,
                units: "₽",
                visible: filterData?.visableSetting.blockAverageSurcharge,
              },
              {
                name: "Стоимость заказа",
                main: invoicePriceData,
                managers: mInvoicePriceData,
                units: "₽",
                visible: filterData?.visableSetting.blockPriceBill,
              },
              {
                name: "Стоимость клиента",
                main: clientPriceData,
                managers: mClientPriceData,
                units: "₽",
                visible: filterData?.visableSetting.blockClient,
              },
              {
                name: "Стоимость клиента по ДО",
                main: clientPriceDoData,
                managers: mClientPriceDoData,
                units: "₽",
                visible: filterData?.visableSetting.blockClientDO,
              },
              {
                name: "CV из показа в клик",
                main: showToClickData,
                managers: mShowToClickData,
                units: "%",
                visible: filterData?.visableSetting.blockShowToClick,
              },
              {
                name: "CV1 из клика в заявку",
                main: clickToApplicationData,
                managers: mClickToApplicationData,
                units: "%",
                visible: filterData?.visableSetting.blockClickToApplication,
              },
              {
                name: "CV2 из заявки в заказ",
                main: applicationToInvoiceData,
                managers: mApplicationToInvoiceData,
                units: "%",
                visible: filterData?.visableSetting.blockApplicationToBill,
              },
              {
                name: "CV3 из заказа в оплату",
                main: invoiceToClientData,
                managers: mInvoiceToClientData,
                units: "%",
                visible: filterData?.visableSetting.blockBillToClient,
              },
              {
                name: "CV4 из заявки в оплату",
                main: applicationToClientData,
                managers: mApplicationToClientData,
                units: "%",
                visible: filterData?.visableSetting.blockApplicationToClient,
              },
              {
                name: "CV4 из заявки в оплату по ДО",
                main: clickToApplicationDoData,
                managers: mClickToApplicationDoData,
                units: "%",
                visible: filterData?.visableSetting.blockPrepaymentProceed,
              },
              {
                name: "CV из целевой заявки в оплату по ДО",
                main: CV5RowData,
                managers: mCV5RowData,
                units: "%",
                visible: filterData?.visableSetting.blockApplicationToClientDO,
              },
            ],
          },
          {
            page: "/funnel/additional",
            items: [
              {
                name: "Выручка",
                main: totalRevenueData,
                managers: managerTotalRevenueData,
                units: "₽",
              },
              {
                name: "Количество прописанных людей",
                main: prescribedData,
                managers: managerPrescribedData,
              },
              {
                name: "Отказов",
                main: rejectsRowData,
                managers: mRejectsRowData,
              },
              {
                name: "Средний чек",
                main: averageData,
                managers: managerAverageData,
                units: "₽",
              },
              {
                name: "CV из прописанных людей в продажи",
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
      selectProps: {
        selectsOnPage: [],
      },
    };
  },
  getters: {
    getCurrentFunnels() {
      const entriesFunnels = Object.entries(this.funnels);

      const { dealType } = this.filterProps.filter;

      const currentFunnels = entriesFunnels.find((el) => {
        if (el[0] === dealType) {
          return el;
        }
      });

      if (currentFunnels) {
        this.filterProps.columns.forEach((item) => {
          item.items = [
            ...item.items.map((el) => {
              if (el.name === "Воронка") {
                const optionsArray = el.options();

                optionsArray.length = 1;

                currentFunnels[1].forEach((elem) =>
                  optionsArray.push({ name: elem.funnelName, value: elem.idFunnel })
                );

                el.options = () => optionsArray;

                if (el.selectedName() === "Все воронки") {
                  el.selected = 0;
                }
              }

              return el;
            }),
          ];
        });
      } else {
        this.filterProps.columns.forEach((item) => {
          item.items = [
            ...item.items.map((el) => {
              if (el.name === "Воронка") {
                el.options().length = 1;
                el.selected = 0;
              }

              return el;
            }),
          ];
        });
      }

      return this.filterProps;
    },
    getSortedFilterItems() {
      this.filterProps.columns.forEach((item) => {
        item.items = [...item.items.filter((el) => el.pages.includes(this.currentPage))];
      });
    },
    getFilterPropsAfterChange() {
      this.filterProps.title = this.filterProps.title.find((el) =>
        el.pages.includes(this.currentPage)
      )?.title;

      return this.filterProps;
    },
    getCurrentRows() {
      const current = this.analyticData.rows.find((el) => el.page === this.currentPage)?.items;

      const currentVisible = current.filter((el) => el.visible && el.visible !== undefined);

      const currentData = currentVisible.length
        ? currentVisible
        : current.filter((el) => el.visible === undefined);

      const search = this.searchRow
        ? current.filter((el) =>
            el.name.toLowerCase().trim().includes(this.searchRow.toLowerCase().trim())
          )
        : false;

      return search || currentData;
    },
    getRows() {
      const { getCurrentRows } = this;

      const hasSum = getCurrentRows.find((el) => el.main?.sums.length);

      getCurrentRows.forEach((item) => {
        if (!item.main) {
          item.main = {};
          item.main.sums = hasSum.main.sums.map(() => null);
          item.managers = hasSum.managers.map(() => {
            return {
              sum: 0,
              sums: hasSum.main.sums.map(() => null),
            };
          });
        }
      });

      getCurrentRows.map((item) => {
        if (item.name === "КПД") {
          item.colors = this.analyticData.colors.kpdColor;
        }

        if (item.name === "Рейтинг") {
          item.colors = this.analyticData.colors.ratingColor;
        }

        return item;
      });

      return getCurrentRows;
    },
    getPeriodProps() {
      const { periodSeparate } = this;

      if (periodSeparate === 0) {
        return this.getMonthsNames;
      } else if (periodSeparate === 1) {
        return this.getWeeksNames;
      } else if (periodSeparate === 2) {
        return this.getDaysNames;
      }
    },
    getMonthsNames() {
      const { start, periodSeparate, getCurrentRows } = this;
      let { months } = this.filterProps.filterPeriod;

      const periodLength = getCurrentRows.find((el) => el.main?.sums.length)?.main.sums.length;

      if (periodSeparate === 0) {
        const startMonthIndex = +dateUtils.formatDDMMYYYY(start).split(".")[1] - 1;

        if (periodLength > 12) {
          const period = Math.ceil(periodLength / 12) - 1;

          for (let index = 0; index < period; index++) {
            months.forEach((item) => months.push(item));
          }
        }

        const monthsNames = months
          .map((item, index) => {
            if (index >= startMonthIndex && index < periodLength) {
              return item;
            }
          })
          .filter((el) => el);

        return monthsNames;
      }
    },
    getWeeksNames() {
      const { start, getCurrentRows } = this;

      const periodLength = getCurrentRows.find((el) => el.main?.sums.length)?.main.sums.length;

      const numberDayOfWeek = new Date(start).getDay();

      const monday = numberDayOfWeek === 1;
      const sunday = numberDayOfWeek === 0;

      const between = monday
        ? 0
        : sunday
        ? 24 * 60 * 60 * 1000
        : (6 - numberDayOfWeek + 2) * 24 * 60 * 60 * 1000;

      const names = [];

      names.push(dateUtils.formatDDMMYYYY(start));
      names.push(dateUtils.formatDDMMYYYY(start + between));

      for (let index = 1; index < periodLength - 1; index++) {
        const week = 7 * index * 24 * 60 * 60 * 1000;
        names.push(dateUtils.formatDDMMYYYY(start + between + week));
      }

      return names;
    },
    getDaysNames() {
      const { start, getCurrentRows } = this;

      const periodLength = getCurrentRows.find((el) => el.main?.sums.length)?.main.sums.length;

      const names = [];
      names.push(dateUtils.formatDDMMYYYY(start));

      for (let index = 1; index < periodLength; index++) {
        names.push(dateUtils.formatDDMMYYYY(start + index * 24 * 60 * 60 * 1000));
      }

      return names;
    },
  },
  actions: {
    async fetchFunnels() {
      this.funnels = await dealAPI.getFunnels();
    },
    changeDealType(value) {
      this.filterProps.filter.dealType = value;
    },
    setPage(page) {
      this.currentPage = page;
    },
    changeSelectValue(selected) {
      this.filterProps.columns = [
        ...this.filterProps.columns.map((item) => {
          item.items = [
            ...item.items.map((el) => {
              if (el.name === selected.name) {
                el.selected = selected.selectedOption.value;
              }

              return el;
            }),
          ];

          return item;
        }),
      ];
    },
    changeSelectFilter(selected) {
      this.filterProps.filterPeriod.select.selected = selected.selectedOption.value;
    },
    setPeriodProps([start, end, periodSeparate]) {
      this.start = start;
      this.end = end;
      this.periodSeparate = periodSeparate;
    },
    setInitialValues(page) {
      this.currentPage = page;
    },
    setSearchValue(value) {
      this.searchRow = value;
    },
    setFilterPropsColumns() {
      this.filterProps.columns = [
        ...this.filterProps.columns.filter((el) => el.pages.includes(this.currentPage)),
      ];

      this.filterProps.columns.forEach((item) => {
        item.items = [...item.items.filter((el) => el.pages.includes(this.currentPage))];
      });
    },
    changePlatform(value) {
      this.filterProps.filter.platform = value;

      this.filterProps.columns.forEach((item) => {
        item.items = [
          ...item.items.map((el) => {
            if (el.name === "Источники трафика") {
              el.selected = value !== "unknown" ? "all" : "unknown";
            }
            return el;
          }),
        ];
      });
    },
    changeSourceTrafficValue(value) {
      this.filterProps.filter.channel = value;
    },
    setSourceTraffic(value) {
      this.filterProps.columns.forEach((item) => {
        item.items = [
          ...item.items.map((el) => {
            if (el.name === "Источники трафика") {
              if (el.selected === "unknown") {
                el.options = () => [{ name: "Неизвестно", value: "unknown", title: "Неизветно" }];
              } else {
                el.options = () => [
                  {
                    name: "Все источники",
                    value: "all",
                    title: "Все источники",
                  },
                  ...value.map((el) => {
                    return { name: el, value: el, title: el };
                  }),
                ];
              }
            }

            return el;
          }),
        ];
      });
    },
  },
});
