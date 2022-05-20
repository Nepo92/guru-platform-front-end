import { defineStore } from "pinia";

export const funnelTrafficStore = defineStore("funnelTrafficStore", {
  state() {
    return {
      filterProps: {
        filter: filter || null,
      },
      menu: [
        {
          type: "select",
          items: [
            {
              type: "select",
              name: "Тип",
              nameEng: "periodType",
              selected: filter.periodType,
              options: [
                {
                  name: "Сумма за период",
                  value: "s",
                },
                {
                  name: "Среднее за период",
                  value: "a",
                },
              ],
              selectedName() {
                return this.options.find((el) => el.value === this.selected)?.name || null;
              },
              pages: ["/funnel/traffic/"],
            },
          ],
        },
        {
          type: "collapse",
          items: [
            {
              name: "Выручка и расходы на рекламу",
              items: [
                {
                  name: "Выручка общая",
                  value: filter.visableSetting.blockProceed,
                  nameEng: "_visableSetting.blockProceed",
                },
                {
                  name: "Расходы на рекламу",
                  value: filter.visableSetting.blockAdvertisingExpenses,
                  nameEng: "_visableSetting.blockAdvertisingExpenses",
                },
                {
                  name: "Выручка общая - Расходы на рекламу",
                  value: filter.visableSetting.blockProceedAdvertisingExpenses,
                  nameEng: "visableSetting.blockProceedAdvertisingExpenses",
                },
                {
                  name: "% ДРР (доля рекламных расходов)",
                  value: filter.visableSetting.blockPercentNetProceed,
                  nameEng: "visableSetting.blockPercentNetProceed",
                },
                {
                  name: "КПД",
                  value: filter.visableSetting.blockKPD,
                  nameEng: "visableSetting.blockKPD",
                },
              ],
            },
            {
              name: "Показатели этапов воронки",
              items: [
                {
                  name: "Показов",
                  value: filter.visableSetting.blockShows,
                  nameEng: "visableSetting.blockShows",
                },
                {
                  name: "Кликов",
                  value: filter.visableSetting.blockClicks,
                  nameEng: "visableSetting.blockClicks",
                },
                {
                  name: "Заявок",
                  value: filter.visableSetting.blockApplications,
                  nameEng: "visableSetting.blockApplications",
                },
                {
                  name: "Целевых заявок",
                  value: filter.visableSetting.blockAveragePrepayment,
                  nameEng: "visableSetting.blockAveragePrepayment",
                },
                {
                  name: "Заказов",
                  value: filter.visableSetting.blockBills,
                  nameEng: "visableSetting.blockBills",
                },
                {
                  name: "Продаж",
                  value: filter.visableSetting.blockSales,
                  nameEng: "visableSetting.blockSales",
                },
                {
                  name: "Продаж без рассылки",
                  value: filter.visableSetting.blockSalesWithoutSales,
                  nameEng: "visableSetting.blockSalesWithoutSales",
                },
                {
                  name: "Продаж с рассылки",
                  value: filter.visableSetting.blockSalesWithSales,
                  nameEng: "visableSetting.blockSalesWithSales",
                },
                {
                  name: "Отказов",
                  value: filter.visableSetting.blockSurcharges,
                  nameEng: "visableSetting.blockSurcharges",
                },
              ],
            },
            {
              name: "Клиенты по дате обращения",
              items: [
                {
                  name: "Новых клиентов по ДО",
                  value: filter.visableSetting.blockClientsDO,
                  nameEng: "visableSetting.blockClientsDO",
                },
                {
                  name: "Новых клиентов с трафика за период",
                  value: filter.visableSetting.blockClientsTraffic,
                  nameEng: "visableSetting.blockClientsTraffic",
                },
                {
                  name: "Дотекло клиентов по ДО",
                  value: filter.visableSetting.blockSalesDo,
                  nameEng: "visableSetting.blockSalesDo",
                },
                {
                  name: "Дотекло клиентов по ДО (без рассылки)",
                  value: filter.visableSetting.blockSalesDoWithoutMailing,
                  nameEng: "visableSetting.blockSalesDoWithoutMailing",
                },
                {
                  name: "Дотекло клиентов по ДО (по рассылке)",
                  value: filter.visableSetting.blockSalesDoWithMailing,
                  nameEng: "visableSetting.blockSalesDoWithMailing",
                },
              ],
            },
            {
              name: "Средний чек",
              items: [
                {
                  name: "Средний чек",
                  value: filter.visableSetting.blockAverage,
                  nameEng: "visableSetting.blockAverage",
                },
                {
                  name: "Стоимость 1000 показов",
                  value: filter.visableSetting.blockPriceShows,
                  nameEng: "visableSetting.blockPriceShows",
                },
                {
                  name: "Стоимость клика",
                  value: filter.visableSetting.blockPriceClick,
                  nameEng: "visableSetting.blockPriceClick",
                },
                {
                  name: "Стоимость заявки",
                  value: filter.visableSetting.blockPriceApplication,
                  nameEng: "visableSetting.blockPriceApplication",
                },
                {
                  name: "Стоимость целевой заявки",
                  value: filter.visableSetting.blockAverageSurcharge,
                  nameEng: "visableSetting.blockAverageSurcharge",
                },
                {
                  name: "Стоимость заказа",
                  value: filter.visableSetting.blockPriceBill,
                  nameEng: "visableSetting.blockPriceBill",
                },
                {
                  name: "Стоимость клиента",
                  value: filter.visableSetting.blockClient,
                  nameEng: "visableSetting.blockClient",
                },
                {
                  name: "Стоимость клиента по ДО",
                  value: filter.visableSetting.blockClientDO,
                  nameEng: "visableSetting.blockClientDO",
                },
              ],
            },
            {
              name: "Конверсии воронки",
              items: [
                {
                  name: "CV из показа в клик",
                  value: filter.visableSetting.blockShowToClick,
                  nameEng: "visableSetting.blockShowToClick",
                },
                {
                  name: "CV1 из клика в заявку",
                  value: filter.visableSetting.blockClickToApplication,
                  nameEng: "visableSetting.blockClickToApplication",
                },
                {
                  name: "CV2 из заявки в заказ",
                  value: filter.visableSetting.blockApplicationToBill,
                  nameEng: "visableSetting.blockApplicationToBill",
                },
                {
                  name: "CV3 из заказа в оплату",
                  value: filter.visableSetting.blockBillToClient,
                  nameEng: "visableSetting.blockBillToClient",
                },
                {
                  name: "CV4 из заявки в оплату",
                  value: filter.visableSetting.blockApplicationToClient,
                  nameEng: "visableSetting.blockApplicationToClient",
                },
                {
                  name: "CV4 из заявки в оплату по ДО",
                  value: filter.visableSetting.blockPrepaymentProceed,
                  nameEng: "visableSetting.blockPrepaymentProceed",
                },
                {
                  name: "CV из целевой заявки в оплату по ДО",
                  value: filter.visableSetting.blockApplicationToClientDO,
                  nameEng: "_visableSetting.blockApplicationToClientDO",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  getters: {
    getSelectProps() {
      return this.menu.find((el) => el.type === "select")?.items.find((el) => el.name === "Тип");
    },
    getCollapseProps() {
      return this.menu.find((el) => el.type === "collapse")?.items;
    },
  },
  actions: {
    changeType(selected) {
      this.menu = [
        ...this.menu.map((el) => {
          if (el.type === "select") {
            el.items = [
              ...el.items.map((item) => {
                if (item.name === "Тип") {
                  item.selected = selected.selectedOption.value;
                }

                return item;
              }),
            ];
          }

          return el;
        }),
      ];
    },
    changeCheckboxValue(checked) {
      this.menu = [
        ...this.menu.map((item) => {
          if (item.type === "collapse") {
            item.items.forEach((el) => {
              el.items = [
                ...el.items.map((elem) => {
                  if (elem.nameEng === checked.name) {
                    elem.value = checked.value;
                  }

                  return elem;
                }),
              ];
            });
          }

          return item;
        }),
      ];
    },
  },
});
