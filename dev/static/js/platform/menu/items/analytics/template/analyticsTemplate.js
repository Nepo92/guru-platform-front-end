import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class AnalyticsTemplate {
  analyticsBoard(props) {
    const { pack } = props;
    const { analytics, filter } = pack;
    const { company, period, colors } = analytics;
    const { general, months } = company;

    const properties = this.getPeriodItemsEmpty(general, period, months, 'properties', colors, filter);

    return `
      <div class="analytic-board__header left">
        <div class="analytic-board__name search-icon">
          <input type="text" class="platform__input analytic__metric-search" placeholder="Метрики">
        </div>
        <div class="analytic__column total total-header">Итого</div>
      </div>
      ${properties.join('')}
    `;
  }

  getName(item) {
    const banned = ['kpdColor', 'ratingColor'];

    const page = utils.getPage();

    if (banned.includes(item)) return false;

    const items = [
      {
        eng: 'totalRevenue',
        rus: 'Выручка общая',
      },
      {
        eng: 'trafficRevenue',
        rus: 'Выручка с трафика',
      },
      {
        eng: 'additionalRevenue',
        rus: `${page === 'additional' ? 'Выручка' : 'Выручка с базы'}`,
      },
      {
        eng: 'advExpenses',
        rus: 'Расходы на рекламу',
      },
      {
        eng: 'shareAdvExpensesTrafficPage',
        rus: '% ДРР (доля рекламных расходов)',
      },
      {
        eng: 'kpd',
        rus: 'КПД',
      },
      {
        eng: 'sales',
        rus: 'Продажи всего',
      },
      {
        eng: 'salesTraffic',
        rus: 'Продажи трафик',
      },
      {
        eng: 'salesMailing',
        rus: 'Продажи рассылка',
      },
      {
        eng: 'salesAdditional',
        rus: `${page === 'additional' ? 'Продажи' : 'Продажи база'}`,
      },
      {
        eng: 'rejectsRow',
        rus: `${page === 'funnel' ? 'Отказы' : 'Отказов'}`,
      },
      {
        eng: 'average',
        rus: 'Средний чек',
      },
      {
        eng: 'averageTrafficMailing',
        rus: 'Средний чек трафик',
      },
      {
        eng: 'averageAdditional',
        rus: `${page === 'additional' ? 'Средний чек' : 'Средний чек база'}`,
      },
      {
        eng: 'profit',
        rus: 'Выручка общая - Расходы на рекламу',
      },
      {
        eng: 'rating',
        rus: 'Рейтинг',
      },
      {
        eng: 'CV5Row',
        rus: 'CV из целевой заявки в оплату по ДО',
      },
      {
        eng: 'clickToApplicationDo',
        rus: 'CV4 из заявки в оплату по ДО',
      },
      {
        eng: 'applicationToClient',
        rus: 'CV4 из заявки в оплату',
      },
      {
        eng: 'invoiceToClient',
        rus: 'CV3 из заказа в оплату',
      },
      {
        eng: 'applicationToInvoice',
        rus: 'CV2 из заявки в заказ',
      },
      {
        eng: 'clickToApplication',
        rus: 'CV1 из клика в заявку',
      },
      {
        eng: 'showToClick',
        rus: 'CV из показа в клик',
      },
      {
        eng: 'clientPriceDo',
        rus: 'Стоимость клиента по ДО',
      },
      {
        eng: 'clientPrice',
        rus: 'Стоимость клиента',
      },
      {
        eng: 'invoicePrice',
        rus: 'Стоимость заказа',
      },
      {
        eng: 'importantPriceRow',
        rus: 'Стоимость целевой заявки',
      },
      {
        eng: 'applicationPrice',
        rus: 'Стоимость заявки',
      },
      {
        eng: 'clickPrice',
        rus: 'Стоимость клика',
      },
      {
        eng: 'showPrice',
        rus: 'Стоимость 1000 показов',
      },
      {
        eng: 'averageCheckTraffic',
        rus: 'Средний чек',
      },
      {
        eng: 'newClientsWithMailing',
        rus: 'Дотекло клиентов по ДО (по рассылке)',
      },
      {
        eng: 'newClientsWithoutMailing',
        rus: 'Дотекло клиентов по ДО (без рассылки)',
      },
      {
        eng: 'newClientsAll',
        rus: 'Дотекло клиентов по ДО',
      },
      {
        eng: 'newClientsTraffic',
        rus: 'Новых клиентов с трафика за период',
      },
      {
        eng: 'newClientsDo',
        rus: 'Новых клиентов по ДО',
      },
      {
        eng: 'rejectsRow',
        rus: 'Отказов',
      },
      {
        eng: 'salesNewClientM',
        rus: 'Продаж c рассылки',
      },
      {
        eng: 'salesNewClientNM',
        rus: 'Продаж без рассылки',
      },
      {
        eng: 'salesNewClient',
        rus: 'Продаж',
      },
      {
        eng: 'invoices',
        rus: 'Заказов',
      },
      {
        eng: 'importantRow',
        rus: 'Целевых заявок',
      },
      {
        eng: 'advApplication',
        rus: 'Заявок',
      },
      {
        eng: 'advClick',
        rus: 'Кликов',
      },
      {
        eng: 'advShow',
        rus: 'Показов',
      },
      {
        eng: 'prescribedToSale',
        rus: 'CV из прописанных людей в продажи',
      },
      {
        eng: 'prescribed',
        rus: 'Количество прописанных людей',
      },
    ];

    const current = items.find((el) => el.eng === item);

    return current.rus;
  }

  getPeriod(period, hasName) {
    const periodItems = period.map((item, index) => {
      return `
          <div class="analytic__column ${!hasName ? 'main' : ''} ${(!hasName && index === period.length - 1) ? 'br_0' : ''}">${hasName ? item.name : ''}</div>
        `;
    });

    return periodItems;
  }

  getPeriodItemsEmpty(general, period, months, settings, colors, filter) {
    const {
      greens,
      reds,
      blues,
      pink,
      purple,
      yellow,
    } = colors;

    const generalTotal = Object.entries(general);

    const properties = generalTotal.map((item) => {
      const key = item[0];
      const value = item[1];

      const name = this.getName(key);
      const total = key === 'rating' ? utils.getSymboRoubles(key, value !== null ? value.toFixed(2) : value) : utils.getSymboRoubles(key, value);

      // eslint-disable-next-line
      const color = greens.includes(key) ? 'green' : reds.includes(key) ? 'red' : blues.includes(key) ? 'blue' : pink.includes(key) ? 'pink' : purple.includes(key) ? 'purple' : yellow.includes(key) ? 'yellow-column' : '';

      const blockName = utils.getBlockName(key, filter);

      const noBlock = this.noBlock(filter, key, name, total, settings, value, blockName);

      return filter.visableSetting[blockName] && key ? `
        <div class="analytic__row main ${key}" total-row ${settings === 'managers' ? `data-id=${value.id}` : ''}>
          <div class="analytic__toggle-wrapper"><span class="analytic__toggle"></span></div>
          <div class="analytic-board__name metric-icon">
            ${name}
          </div>
          <div class="analytic__column total">${total || 0}</div>
        </div>
      ` : noBlock;
    });

    return properties;
  }

  noBlock(filter, key, name, total, settings, value, blockName) {
    return (filter.visableSetting[blockName] == null || filter.visableSetting[blockName] === undefined) && key ? `
    <div class="analytic__row main ${key}" total-row ${settings === 'managers' ? `data-id=${value.id}` : ''}>
      <div class="analytic__toggle-wrapper"><span class="analytic__toggle"></span></div>
      <div class="analytic-board__name metric-icon">
        ${name}
      </div>
      <div class="analytic__column total">${total || 0}</div>
    </div>
  ` : '';
  }

  getManagerRow(elem) {
    const manager = elem[1];

    return `<div class="analytic-board__name analytic-board__manager-name">${manager.name}</div>`;
  }
}

export default AnalyticsTemplate;
