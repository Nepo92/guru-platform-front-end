import { defineStore } from "pinia";

export const monitorWidgets = defineStore("monitorWidgets", {
  state() {
    return {
      tiles: tiles || null,
      filter: filter || null,
      generalRow: generalRow || null,
      widgets: [
        {
          name: "Заявки (Ц)",
          nameEng: "order",
          value: "Виджет отключен",
          percent: null,
          plan: null,
          description: "Количество целевых обращений, учитываются из CRM",
          period: [null, 4, 1, 2, 3],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ["/monitor/"],
        },
        {
          name: "Заказы",
          nameEng: "application",
          value: tiles?.bill.value,
          percent: tiles?.bill.percent,
          plan: tiles?.bill.plan,
          description:
            "Количество оформленных заказов, учитываются как оплаченные так и не оплаченные",
          period: [null, 4, 1, 2, 3],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ["/monitor/"],
        },
        {
          name: "Продажи",
          nameEng: "sales",
          value: tiles?.sale.value,
          percent: tiles?.sale.percent,
          plan: tiles?.sale.plan,
          description:
            "Количество оплаченных заказов, учитываются как предоплаты так и полные оплаты",
          period: [null, 4, 1, 2, 3],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ["/monitor/"],
        },
        {
          name: "Выручка",
          nameEng: "revenue",
          value: tiles?.proceed.value,
          percent: tiles?.proceed.percent,
          plan: tiles?.proceed.plan,
          description: "Сумма вырученных от продаж денег",
          period: [null, 4, 1, 2, 3],
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
          period: [null, 1, 2, 3],
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
          value: tiles?.prediction.plan,
          percent: tiles?.deviation.percent,
          plan: tiles?.deviation.plan,
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
          value: generalRow?.dealCount,
          percent: null,
          description: "Количество проверенных сделок",
          period: [1, 2, 3, 4],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Поставлено оценок",
          nameEng: "rate-count",
          value: generalRow?.rateCount,
          percent: null,
          description: "Количество разрешенных споров",
          period: [1, 2, 3, 4],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Споров отработано",
          nameEng: "debate-count",
          value: generalRow?.debateCount,
          percent: null,
          description: "Количество измененных оценок в спорах",
          period: [1, 2, 3, 4],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Изменений оценок в спорах",
          nameEng: "debate-count-estimation",
          value: generalRow?.debateCount,
          percent: null,
          description: "Количество измененных оценок в спорах",
          period: [1, 2, 3, 4],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
        {
          name: "Средняя оценка",
          nameEng: "score",
          value: generalRow?.score,
          percent: null,
          description: "Средняя оценка менеджеров",
          period: [1, 2, 3, 4],
          metric: null,
          units: null,
          pages: ["/monitor-control/"],
        },
      ],
    };
  },
  getters: {
    getWidgetsItems() {
      const filterOnPage = this.widgets.filter((el) => el.pages.includes(this.currentPage));

      const result = filterOnPage.filter((el) => el.period.includes(this.filterPeriod));

      return result;
    },
  },
  actions: {
    setPage(page) {
      this.currentPage = page;
    },
    setFilterPeriod(period) {
      this.filterPeriod = period;
    },
  },
});
