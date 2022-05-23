import { defineStore } from "pinia";

export const funnelTrafficStore = defineStore("funnelTrafficStore", {
  state() {
    // eslint-disable-next-line
    const filterData = filter || null;

    return {
      filterProps: {
        filter: filterData,
      },
      menu: [
        {
          type: "select",
          items: [
            {
              type: "select",
              name: "Тип",
              nameEng: "periodType",
              selected: filterData?.periodType,
              options() {
                return [
                  {
                    name: "Сумма за период",
                    value: "s",
                  },
                  {
                    name: "Среднее за период",
                    value: "a",
                  },
                ];
              },
              selectedName() {
                return this.options().find((el) => el.value === this.selected)?.name || null;
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
                  value: filterData?.visableSetting.blockProceed,
                  nameEng: "_visableSetting.blockProceed",
                },
                {
                  name: "Расходы на рекламу",
                  value: filterData?.visableSetting.blockAdvertisingExpenses,
                  nameEng: "_visableSetting.blockAdvertisingExpenses",
                },
                {
                  name: "Выручка общая - Расходы на рекламу",
                  value: filterData?.visableSetting.blockProceedAdvertisingExpenses,
                  nameEng: "visableSetting.blockProceedAdvertisingExpenses",
                },
                {
                  name: "% ДРР (доля рекламных расходов)",
                  value: filterData?.visableSetting.blockPercentNetProceed,
                  nameEng: "visableSetting.blockPercentNetProceed",
                },
                {
                  name: "КПД",
                  value: filterData?.visableSetting.blockKPD,
                  nameEng: "visableSetting.blockKPD",
                },
              ],
            },
            {
              name: "Показатели этапов воронки",
              items: [
                {
                  name: "Показов",
                  value: filterData?.visableSetting.blockShows,
                  nameEng: "visableSetting.blockShows",
                },
                {
                  name: "Кликов",
                  value: filterData?.visableSetting.blockClicks,
                  nameEng: "visableSetting.blockClicks",
                },
                {
                  name: "Заявок",
                  value: filterData?.visableSetting.blockApplications,
                  nameEng: "visableSetting.blockApplications",
                },
                {
                  name: "Целевых заявок",
                  value: filterData?.visableSetting.blockAveragePrepayment,
                  nameEng: "visableSetting.blockAveragePrepayment",
                },
                {
                  name: "Заказов",
                  value: filterData?.visableSetting.blockBills,
                  nameEng: "visableSetting.blockBills",
                },
                {
                  name: "Продаж",
                  value: filterData?.visableSetting.blockSales,
                  nameEng: "visableSetting.blockSales",
                },
                {
                  name: "Продаж без рассылки",
                  value: filterData?.visableSetting.blockSalesWithoutSales,
                  nameEng: "visableSetting.blockSalesWithoutSales",
                },
                {
                  name: "Продаж с рассылки",
                  value: filterData?.visableSetting.blockSalesWithSales,
                  nameEng: "visableSetting.blockSalesWithSales",
                },
                {
                  name: "Отказов",
                  value: filterData?.visableSetting.blockSurcharges,
                  nameEng: "visableSetting.blockSurcharges",
                },
              ],
            },
            {
              name: "Клиенты по дате обращения",
              items: [
                {
                  name: "Новых клиентов по ДО",
                  value: filterData?.visableSetting.blockClientsDO,
                  nameEng: "visableSetting.blockClientsDO",
                },
                {
                  name: "Новых клиентов с трафика за период",
                  value: filterData?.visableSetting.blockClientsTraffic,
                  nameEng: "visableSetting.blockClientsTraffic",
                },
                {
                  name: "Дотекло клиентов по ДО",
                  value: filterData?.visableSetting.blockSalesDo,
                  nameEng: "visableSetting.blockSalesDo",
                },
                {
                  name: "Дотекло клиентов по ДО (без рассылки)",
                  value: filterData?.visableSetting.blockSalesDoWithoutMailing,
                  nameEng: "visableSetting.blockSalesDoWithoutMailing",
                },
                {
                  name: "Дотекло клиентов по ДО (по рассылке)",
                  value: filterData?.visableSetting.blockSalesDoWithMailing,
                  nameEng: "visableSetting.blockSalesDoWithMailing",
                },
              ],
            },
            {
              name: "Средний чек",
              items: [
                {
                  name: "Средний чек",
                  value: filterData?.visableSetting.blockAverage,
                  nameEng: "visableSetting.blockAverage",
                },
                {
                  name: "Стоимость 1000 показов",
                  value: filterData?.visableSetting.blockPriceShows,
                  nameEng: "visableSetting.blockPriceShows",
                },
                {
                  name: "Стоимость клика",
                  value: filterData?.visableSetting.blockPriceClick,
                  nameEng: "visableSetting.blockPriceClick",
                },
                {
                  name: "Стоимость заявки",
                  value: filterData?.visableSetting.blockPriceApplication,
                  nameEng: "visableSetting.blockPriceApplication",
                },
                {
                  name: "Стоимость целевой заявки",
                  value: filterData?.visableSetting.blockAverageSurcharge,
                  nameEng: "visableSetting.blockAverageSurcharge",
                },
                {
                  name: "Стоимость заказа",
                  value: filterData?.visableSetting.blockPriceBill,
                  nameEng: "visableSetting.blockPriceBill",
                },
                {
                  name: "Стоимость клиента",
                  value: filterData?.visableSetting.blockClient,
                  nameEng: "visableSetting.blockClient",
                },
                {
                  name: "Стоимость клиента по ДО",
                  value: filterData?.visableSetting.blockClientDO,
                  nameEng: "visableSetting.blockClientDO",
                },
              ],
            },
            {
              name: "Конверсии воронки",
              items: [
                {
                  name: "CV из показа в клик",
                  value: filterData?.visableSetting.blockShowToClick,
                  nameEng: "visableSetting.blockShowToClick",
                },
                {
                  name: "CV1 из клика в заявку",
                  value: filterData?.visableSetting.blockClickToApplication,
                  nameEng: "visableSetting.blockClickToApplication",
                },
                {
                  name: "CV2 из заявки в заказ",
                  value: filterData?.visableSetting.blockApplicationToBill,
                  nameEng: "visableSetting.blockApplicationToBill",
                },
                {
                  name: "CV3 из заказа в оплату",
                  value: filterData?.visableSetting.blockBillToClient,
                  nameEng: "visableSetting.blockBillToClient",
                },
                {
                  name: "CV4 из заявки в оплату",
                  value: filterData?.visableSetting.blockApplicationToClient,
                  nameEng: "visableSetting.blockApplicationToClient",
                },
                {
                  name: "CV4 из заявки в оплату по ДО",
                  value: filterData?.visableSetting.blockPrepaymentProceed,
                  nameEng: "visableSetting.blockPrepaymentProceed",
                },
                {
                  name: "CV из целевой заявки в оплату по ДО",
                  value: filterData?.visableSetting.blockApplicationToClientDO,
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
