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
          ],
          pages: ['/monitor/'],
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
          pages: ['/monitor/', '/monitor-control/'],
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
          ],
          pages: ['/monitor/'],
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
    // eslint-disable-next-line
    const generalRowData = generalRow || null;

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
          pages: ['/monitor/'],
        },
        {
          name: 'Заказы',
          nameEng: 'application',
          value: tilesData?.bill.value,
          percent: tilesData?.bill.percent,
          plan: tilesData?.bill.plan,
          description: 'Количество оформленных заказов, учитываются как оплаченные так и не оплаченные',
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ['/monitor/'],
        },
        {
          name: 'Продажи',
          nameEng: 'sales',
          value: tilesData?.sale.value,
          percent: tilesData?.sale.percent,
          plan: tilesData?.sale.plan,
          description: 'Количество оплаченных заказов, учитываются как предоплаты так и полные оплаты',
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
          pages: ['/monitor/'],
        },
        {
          name: 'Выручка',
          nameEng: 'revenue',
          value: tilesData?.proceed.value,
          percent: tilesData?.proceed.percent,
          plan: tilesData?.proceed.plan,
          description: 'Сумма вырученных от продаж денег',
          period: [null, 4],
          metric: {
            green: 99,
            yellow: 65,
          },
          units: 'roubles',
          pages: ['/monitor/'],
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
          units: 'roubles',
          pages: ['/monitor/'],
        },
        {
          name: 'Прогноз',
          nameEng: 'prediction',
          value: tilesData?.prediction.plan,
          percent: tilesData?.deviation.percent,
          plan: tilesData?.deviation.plan,
          description: 'Прогноз выручки, считается по формуле: (факт по выручке / на количество прошедших дней) * количество дней в месяце',
          period: [4],
          metric: {
            green: 99,
            yellow: 65,
          },
          units: 'roubles',
          pages: ['/monitor/'],
        },
        {
          name: 'Проверено сделок',
          nameEng: 'deal-count',
          value: generalRowData?.dealCount,
          percent: null,
          description: 'Количество проверенных сделок',
          period: [null],
          metric: null,
          units: null,
          pages: ['/monitor-control/'],
        },
        {
          name: 'Поставлено оценок',
          nameEng: 'rate-count',
          value: generalRowData?.rateCount,
          percent: null,
          description: 'Количество разрешенных споров',
          period: [null],
          metric: null,
          units: null,
          pages: ['/monitor-control/'],
        },
        {
          name: 'Споров отработано',
          nameEng: 'debate-count',
          value: generalRowData?.debateCount,
          percent: null,
          description: 'Количество измененных оценок в спорах',
          period: [null],
          metric: null,
          units: null,
          pages: ['/monitor-control/'],
        },
        {
          name: 'Изменений оценок в спорах',
          nameEng: 'debate-count-estimation',
          value: generalRowData?.debateCount,
          percent: null,
          description: 'Количество измененных оценок в спорах',
          period: [null],
          metric: null,
          units: null,
          pages: ['/monitor-control/'],
        },
        {
          name: 'Средняя оценка',
          nameEng: 'score',
          value: generalRowData?.score,
          percent: null,
          description: 'Средняя оценка менеджеров',
          period: [null],
          metric: null,
          units: null,
          pages: ['/monitor-control/'],
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
      data: rows || managersRows || null,
      // eslint-disable-next-line
      filter: filter || null,
      managerStat: [
        {
          name: 'по оплатам',
          value: 1,
          pages: ['/monitor/']
        },
        {
          name: 'по выручке',
          value: 2,
          pages: ['/monitor/']
        },
        {
          name: 'по рейтингу',
          value: 3,
          pages: ['/monitor/']
        },
        {
          name: 'по оценке',
          value: '1',
          pages: ['/monitor-control/'],
        },
        {
          name: 'по спорам',
          value: '2',
          pages: ['/monitor-control/'],
        },
        {
          name: 'по сделкам',
          value: '3',
          pages: ['/monitor-control/'],
        },
      ],
      imageSize: [
        {
          figure: "rectangle",
          size: {
            width: "100%",
            height: "auto",
            transform: 'scale(2) translateY(25%)',
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
          value: 'Общий монитор продаж с ранжированием по выбранному критерию',
          pages: ['/monitor/'],
        },
        {
          value: 'Общий монитор работы менеджеров',
          pages: ['/monitor-control/'],
        },
      ],
      statsName: [
        {
          name: '',
          nameEng: 'count',
          pages: ['/monitor/', '/monitor-control/'],
        },
        {
          name: 'Менеджер',
          nameEng: 'manager',
          pages: ['/monitor/', '/monitor-control/'],
        },
        {
          name: 'Награды',
          nameEng: 'reward',
          pages: ['/monitor/'],
        },
        {
          name: 'Заказы',
          nameEng: 'order',
          pages: ['/monitor/'],
        },
        {
          name: 'Продажи',
          nameEng: 'payment',
          pages: ['/monitor/'],
        },
        {
          name: 'Выручка',
          nameEng: 'revenue',
          pages: ['/monitor/'],
        },
        {
          name: 'Осталось',
          nameEng: 'left',
          pages: ['/monitor/'],
        },
        {
          name: 'Прогноз',
          nameEng: 'prediction',
          pages: ['/monitor/'],
        },
        {
          name: 'Отклонение',
          nameEng: 'deviation',
          pages: ['/monitor/'],
        },
        {
          name: 'Проверенно сделок',
          nameEng: 'deal-count',
          pages: ['/monitor-control/'],
        },
        {
          name: 'Поставлено оценок',
          nameEng: 'rate-count',
          pages: ['/monitor-control/'],
        },
        {
          name: 'Споров отработано',
          nameEng: 'debate-count',
          pages: ['/monitor-control/'],
        },
        {
          name: 'Изменений оценок в спорах',
          nameEng: 'debate-count-estimation',
          pages: ['/monitor-control/'],
        },
        {
          name: 'Средняя оценка',
          nameEng: 'score',
          pages: ['/monitor-control/'],
        },
      ],
    };
  },
});
