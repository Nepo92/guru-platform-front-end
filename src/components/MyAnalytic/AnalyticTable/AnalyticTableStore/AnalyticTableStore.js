import { defineStore } from "pinia";

export const analyticTableStore = defineStore({
  state() {
    return {
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
              name: "Ретинг",
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
    };
  },
  getters: {
    getPeriod() {
      return;
    },
    getCurrentRows() {
      return this.rows.find((el) => el.page === this.currentPage);
    },
  },
  actions: {
    setInitialValues(page) {
      this.currentPage = page;
    },
  },
});
