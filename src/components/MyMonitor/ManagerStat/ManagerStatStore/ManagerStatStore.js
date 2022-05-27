import { findDir } from "@vue/compiler-core";
import { defineStore } from "pinia";
import { getTemplateSelect } from "@/components/UI/MySelect/MySelectTemplate";

export const statMonitor = defineStore("statMonitor", {
  state() {
    return {
      // eslint-disable-next-line
      data: rows || managersRows || null,
      // eslint-disable-next-line
      filter: filter || null,
      managerStatSelect() {
        return getTemplateSelect({
          name: "",
          nameEng: [{ tabs: ["Продажи"] }],
          selected: filter.rowSortType,
          options: [
            {
              name: "по оплатам",
              value: 1,
              tabs: ["Продажи"],
            },
            {
              name: "по выручке",
              value: 2,
              tabs: ["Продажи"],
            },
            {
              name: "по рейтингу",
              value: 3,
              tabs: ["Продажи"],
            },
            {
              name: "по оценке",
              value: "1",
              tabs: ["Контроль"],
            },
            {
              name: "по спорам",
              value: "2",
              tabs: ["Контроль"],
            },
            {
              name: "по сделкам",
              value: "3",
              tabs: ["Контроль"],
            },
          ],
          tabs: ["Продажи", "Контроль"],
        });
      },
      statDescription: [
        {
          value: "Общий монитор продаж с ранжированием по выбранному критерию",
          tabs: ["Продажи"],
        },
        {
          value: "Общий монитор работы менеджеров",
          tabs: ["Контроль"],
        },
      ],
      statsName: [
        {
          name: "",
          nameEng: "count",
          tabs: ["Продажи", "Контроль"],
        },
        {
          name: "Менеджер",
          nameEng: "manager",
          tabs: ["Продажи", "Контроль"],
        },
        {
          name: "Награды",
          nameEng: "reward",
          tabs: ["Продажи"],
        },
        {
          name: "Заказы",
          nameEng: "order",
          tabs: ["Продажи"],
        },
        {
          name: "Продажи",
          nameEng: "payment",
          tabs: ["Продажи"],
        },
        {
          name: "Выручка",
          nameEng: "revenue",
          tabs: ["Продажи"],
        },
        {
          name: "Осталось",
          nameEng: "left",
          tabs: ["Продажи"],
        },
        {
          name: "Прогноз",
          nameEng: "prediction",
          tabs: ["Продажи"],
        },
        {
          name: "Отклонение",
          nameEng: "deviation",
          tabs: ["Продажи"],
        },
        {
          name: "Проверенно сделок",
          nameEng: "deal-count",
          tabs: ["Контроль"],
        },
        {
          name: "Поставлено оценок",
          nameEng: "rate-count",
          tabs: ["Контроль"],
        },
        {
          name: "Споров отработано",
          nameEng: "debate-count",
          tabs: ["Контроль"],
        },
        {
          name: "Изменений оценок в спорах",
          nameEng: "debate-count-estimation",
          tabs: ["Контроль"],
        },
        {
          name: "Средняя оценка",
          nameEng: "score",
          tabs: ["Контроль"],
        },
      ],
    };
  },
});
