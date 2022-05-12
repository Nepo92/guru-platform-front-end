import {defineStore} from 'pinia';

export const monitorFilter = defineStore('monitorFilter', {
  state() {
    return {
      filter: filter || null,
      projects: projects || null,
      managersFilter: managersFilter || null,
      courses: courses || null,
      dealType: dealType || null,
      employees: employees || null,
      funnels: null,
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
        columns: [
          {
            items: [
              {
            type: 'select',
            name: "Выручка",
            nameEng: [
              {
                name: "proceedType",
                pages: ["/monitor/"],
              },
            ],
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
            type: 'select',
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
            selected: filter.projectId,
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
            pages: ["/monitor/", "/monitor-control/"],
              },
              {
            type: 'select',
            name: "Отображать",
            nameEng: [
              {
                name: "showManagerType",
                pages: ["/monitor/"],
              },
            ],
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
          },
        ],
      },
    }
  },
});