import { defineStore } from "pinia";

export const loginStore = defineStore("loginStore", {
  state() {
    return {
      // eslint-disable-next-line
      background:
        background.companyBackground ||
        "-webkit-linear-gradient(180deg, rgb(143, 149, 194) 0%, rgb(167, 137, 185) 100%)",
      hidePassword: true,
    };
  },
  actions: {
    сhangeDisplayPassword() {
      this.hidePassword = !this.hidePassword;
    },
  },
});

export const monitorStore = defineStore("monitorStore", {
  state() {
    return {
      // eslint-disable-next-line
      company: company || null,
      // eslint-disable-next-line
      background: bgColor.color || null,
      // eslint-disable-next-line
      actionBanners: actionBanners || null,
      // eslint-disable-next-line
      role: role || null,
    };
  },
});

export const filterStore = defineStore("filterStore", {
  state() {
    return {
      // eslint-disable-next-line
      filter: filter || null,
      // eslint-disable-next-line
      projects: projects || null,
      period: [
        {
          name: "Сегодня",
          value: 1,
        },
        {
          name: "Вчера",
          value: 2,
        },
        {
          name: "Неделя",
          value: 3,
        },
        {
          name: "Месяц",
          value: 4,
        },
      ],
      monitorDeals: [
        {
          name: "Все",
          value: "all",
        },
        {
          name: "Мои",
          value: "self",
        },
      ],
      filterProps: {
        title: "Фильтровать монитор",
      },
      filterInState: [
        {
          name: "Выручка",
          nameEng: "proceedType",
          // eslint-disable-next-line
          selected: filter.proceedType,
          options: [
            {
              name: "Все",
              value: 0,
            },
            {
              name: "Трафик",
              value: 1,
            },
            {
              name: "База",
              value: 2,
            },
            {
              name: "Товарка",
              value: 3,
            },
          ],
          pages: ["/monitor/"],
        },
        {
          name: "Проекты",
          nameEng: "projectId",
          // eslint-disable-next-line
          selected: filter.projectId,
          options: [
            {
              name: "Все проекты",
              value: 0,
            },
            // eslint-disable-next-line
            ...projects.map((project) => {
              return {
                name: project.name,
                value: project.id,
              };
            }),
          ],
          pages: ["/monitor/", "/monitor-control/"],
        },
        {
          name: "Отображать",
          nameEng: "showManagerType",
          // eslint-disable-next-line
          selected: filter.showManagerType,
          options: [
            {
              name: "Все",
              value: 1,
            },
            {
              name: "Работающие",
              value: 2,
            },
            {
              name: "Уволенные",
              value: 3,
            },
          ],
          pages: ["/monitor/"],
        },
      ],
      selectProps: {
        selectsOnPage: [],
      },
    };
  },
  getters: {
    filterOnPage() {
      const filter = Object.entries(this.filter);

      const filterRender = this.filterInState.filter((el) => {
        const hasOption = filter.find((item) => item[0] === el.nameEng);

        if (hasOption) {
          el.value = hasOption[1];
        }

        return hasOption ? el : false;
      });

      return filterRender;
    },
  },
});

export const monitorWidgets = defineStore("monitorWidgets", {
  state() {
    // eslint-disable-next-line
    const tilesData = tiles || null;
    // eslint-disable-next-line
    const generalRowData = generalRow || null;

    return {
      tiles: tilesData,
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
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ["/monitor/"],
        },
        {
          name: "Заказы",
          nameEng: "application",
          value: tilesData?.bill.value,
          percent: tilesData?.bill.percent,
          plan: tilesData?.bill.plan,
          description:
            "Количество оформленных заказов, учитываются как оплаченные так и не оплаченные",
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ["/monitor/"],
        },
        {
          name: "Продажи",
          nameEng: "sales",
          value: tilesData?.sale.value,
          percent: tilesData?.sale.percent,
          plan: tilesData?.sale.plan,
          description:
            "Количество оплаченных заказов, учитываются как предоплаты так и полные оплаты",
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ["/monitor/"],
        },
        {
          name: "Выручка",
          nameEng: "revenue",
          value: tilesData?.proceed.value,
          percent: tilesData?.proceed.percent,
          plan: tilesData?.proceed.plan,
          description: "Сумма вырученных от продаж денег",
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
          units: "roubles",
          pages: ["/monitor/"],
        },
        {
          name: "Прогноз",
          nameEng: "prediction",
          value: "Нет прогноза",
          percent: null,
          plan: null,
          description:
            "Прогноз выручки, считается по формуле: (факт по выручке / на количество прошедших дней) * количество дней в месяце",
          period: [null],
          metric: {
            green: 99,
            yellow: 65,
          },
          units: "roubles",
          pages: ["/monitor/"],
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
          pages: ["/monitor/"],
        },
        {
          name: "Проверено сделок",
          nameEng: "deal-count",
          value: generalRowData?.dealCount,
          percent: null,
          description: "Количество проверенных сделок",
          period: [null],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Поставлено оценок",
          nameEng: "rate-count",
          value: generalRowData?.rateCount,
          percent: null,
          description: "Количество разрешенных споров",
          period: [null],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Споров отработано",
          nameEng: "debate-count",
          value: generalRowData?.debateCount,
          percent: null,
          description: "Количество измененных оценок в спорах",
          period: [null],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Изменений оценок в спорах",
          nameEng: "debate-count-estimation",
          value: generalRowData?.debateCount,
          percent: null,
          description: "Количество измененных оценок в спорах",
          period: [null],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Средняя оценка",
          nameEng: "score",
          value: generalRowData?.score,
          percent: null,
          description: "Средняя оценка менеджеров",
          period: [null],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
      ],
    };
  },
  getters: {
    widgetsData() {
      const lessMonth = this.widgets.filter((el) => el.period.includes(this.filter.period));
      const other = this.widgets.filter((el) => el.period.includes(null));

      return this.filter.period === 4 ? lessMonth : other;
    },
  },
});

export const statMonitor = defineStore("statMonitor", {
  state() {
    return {
      // eslint-disable-next-line
      data: rows || managersRows || null,
      // eslint-disable-next-line
      filter: filter || null,
      managerStat: [
        {
          name: "по оплатам",
          value: 1,
          pages: ["/monitor/"],
        },
        {
          name: "по выручке",
          value: 2,
          pages: ["/monitor/"],
        },
        {
          name: "по рейтингу",
          value: 3,
          pages: ["/monitor/"],
        },
        {
          name: "по оценке",
          value: "1",
          pages: ["/monitor-control/"],
        },
        {
          name: "по спорам",
          value: "2",
          pages: ["/monitor-control/"],
        },
        {
          name: "по сделкам",
          value: "3",
          pages: ["/monitor-control/"],
        },
      ],
      imageSize: [
        {
          figure: "rectangle",
          size: {
            width: "100%",
            height: "auto",
            transform: "scale(2) translateY(25%)",
          },
        },
        {
          figure: "square",
          size: {
            width: "100%",
            height: "100%",
          },
        },
        {
          figure: "vertical-rectangle",
          size: {
            width: "100%",
            height: "auto",
            transform: "scale(1.5)",
          },
        },
      ],
      statDescription: [
        {
          value: "Общий монитор продаж с ранжированием по выбранному критерию",
          pages: ["/monitor/"],
        },
        {
          value: "Общий монитор работы менеджеров",
          pages: ["/monitor-control/"],
        },
      ],
      statsName: [
        {
          name: "",
          nameEng: "count",
          pages: ["/monitor/", "/monitor-control/"],
        },
        {
          name: "Менеджер",
          nameEng: "manager",
          pages: ["/monitor/", "/monitor-control/"],
        },
        {
          name: "Награды",
          nameEng: "reward",
          pages: ["/monitor/"],
        },
        {
          name: "Заказы",
          nameEng: "order",
          pages: ["/monitor/"],
        },
        {
          name: "Продажи",
          nameEng: "payment",
          pages: ["/monitor/"],
        },
        {
          name: "Выручка",
          nameEng: "revenue",
          pages: ["/monitor/"],
        },
        {
          name: "Осталось",
          nameEng: "left",
          pages: ["/monitor/"],
        },
        {
          name: "Прогноз",
          nameEng: "prediction",
          pages: ["/monitor/"],
        },
        {
          name: "Отклонение",
          nameEng: "deviation",
          pages: ["/monitor/"],
        },
        {
          name: "Проверенно сделок",
          nameEng: "deal-count",
          pages: ["/monitor-control/"],
        },
        {
          name: "Поставлено оценок",
          nameEng: "rate-count",
          pages: ["/monitor-control/"],
        },
        {
          name: "Споров отработано",
          nameEng: "debate-count",
          pages: ["/monitor-control/"],
        },
        {
          name: "Изменений оценок в спорах",
          nameEng: "debate-count-estimation",
          pages: ["/monitor-control/"],
        },
        {
          name: "Средняя оценка",
          nameEng: "score",
          pages: ["/monitor-control/"],
        },
      ],
    };
  },
});

export const analyticStore = defineStore("analyticStore", {
  state() {
    return {
      managers: managers || null,
      analytic: {
        /* Выручка общая */
        totalRevenue: totalRevenue || null,
        managerTotalRevenue: managerTotalRevenue || null,
        /* Выручка c траффикa */
        trafficRevenue: trafficRevenue || null,
        managerTrafficRevenue: managerTrafficRevenue || null,
        /* Выручка c базы */
        additionalRevenue: additionalRevenue || null,
        managerAdditionalRevenue: managerAdditionalRevenue || null,
        /* Расоды на рекламу */
        advExpenses: advExpenses || null,
        managerAdvExpenses: managerAdvExpenses || null,
        /* КПД */
        kpd: kpd || null,
        managerKpd: managerKpd || null,
        /* Продажи всего */
        sales: sales || null,
        managerSales: managerSales || null,
        /* Продажи трафик */
        salesTraffic: salesTraffic || null,
        managerSalesTraffic: managerSalesTraffic || null,
        /* Продажи рассылка */
        salesMailing: salesMailing || null,
        managerSalesMailing: managerSalesMailing || null,
        /* Продажи база */
        salesAdditional: salesAdditional || null,
        managerSalesAdditional: managerSalesAdditional || null,
        /* Средний чек */
        average: average || null,
        managerAverage: managerAverage || null,
        /* Средний чек трафик  */
        averageTrafficMailing: averageTrafficMailing || null,
        managerAverageTrafficMailing: managerAverageTrafficMailing || null,
        /* Средний чек база */
        averageAdditional: averageAdditional || null,
        managerAverageAdditional: managerAverageAdditional || null,
        /* Выручка общая - расходы на рекламу */
        profit: profit || null,
        managerProfit: managerProfit || null,
        /* Ретинг */
        rating: rating || null,
        managerRating: managerRating || null,
        /* Количество прописанных людей */
        prescribed: prescribed || null,
        managerPrescribed: managerPrescribed || null,
        /* CV из прописанных людей в продажи */
        prescribedToSale: prescribedToSale || null,
        managerPrescribedToSale: managerPrescribedToSale || null,
        /* % ДРР (доля рекламных расходов) */
        shareAdvExpensesTrafficPage: shareAdvExpensesTrafficPage || null,
        managerShareAdvExpensesTrafficPage: managerShareAdvExpensesTrafficPage || null,
        /* Показов */
        advShow: advShow || null,
        managerAdvShow: managerAdvShow || null,
        /* Кликов */
        advClick: advClick || null,
        managerAdvClick: managerAdvClick || null,
        /* Заявок */
        advApplication: advApplication || null,
        managerAdvApplication: managerAdvApplication || null,
        /* Целевых заявок */
        importantRow: importantRow || null,
        managerImportantRow: managerImportantRow || null,
        /* Заказов */
        invoices: invoices || null,
        managerInvoices: managerInvoices || null,
        /* Продаж */
        salesNewClient: salesNewClient || null,
        managerSalesNewClient: managerSalesNewClient || null,
        /* Продаж без рассылки */
        salesNewClientNM: salesNewClientNM || null,
        salesMNewClientNM: salesMNewClientNM || null,
        /* Продаж c рассылки */
        salesNewClientM: salesNewClientM || null,
        salesMNewClientM: salesMNewClientM || null,
        /* Отказов */
        rejectsRow: rejectsRow || null,
        mRejectsRow: mRejectsRow || null,
        /* Новых клиентов по ДО */
        newClientsDo: newClientsDo || null,
        newMClientsDo: newMClientsDo || null,
        /* Новых клиентов с трафика за период */
        newClientsTraffic: newClientsTraffic || null,
        newMClientsTraffic: newMClientsTraffic || null,
        /* Дотекло клиентов по ДО */
        newClientsAll: newClientsAll || null,
        newMClientsAll: newMClientsAll || null,
        /* Дотекло клиентов по ДО (без рассылки) */
        newClientsWithoutMailing: newClientsWithoutMailing || null,
        newMClientsWithoutMailing: newMClientsWithoutMailing || null,
        /* Дотекло клиентов по ДО (по рассылке) */
        newClientsWithMailing: newClientsWithMailing || null,
        newMClientsWithMailing: newMClientsWithMailing || null,
        /* Средний чек */
        averageCheckTraffic: averageCheckTraffic || null,
        managerAverageCheckTraffic: managerAverageCheckTraffic || null,
        /* Стоимость 1000 показов */
        showPrice: showPrice || null,
        mShowPrice: mShowPrice || null,
        /* Стоимость клика */
        clickPrice: clickPrice || null,
        mClickPrice: mClickPrice || null,
        /* Стоимость заявки */
        applicationPrice: applicationPrice || null,
        mApplicationPrice: mApplicationPrice || null,
        /* Стоимость целевой заявки */
        importantPriceRow: importantPriceRow || null,
        mImportantPriceRow: mImportantPriceRow || null,
        /* Стоимость заказа */
        invoicePrice: invoicePrice || null,
        mInvoicePrice: mInvoicePrice || null,
        /* Стоимость клиента */
        clientPrice: clientPrice || null,
        mClientPrice: mClientPrice || null,
        /* Стоимость клиента по ДО */
        clientPriceDo: clientPriceDo || null,
        mClientPriceDo: mClientPriceDo || null,
        /* CV из показа в клик */
        showToClick: showToClick || null,
        mShowToClick: mShowToClick || null,
        /* CV1 из клика в заявку */
        clickToApplication: clickToApplication || null,
        mClickToApplication: mClickToApplication || null,
        /* CV2 из заявки в заказ */
        applicationToInvoice: applicationToInvoice || null,
        mApplicationToInvoice: mApplicationToInvoice || null,
        /* CV3 из заказа в оплату */
        invoiceToClient: invoiceToClient || null,
        mInvoiceToClient: mInvoiceToClient || null,
        /* CV4 из заявки в оплату */
        applicationToClient: applicationToClient || null,
        mApplicationToClient: mApplicationToClient || null,
        /* CV4 из заявки в оплату по ДО */
        clickToApplicationDo: clickToApplicationDo || null,
        mClickToApplicationDo: mClickToApplicationDo || null,
        /* CV из целевой заявки в оплату по ДО */
        CV5Row: CV5Row || null,
        mCV5Row: mCV5Row || null,
        /* kpdColor */
        kpdColor: kpdColor || null,
        /* ratingColor */
        ratingColor: ratingColor || null,
      },
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
            link: "/traffic/",
            nameClass: "analytic",
          },
          {
            name: "База",
            settings: true,
            link: "/additional/",
            nameClass: "analytic",
          },
        ],
        color: true,
        border: false,
      },
    };
  },
});

export const analyticFilterStore = defineStore("analyticFilterStore", {
  state() {
    return {
      filter: filter || null,
      filterOptions: [
        {
          name: "По месяцам",
          value: "0",
        },
        {
          name: "По неделям",
          value: "1",
        },
        {
          name: "По дням",
          value: "2",
        },
      ],
      filterProps: {
        title: "Фильтровать аналитику",
      },
      datepickerMonth: [],
    };
  },
});

export const funnelSettingsStore = defineStore("funnelSettingsStore", {
  state() {
    return {
      filter: filter || null,
    };
  },
});
