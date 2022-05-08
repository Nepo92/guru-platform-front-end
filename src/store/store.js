import { defineStore } from 'pinia';

export const loginStore = defineStore('loginStore', {
  state() {
    return {
      // eslint-disable-next-line
      background: background.companyBackground || '-webkit-linear-gradient(180deg, rgb(143, 149, 194) 0%, rgb(167, 137, 185) 100%)',
      hidePassword: true,
    }
  },
  actions: {
    сhangeDisplayPassword() {
      this.hidePassword = !this.hidePassword;
    },
  }
});

export const monitorStore = defineStore('monitorStore', {
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
    }
  }
});

export const filterStore = defineStore('filterStore', {
  state() {
    return {
      // eslint-disable-next-line
      filter: filter || null,
      // eslint-disable-next-line
      projects: projects || null,
      period: [
        {
          name: 'Сегодня',
          value: 1,
        },
        {
          name: 'Вчера',
          value: 2,
        },
        {
          name: 'Неделя',
          value: 3,
        },
        {
          name: 'Месяц',
          value: 4,
        }
      ],
      monitorDeals: [
        {
          name: 'Все',
          value: 'all',
        },
        {
          name: 'Мои',
          value: 'self',
        }
      ],
      filterProps: {
        title: 'Фильтровать монитор',
      },
      filterInState: [
        {
          name: 'Выручка',
          nameEng: 'proceedType',
          // eslint-disable-next-line
          selected: filter.proceedType,
          options: [
            {
              name: 'Все',
              value: 0,
            },
            {
              name: 'Трафик',
              value: 1,
            },
            {
              name: 'База',
              value: 2,
            },
            {
              name: 'Товарка',
              value: 3,
            }
          ]
        },
        {
          name: 'Проекты',
          nameEng: 'projectId',
          // eslint-disable-next-line
          selected: filter.projectId,
          options: [
            {
              name: 'Все проекты',
              value: 0,
            },
            // eslint-disable-next-line
            ...projects.map((project) => {
              return {
                name: project.name,
                value: project.id,
              }
            }),
          ],
        },
        {
          name: 'Отображать',
          nameEng: 'showManagerType',
          // eslint-disable-next-line
          selected: filter.showManagerType,
          options: [
            {
              name: 'Все',
              value: 1,
            },
            {
              name: 'Работающие',
              value: 2,
            },
            {
              name: 'Уволенные',
              value: 3,
            },
          ]
        },
      ],
    }
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

export const monitorWidgets = defineStore('monitorWidgets', {
  state() {
    // eslint-disable-next-line
    const tilesData = tiles || null;

    return {
      tiles: tilesData,
      // eslint-disable-next-line
      filter: filter || null,
      widgets: [
        {
          name: 'Заявки (Ц)',
          nameEng: 'order',
          value: 'Виджет отключен',
          percent: null,
          plan: null,
          description: 'Количество целевых обращений, учитываются из CRM',
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
        },
        {
          name: 'Заказы',
          nameEng: 'application',
          value: tilesData.bill.value,
          percent: tilesData.bill.percent,
          plan: tilesData.bill.plan,
          description: 'Количество оформленных заказов, учитываются как оплаченные так и не оплаченные',
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
        },
        {
          name: 'Продажи',
          nameEng: 'sales',
          value: tilesData.sale.value,
          percent: tilesData.sale.percent,
          plan: tilesData.sale.plan,
          description: 'Количество оплаченных заказов, учитываются как предоплаты так и полные оплаты',
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
        },
        {
          name: 'Выручка',
          nameEng: 'revenue',
          value: tilesData.proceed.value,
          percent: tilesData.proceed.percent,
          plan: tilesData.proceed.plan,
          description: 'Сумма вырученных от продаж денег',
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
        },
        {
          name: 'Прогноз',
          nameEng: 'prediction',
          value: 'Нет прогноза',
          percent: null,
          plan: null,
          description: 'Прогноз выручки, считается по формуле: (факт по выручке / на количество прошедших дней) * количество дней в месяце',
          period: [null],
          metric: {
            green: 99,
            yellow: 65,
          },
        },
        {
          name: 'Прогноз',
          nameEng: 'prediction',
          value: tilesData.prediction.plan,
          percent: tilesData.deviation.percent,
          plan: tilesData.deviation.plan,
          description: 'Прогноз выручки, считается по формуле: (факт по выручке / на количество прошедших дней) * количество дней в месяце',
          period: [4],
          metric: {
            green: 99,
            yellow: 65,
          },
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

export const statMonitor = defineStore('statMonitor', {
  state() {
    return {
      // eslint-disable-next-line
      data: rows || null,
      // eslint-disable-next-line
      filter: filter || null,
    };
  }
});
