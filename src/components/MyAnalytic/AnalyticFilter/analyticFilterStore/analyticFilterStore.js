import { defineStore } from 'pinia';

export const analyticFilterStore = defineStore('analyticFilter', {
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
        items: [
        {
          type: 'select',
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
          pages: ["/funnel/"],
        },
        {
          type: 'select',
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
          pages: ["/funnel/"],
        },
        {
          type: 'select',
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
              value: "all",
            },
            ...dealType.map((el) => {
              return {
                name: el.name,
                value: el.value,
              };
            }),
          ],
          pages: ["/funnel/"],
        },
        {
          type: 'select',
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
          pages: ["/funnel/"],
        },
        {
          type: 'select',
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
          pages: ["/funnel/"],
        },
        ],
      },
      datepickerMonth: [],
    }
  }
})
