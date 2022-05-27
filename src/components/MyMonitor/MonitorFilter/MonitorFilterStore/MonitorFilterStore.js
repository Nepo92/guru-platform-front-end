import { getTemplateSelect } from "@/components/UI/MySelect/MySelectTemplate";
import { defineStore } from "pinia";

export const monitorFilter = defineStore("monitorFilter", {
  state() {
    // eslint-disable-next-line
    const filterData = filter || null;
    // eslint-disable-next-line
    const projectsData = projects || null;

    return {
      filter: filterData,
      // eslint-disable-next-line
      projects: projectsData,
      // eslint-disable-next-line
      managersFilter: managersFilter || null,
      // eslint-disable-next-line
      courses: courses || null,
      // eslint-disable-next-line
      dealType: dealType || null,
      // eslint-disable-next-line
      employees: employees || null,
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
        filter: filterData || null,
        title: "Фильтровать монитор",
        columns: [
          {
            name: "Параметры",
            items: [
              getTemplateSelect({
                name: "Выручка",
                nameEng: [
                  {
                    name: "proceedType",
                    tabs: ["Продажи"],
                  },
                ],
                selected: filterData?.proceedType,
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
                tabs: ["Продажи"],
              }),
              getTemplateSelect({
                name: "Проекты",
                nameEng: [
                  {
                    tabs: ["Продажи", "Контроль"],
                    name: "projectId",
                  },
                ],
                selected: filterData?.projectId,
                options: [
                  {
                    name: "Все проекты",
                    value: 0,
                  },
                  ...projectsData?.map((project) => {
                    return {
                      name: project.name,
                      value: project.id,
                    };
                  }),
                ],
                tabs: ["Продажи", "Контроль"],
              }),
              getTemplateSelect({
                name: "Отображать",
                nameEng: [
                  {
                    name: "showManagerType",
                    tabs: ["Продажи"],
                  },
                ],
                selected: filterData?.showManagerType,
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
                tabs: ["Продажи"],
              }),
            ],
          },
        ],
      },
    };
  },
  getters: {
    getSortedFilterItems() {
      this.filterProps.columns.forEach((item) => {
        item.items = [
          ...item.items.filter((el) => el.pages.includes(this.currentPage)),
        ];

        item.items.forEach((el) => {
          el.nameEng = [
            ...el.nameEng.filter((item) =>
              item.pages.includes(this.currentPage)
            ),
          ];
        });
      });

      return this.filterProps.columns;
    },
    getFilterPropsAfterChange() {
      return this.filterProps;
    },
  },
  actions: {
    setPage(page) {
      this.currentPage = page;
    },
    changeSelectValue(selected) {
      this.filterProps.columns = [
        ...this.filterProps.columns.map((item) => {
          item.items = [
            ...item.items.map((el) => {
              if (el.name === selected.name) {
                el.selected = selected.selectedOption.value;
              }

              return el;
            }),
          ];

          return item;
        }),
      ];
    },
  },
});
