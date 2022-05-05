import Utils from '../../../../utils/utils.js';
import StartParams from './startParams.js';

const utils = new Utils();
const startParams = new StartParams();

class AnalyticsParams {
  async init(props) {
    const period = document.querySelector('[js-period]');

    if (period) {
      const params = await startParams.init();

      const showedPeriod = this.getPeriod(params);
      const analyticsProps = this.getProps(props);

      this.setColorsToColumn(analyticsProps, props);

      return await {
        ...analyticsProps,
        pack: {
          ...analyticsProps.pack,
          analytics: {
            ...analyticsProps.pack.analytics,
            showedPeriod,
          },
        },
      };
    }
  }

  setColorsToColumn(analyticsProps, props) {
    analyticsProps.pack.analytics.kpdColor = props.pack.analytics.kpdColor;
    analyticsProps.pack.analytics.ratingColor = props.pack.analytics.ratingColor;

    analyticsProps.pack.analytics.colors = {
      greens: ['totalRevenue', 'trafficRevenue', 'additionalRevenue', 'average', 'averageTrafficMailing', 'averageCheckTraffic', 'averageAdditional'],
      reds: ['advExpenses', 'rejectsRow'],
      blues: ['sales', 'salesTraffic', 'salesMailing', 'salesAdditional', 'profit', 'advShow', 'advClick', 'advApplication', 'importantRow', 'invoices', 'salesNewClient', 'salesNewClientNM', 'salesNewClientM', 'prescribed'],
      pink: ['newClientsDo', 'newClientsTraffic', 'newClientsAll', 'newClientsWithoutMailing', 'newClientsWithMailing'],
      purple: ['showPrice', 'clickPrice', 'applicationPrice', 'importantPriceRow', 'invoicePrice', 'clientPrice', 'clientPriceDo'],
      yellow: ['showToClick', 'clickToApplication', 'applicationToInvoice', 'invoiceToClient', 'applicationToClient', 'clickToApplicationDo', 'CV5Row', 'prescribedToSale'],
    };
  }

  getPeriod(params) {
    const getParams = this.getParams(params);

    const { sep, showedPeriod, segment } = getParams;

    for (let index = 0; index <= segment; index++) {
      switch (sep) {
        case 0: {
          this.getPeriodMonths(getParams, index);
          break;
        }
        case 1: {
          this.getPeriodWeeks(getParams, index);
          break;
        }
        case 2: {
          this.getPeriodDays(getParams, index);
          break;
        }
        default: {
          break;
        }
      }
    }

    return [...showedPeriod];
  }

  getParams(params) {
    const { start } = params;

    return {
      ...params,
      newDate: new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 59, 59, 999),
      week: {
        index: null,
        name: null,
      },
      nextWeek: null,
    };
  }

  getProps(props) {
    const { pack } = props;
    const { analytics } = pack;

    const total = {
      company: {
        general: {},
        months: {},
      },
      managers: {
        general: {},
        months: {},
      },
    };

    const analyticsData = Object.entries(analytics);

    analyticsData.forEach((item, index) => {
      const key = item[0];
      const value = item[1];

      if (key === 'kpdColor' || key === 'ratingColor') return false;

      if (index % 2 === 0 && item !== null && value !== null) {
        total.company.general[key] = value.sum;
        total.company.months[key] = value.sums;
      } else if (index % 2 !== 0 && item !== null && value !== null) {
        const managerData = Object.entries(value);

        total.managers.general[key] = [];
        total.managers.months[key] = [];

        managerData.forEach((elem) => {
          const id = elem[0];
          const val = elem[1];

          const managerTotal = {
            id: +id,
            value: val.sum,
          };

          total.managers.general[key].push(managerTotal);

          const managerMonths = {
            id: +id,
            value: val.sums,
          };

          total.managers.months[key].push(managerMonths);
        });
      }
    });

    const newProps = {
      ...props,
      pack: {
        ...pack,
        analytics: total,
      },
    };

    return newProps;
  }

  getPeriodMonths(params, index) {
    const { segment, showedPeriod } = params;

    if (index === segment) {
      return false;
    }

    const monthsNames = utils.getMonths();

    let name;

    const years = segment / 12;

    if (Math.ceil(years) > 1) {
      for (let i = 0; i < Math.ceil(years); i++) {
        monthsNames.forEach((item) => {
          monthsNames.push(item);
        });
      }
    }

    monthsNames.forEach((item, count) => {
      if (index - 11 <= 0 && count === index) {
        name = item;
      } else if (index - 12 >= 0 && count === index - 12) {
        name = item;
      }
    });

    const month = {
      index,
      name,
    };

    showedPeriod.push(month);
  }

  getPeriodWeeks(params, index) {
    const { newDate, end, segment } = params;

    // eslint-disable-next-line
    const current = index === 0 ? false : index === 1 ? false : index === segment ? false : index;

    if (newDate <= end) {
      switch (index) {
        case 0: {
          const getFirstWeek = this.getFirstWeek.bind(this);
          getFirstWeek(params, index);
          break;
        }
        case 1: {
          const getSecondWeek = this.getSecondWeek.bind(this);
          getSecondWeek(params, index);
          break;
        }
        case current: {
          const getCurrentWeek = this.getCurrentWeek.bind(this);
          getCurrentWeek(params, index);
          break;
        }
        case segment: {
          const getLastWeek = this.getLastWeek.bind(this);
          getLastWeek(params, index);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  getDate(date) {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  getFirstWeek(params, index) {
    const { newDate, showedPeriod } = params;

    const newWeek = {};

    newWeek.name = this.getDate(newDate);
    newWeek.index = index;

    showedPeriod.push(newWeek);
  }

  getSecondWeek(params, index) {
    const { start, showedPeriod, end } = params;

    const startSecondWeek = 7 - start.getDay();

    const year = start.getFullYear();
    const month = start.getMonth();
    const day = start.getDate() + startSecondWeek + 1;

    params.nextWeek = new Date(year, month, day, 23, 59, 59, 999);

    if (params.nextWeek < end) {
      const newWeek = {};

      newWeek.name = this.getDate(params.nextWeek);
      newWeek.index = index;

      showedPeriod.push(newWeek);
    }
  }

  getCurrentWeek(params, index) {
    const { showedPeriod, nextWeek, end } = params;

    const year = nextWeek.getFullYear();
    const month = nextWeek.getMonth();
    const day = nextWeek.getDate() + 7;

    const current = new Date(year, month, day, 23, 59, 59, 999);
    params.nextWeek = current;

    if (current < end) {
      const newWeek = {};

      newWeek.name = this.getDate(current);
      newWeek.index = index;

      showedPeriod.push(newWeek);
    }
  }

  getLastWeek(params, index) {
    const { showedPeriod, nextWeek, end } = params;

    const newWeek = {};

    const year = nextWeek.getFullYear();
    const month = nextWeek.getMonth();
    const day = nextWeek.getDate() + 7;

    const preLast = new Date(year, month, day, 23, 59, 59, 999);

    if (preLast < end) {
      newWeek.name = this.getDate(preLast);
      newWeek.index = index;

      showedPeriod.push(newWeek);
    }
  }

  getPeriodDays(params, index) {
    const { showedPeriod, newDate } = params;

    let day;

    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    if (index === 0) {
      const date = newDate.getDate();

      const startDate = new Date(year, month, date, 23, 59, 59, 999);
      params.newDate = startDate;

      day = {
        index,
        name: this.getDate(startDate),
      };
    } else {
      const date = newDate.getDate() + 1;

      const current = new Date(year, month, date, 23, 59, 59, 999);
      params.newDate = current;

      day = {
        index,
        name: this.getDate(current),
      };
    }

    showedPeriod.push(day);
  }
}

export default AnalyticsParams;
