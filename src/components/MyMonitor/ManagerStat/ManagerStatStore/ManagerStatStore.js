import { defineStore } from "pinia";

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
