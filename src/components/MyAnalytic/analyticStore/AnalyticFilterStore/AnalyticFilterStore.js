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

    return {
      dealType: filter.dealType,
      filterProps: {
        filter: filter || null,
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
            selected: filter.idSort,
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
                selected: filter.idManager,
                options() {
                  return [
                    {
                      name: "Все Менеджеры",
                      value: 0,
                      title: null,
                    },
                    ...managersFilter.map((el) => {
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
                selected: filter.project,
                options() {
                  return [
                    {
                      name: "Все проекты",
                      value: 0,
                    },
                    ...projects.map((project) => {
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
                selected: filter.course,
                options() {
                  return [
                    {
                      name: "Все продукты",
                      value: "all",
                    },
                    ...courses.map((el) => {
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
                selected: filter.dealType,
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
                selected: filter.isNotDismiss,
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
                selected: filter.idFunnel,
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
                selected: filter.idFunnel,
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
                selected: filter.idUser,
                options() {
                  return [
                    {
                      name: "Все кабинеты",
                      value: 0,
                      title: null,
                    },
                    ...advertisers.map((el) => {
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
                selected: filter.platform,
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
                    ...platforms.map((el) => {
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
                selected: filter.channel,
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
                    ...channels.map((el) => {
                      return {
                        name: el,
                        value: el,
                        title: el,
                      };
                    }),
                  ];

                  return filter.channel === "unknown" ? unknownOptions : options;
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
                value: filter.communites,
                pages: ["/funnel/traffic/"],
              },
            ],
            pages: ["/funnel/traffic/"],
          },
        ],
      },
      analyticData: {
        managers: managers || null,
        rows: [
          {
            page: "/funnel/",
            items: [
              {
                name: "Выручка общая",
                main: totalRevenue || null,
                managers: managerTotalRevenue
                  ? Object.entries(managerTotalRevenue).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "Выручка с трафика",
                main: trafficRevenue || null,
                managers: managerTrafficRevenue
                  ? Object.entries(managerTrafficRevenue).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "Выручка с базы",
                main: additionalRevenue || null,
                managers: managerAdditionalRevenue
                  ? Object.entries(managerAdditionalRevenue).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "Расходы на рекламу",
                main: advExpenses || null,
                managers: managerAdvExpenses
                  ? Object.entries(managerAdvExpenses).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "КПД",
                main: kpd || null,
                managers: managerKpd
                  ? Object.entries(managerKpd).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи всего",
                main: sales || null,
                managers: managerSales
                  ? Object.entries(managerSales).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи трафик",
                main: salesTraffic || null,
                managers: managerSalesTraffic
                  ? Object.entries(managerSalesTraffic).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи рассылка",
                main: salesMailing || null,
                managers: managerSalesMailing
                  ? Object.entries(managerSalesMailing).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Продажи база",
                main: salesAdditional || null,
                managers: managerSalesAdditional
                  ? Object.entries(managerSalesAdditional).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Отказов",
                main: rejectsRow || null,
                managers: mRejectsRow
                  ? Object.entries(mRejectsRow).map((item) => {
                      return item[1];
                    })
                  : null,
              },
              {
                name: "Средний чек",
                main: average || null,
                managers: managerAverage
                  ? Object.entries(managerAverage).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "Средний чек трафик",
                main: averageTrafficMailing || null,
                managers: managerAverageTrafficMailing
                  ? Object.entries(managerAverageTrafficMailing).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "Средний чек база",
                main: averageAdditional || null,
                managers: managerAverageAdditional
                  ? Object.entries(managerAverageAdditional).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "Выручка общая - расходы на рекламу",
                main: profit || null,
                managers: managerProfit
                  ? Object.entries(managerProfit).map((item) => {
                      return item[1];
                    })
                  : null,
                units: "₽",
              },
              {
                name: "Рейтинг",
                main: rating || null,
                managers: managerRating
                  ? Object.entries(managerRating).map((item) => {
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
                main: totalRevenue || null,
                managers: managerTotalRevenue || null,
                units: "₽",
                visible: filter.visableSetting.blockProceed,
              },
              {
                name: "Расходы на рекламу",
                main: advExpenses || null,
                managers: managerAdvExpenses || null,
                units: "₽",
                visible: filter.visableSetting.blockAdvertisingExpenses,
              },
              {
                name: "Выручка общая - расходы на рекламу",
                main: profit || null,
                managers: managerProfit || null,
                units: "₽",
                visible: filter.visableSetting.blockProceedAdvertisingExpenses,
              },
              {
                name: "% ДРР (доля рекламных расходов)",
                main: shareAdvExpensesTrafficPage || null,
                managers: managerShareAdvExpensesTrafficPage || null,
                units: "%",
                visible: filter.visableSetting.blockPercentNetProceed,
              },
              {
                name: "КПД",
                main: kpd || null,
                managers: managerKpd || null,
                visible: filter.visableSetting.blockKPD,
              },
              {
                name: "Показов",
                main: advShow || null,
                managers: managerAdvShow || null,
                visible: filter.visableSetting.blockShows,
              },
              {
                name: "Кликов",
                main: advClick || null,
                managers: managerAdvClick || null,
                visible: filter.visableSetting.blockClicks,
              },
              {
                name: "Заявок",
                main: advApplication || null,
                managers: managerAdvApplication || null,
                visible: filter.visableSetting.blockApplications,
              },
              {
                name: "Целевых заявок",
                main: importantRow || null,
                managers: managerImportantRow || null,
                visible: filter.visableSetting.blockAveragePrepayment,
              },
              {
                name: "Заказов",
                main: invoices || null,
                managers: managerInvoices || null,
                visible: filter.visableSetting.blockBills,
              },
              {
                name: "Продаж",
                main: salesNewClient || null,
                managers: managerSalesNewClient || null,
                visible: filter.visableSetting.blockSales,
              },
              {
                name: "Продаж без рассылки",
                main: salesNewClientNM || null,
                managers: salesMNewClientNM || null,
                visible: filter.visableSetting.blockSalesWithoutSales,
              },
              {
                name: "Продаж c рассылки",
                main: salesNewClientM || null,
                managers: salesMNewClientM || null,
                visible: filter.visableSetting.blockSalesWithSales,
              },
              {
                name: "Отказов",
                main: rejectsRow || null,
                managers: mRejectsRow || null,
                visible: filter.visableSetting.blockSurcharges,
              },
              {
                name: "Новых клиентов по ДО",
                main: newClientsDo || null,
                managers: newMClientsDo || null,
                visible: filter.visableSetting.blockClientsDO,
              },
              {
                name: "Новых клиентов с трафика за период",
                main: newClientsTraffic || null,
                managers: newMClientsTraffic || null,
                visible: filter.visableSetting.blockClientsTraffic,
              },
              {
                name: "Дотекло клиентов по ДО",
                main: newClientsAll || null,
                managers: newMClientsAll || null,
                visible: filter.visableSetting.blockSalesDo,
              },
              {
                name: "Дотекло клиентов по ДО (без рассылки)",
                main: newClientsWithoutMailing || null,
                managers: newMClientsWithoutMailing || null,
                visible: filter.visableSetting.blockSalesDoWithoutMailing,
              },
              {
                name: "Дотекло клиентов по ДО (по рассылке)",
                main: newClientsWithMailing || null,
                managers: newMClientsWithMailing || null,
                visible: filter.visableSetting.blockSalesDoWithMailing,
              },
              {
                name: "Средний чек",
                main: averageCheckTraffic || null,
                managers: managerAverageCheckTraffic || null,
                units: "₽",
                visible: filter.visableSetting.blockAverage,
              },
              {
                name: "Стоимость 1000 показов",
                main: showPrice || null,
                managers: mShowPrice || null,
                units: "₽",
                visible: filter.visableSetting.blockPriceShows,
              },
              {
                name: "Стоимость клика",
                main: clickPrice || null,
                managers: mClickPrice || null,
                units: "₽",
                visible: filter.visableSetting.blockPriceClick,
              },
              {
                name: "Стоимость заявки",
                main: applicationPrice || null,
                managers: mApplicationPrice || null,
                units: "₽",
                visible: filter.visableSetting.blockPriceApplication,
              },
              {
                name: "Стоимость целевой заявки",
                main: importantPriceRow || null,
                managers: mImportantPriceRow || null,
                units: "₽",
                visible: filter.visableSetting.blockAverageSurcharge,
              },
              {
                name: "Стоимость заказа",
                main: invoicePrice || null,
                managers: mInvoicePrice || null,
                units: "₽",
                visible: filter.visableSetting.blockPriceBill,
              },
              {
                name: "Стоимость клиента",
                main: clientPrice || null,
                managers: mClientPrice || null,
                units: "₽",
                visible: filter.visableSetting.blockClient,
              },
              {
                name: "Стоимость клиента по ДО",
                main: clientPriceDo || null,
                managers: mClientPriceDo || null,
                units: "₽",
                visible: filter.visableSetting.blockClientDO,
              },
              {
                name: "CV из показа в клик",
                main: showToClick || null,
                managers: mShowToClick || null,
                units: "%",
                visible: filter.visableSetting.blockShowToClick,
              },
              {
                name: "CV1 из клика в заявку",
                main: clickToApplication || null,
                managers: mClickToApplication || null,
                units: "%",
                visible: filter.visableSetting.blockClickToApplication,
              },
              {
                name: "CV2 из заявки в заказ",
                main: applicationToInvoice || null,
                managers: mApplicationToInvoice || null,
                units: "%",
                visible: filter.visableSetting.blockApplicationToBill,
              },
              {
                name: "CV3 из заказа в оплату",
                main: invoiceToClient || null,
                managers: mInvoiceToClient || null,
                units: "%",
                visible: filter.visableSetting.blockBillToClient,
              },
              {
                name: "CV4 из заявки в оплату",
                main: applicationToClient || null,
                managers: mApplicationToClient || null,
                units: "%",
                visible: filter.visableSetting.blockApplicationToClient,
              },
              {
                name: "CV4 из заявки в оплату по ДО",
                main: clickToApplicationDo || null,
                managers: mClickToApplicationDo || null,
                units: "%",
                visible: filter.visableSetting.blockPrepaymentProceed,
              },
              {
                name: "CV из целевой заявки в оплату по ДО",
                main: CV5Row || null,
                managers: mCV5Row || null,
                units: "%",
                visible: filter.visableSetting.blockApplicationToClientDO,
              },
            ],
          },
          {
            page: "/funnel/additional",
            items: [
              {
                name: "Выручка",
                main: totalRevenue || null,
                managers: managerTotalRevenue || null,
                units: "₽",
              },
              {
                name: "Количество прописанных людей",
                main: prescribed || null,
                managers: managerPrescribed || null,
              },
              {
                name: "Отказов",
                main: rejectsRow || null,
                managers: mRejectsRow || null,
              },
              {
                name: "Средний чек",
                main: average || null,
                managers: managerAverage || null,
                units: "₽",
              },
              {
                name: "CV из прописанных людей в продажи",
                main: prescribedToSale || null,
                managers: managerPrescribedToSale || null,
                units: "%",
              },
            ],
          },
        ],
        colors: {
          kpdColor: kpdColor || null,
          ratingColor: ratingColor || null,
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
          item.main.sums = hasSum.main.sums.map((el) => null);
          item.managers = hasSum.managers.map((el) => {
            return {
              sum: 0,
              sums: hasSum.main.sums.map((el) => null),
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
    getCommunities() {
      return this.communites;
    }
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
    setCommunities(communites) {
      this.communites = communites;
    }
  },
});
