import { defineStore } from "pinia";
import { dealAPI } from "@/api/api.js";

export const analyticFilterStore = defineStore("analyticFilter", {
  state() {
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
                  return this.options.find((el) => el.value === this.selected)?.name || null;
                },
                pages: ["/funnel/"],
              },
            ],
          },
        ],
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
  },
});
