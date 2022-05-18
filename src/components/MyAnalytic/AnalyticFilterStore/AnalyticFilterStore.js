import { defineStore } from "pinia";
import { dealAPI } from "@/api/api.js";
import { tsImportEqualsDeclaration } from "@babel/types";

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
        title: "Фильтровать аналитику",
        filterPeriod: {
          select: {
            nameEng: "idSort",
            selected: filter.idSort,
            options: [
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
            ],
            selectedName() {
              return this.options.find((el) => el.value === this.selected)?.name || null;
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
                name: "Менеджеры",
                nameEng: [
                  {
                    name: "idManager",
                    pages: ["/funnel/"],
                  },
                ],
                selected: filter.idManager,
                options: [
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
                ],
                selectedName() {
                  return this.options.find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/"],
              },
              {
                type: "select",
                name: "Проекты",
                nameEng: [
                  {
                    pages: ["/monitor/", "/monitor-control"],
                    name: "projectId",
                  },
                  {
                    pages: ["/funnel/"],
                    name: "project",
                  },
                ],
                selected: filter.project,
                options: [
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
                ],
                selectedName() {
                  return this.options.find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/monitor/", "/monitor-control/"],
              },
              {
                type: "select",
                name: "Продукты",
                nameEng: [
                  {
                    pages: ["/funnel/"],
                    name: "course",
                  },
                ],
                selected: filter.course,
                options: [
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
                ],
                selectedName() {
                  return this.options.find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/"],
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
                options: [
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
                ],
                selectedName() {
                  return this.options.find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/"],
              },
              {
                type: "select",
                name: "Сотрудники",
                nameEng: [
                  {
                    pages: ["/funnel/"],
                    name: "isNotDismiss",
                  },
                ],
                selected: filter.isNotDismiss,
                options: [
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
                ],
                selectedName() {
                  return this.options.find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/"],
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
                options: [
                  {
                    name: "Все воронки",
                    value: 0,
                  },
                ],
                selectedName() {
                  return (
                    this.options.find((el) => el.value === this.selected)?.name || "Все воронки"
                  );
                },
                pages: ["/funnel/"],
              },
            ],
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
              },
              {
                name: "Расходы на рекламу",
                main: advExpenses || null,
                managers: managerAdvExpenses || null,
                units: "₽",
              },
              {
                name: "Выручка общая - расходы на рекламу",
                main: profit || null,
                managers: managerProfit || null,
                units: "₽",
              },
              {
                name: "% ДРР (доля рекламных расходов)",
                main: shareAdvExpensesTrafficPage || null,
                managers: managerShareAdvExpensesTrafficPage || null,
                units: "%",
              },
              {
                name: "КПД",
                main: kpd || null,
                managers: managerKpd || null,
              },
              {
                name: "Показов",
                main: advShow || null,
                managers: managerAdvShow || null,
              },
              {
                name: "Кликов",
                main: advClick || null,
                managers: managerAdvClick || null,
              },
              {
                name: "Заявок",
                main: advApplication || null,
                managers: managerAdvApplication || null,
              },
              {
                name: "Целевых заявок",
                main: importantRow || null,
                managers: managerImportantRow || null,
              },
              {
                name: "Заказов",
                main: invoices || null,
                managers: managerInvoices || null,
              },
              {
                name: "Продаж",
                main: salesNewClient || null,
                managers: managerSalesNewClient || null,
              },
              {
                name: "Продаж без рассылки",
                main: salesNewClientNM || null,
                managers: salesMNewClientNM || null,
              },
              {
                name: "Продаж c рассылки",
                main: salesNewClientM || null,
                managers: salesMNewClientM || null,
              },
              {
                name: "Отказов",
                main: rejectsRow || null,
                managers: mRejectsRow || null,
              },
              {
                name: "Новых клиентов по ДО",
                main: newClientsDo || null,
                managers: newMClientsDo || null,
              },
              {
                name: "Новых клиентов с трафика за период",
                main: newClientsTraffic || null,
                managers: newMClientsTraffic || null,
              },
              {
                name: "Дотекло клиентов по ДО",
                main: newClientsAll || null,
                managers: newMClientsAll || null,
              },
              {
                name: "Дотекло клиентов по ДО (без рассылки)",
                main: newClientsWithoutMailing || null,
                managers: newMClientsWithoutMailing || null,
              },
              {
                name: "Дотекло клиентов по ДО (по рассылке)",
                main: newClientsWithMailing || null,
                managers: newMClientsWithMailing || null,
              },
              {
                name: "Средний чек",
                main: averageCheckTraffic || null,
                managers: managerAverageCheckTraffic || null,
                units: "₽",
              },
              {
                name: "Стоимость 1000 показов",
                main: showPrice || null,
                managers: mShowPrice || null,
                units: "₽",
              },
              {
                name: "Стоимость клика",
                main: clickPrice || null,
                managers: mClickPrice || null,
                units: "₽",
              },
              {
                name: "Стоимость заявки",
                main: applicationPrice || null,
                managers: mApplicationPrice || null,
                units: "₽",
              },
              {
                name: "Стоимость целевой заявки",
                main: importantPriceRow || null,
                managers: mImportantPriceRow || null,
                units: "₽",
              },
              {
                name: "Стоимость заказа",
                main: invoicePrice || null,
                managers: mInvoicePrice || null,
                units: "₽",
              },
              {
                name: "Стоимость клиента",
                main: clientPrice || null,
                managers: mClientPrice || null,
                units: "₽",
              },
              {
                name: "Стоимость клиента по ДО",
                main: clientPriceDo || null,
                managers: mClientPriceDo || null,
                units: "₽",
              },
              {
                name: "CV из показа в клик",
                main: showToClick || null,
                managers: mShowToClick || null,
                units: "%",
              },
              {
                name: "CV1 из клика в заявку",
                main: clickToApplication || null,
                managers: mClickToApplication || null,
                units: "%",
              },
              {
                name: "CV2 из заявки в заказ",
                main: applicationToInvoice || null,
                managers: mApplicationToInvoice || null,
                units: "%",
              },
              {
                name: "CV3 из заказа в оплату",
                main: invoiceToClient || null,
                managers: mInvoiceToClient || null,
                units: "%",
              },
              {
                name: "CV4 из заявки в оплату",
                main: applicationToClient || null,
                managers: mApplicationToClient || null,
                units: "%",
              },
              {
                name: "CV4 из заявки в оплату по ДО",
                main: clickToApplicationDo || null,
                managers: mClickToApplicationDo || null,
                units: "%",
              },
              {
                name: "CV из целевой заявки в оплату по ДО",
                main: CV5Row || null,
                managers: mCV5Row || null,
                units: "%",
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
        this.filterProps.columns = [
          ...this.filterProps.columns.map((item) => {
            item.items = [
              ...item.items.map((el) => {
                if (el.name === "Воронка") {
                  el.options.length = 1;

                  currentFunnels[1].forEach((elem) =>
                    el.options.push({ name: elem.funnelName, value: elem.idFunnel })
                  );

                  if (el.selectedName() === "Все воронки") {
                    el.selected = 0;
                  }
                }

                return el;
              }),
            ];

            return item;
          }),
        ];
      } else {
        this.filterProps.columns = [
          ...this.filterProps.columns.map((item) => {
            item.items = [
              ...item.items.map((el) => {
                if (el.name === "Воронка") {
                  el.options.length = 1;
                  el.selected = 0;
                }

                return el;
              }),
            ];

            return item;
          }),
        ];
      }

      return this.filterProps;
    },
    getSortedFilterItems() {
      this.filterProps.columns.forEach((item) => {
        item.items = [...item.items.filter((el) => el.pages.includes(this.currentPage))];
      });
    },
    getFilterPropsAfterChange() {
      return this.filterProps;
    },
    getCurrentRows() {
      return this.analyticData.rows.filter((el) => el.page === this.currentPage);
    },
    getPeriodProps() {
      if (periodSeparate === 0) {
        return this.getMonthsNames();
      } else if (periodSeparate === 1) {
        return this.getWeeksNames();
      } else if (periodSeparate === 2) {
      }
    },
    getMonthsNames() {
      const { start, periodSeparate, getCurrentRows } = this;
      let { months } = this.filterProps.filterPeriod;

      const periodLength = getCurrentRows[0].items[0].main.sums.length;

      if (periodSeparate === 0) {
        const startMonthIndex = +start.split(".")[1] - 1;

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
    getWeeksNames() {},
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
  },
});
