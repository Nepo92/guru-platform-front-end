import Utils from '../../../../../utils/utils.js';
import ClientLinkDealRow from './clientLink/clientLinkDealRow.js';

const utils = new Utils();
const clientLinkDealRow = new ClientLinkDealRow();

class DealTemplates {
  dealRow(renderData) {
    const { deal } = renderData;

    const [snIcon, telegramIcon] = clientLinkDealRow.init(deal);

    let tasks;
    let pendingTask;

    if (deal.reminders.length) {
      pendingTask = deal.reminders.filter((el) => !el.done);

      if (pendingTask) {
        tasks = this.taskInTooltip(pendingTask);
      }
    }

    const statusName = this.getStatusName(deal);
    const stream = this.#getStreamValue(deal);

    const color = this.#getClientColor(deal);

    const firstLetterClientName = deal.clientName ? deal.clientName[0].toUpperCase() : '';

    return `
      <td class="platform-table__column date">
        ${deal.createDate ? utils.getDateFormatDDMMYYYY(deal.createDate) : 'Нет даты'}
      </td>
      <td class="platform-table__column client-column">
          <a js-client-card class="platform-table__row--link name" title="${deal.clientName}">
            <div class="client-column__circle" ${color}>${firstLetterClientName}</div>
            <span class="client-column__info">
              <span class="client-column__name">${deal.clientName ? deal.clientName : ''}</span>
              <span copy-phone data-phone="${deal.clientPhone}" class="client-phone">
                <span class="client-phone__value">${deal.clientPhone}</span>
                <span copy-phone data-phone="${deal.clientPhone}" class="client-phone__icon"></span>
              </span>
            </span>
          </a>
      </td>
      <td class="platform-table__column link ${snIcon && telegramIcon ? 'icons' : ''}">
        ${this.#getIconSocials(snIcon, telegramIcon) || ''}
      </td>
      <td class="platform-table__column column-manager">
        ${deal.managerAccessName
        ? `<div class="tooltip">
            <div class="tooltip__text">
              ${deal.managerAccessName}
            </div>
          </div>` : ''
      }
        <p class="column-text">${deal.managerName ? deal.managerName : '&mdash;'}</p>
      </td>
      <td class="platform-table__column course">
        <a class="platform-table__row--link course course-row" title="${deal.course ? deal.course : 'Продукт не выбран'}">
            <span title="${deal.course ? deal.course : 'Продукт не выбран'}" class="course-row__text">${deal.course ? deal.course : 'Продукт не выбран'}</span>
            <span class="course__start mt_5">
              ${stream}
            </span>
        </a>
      </td>
      <td class="platform-table__column price ${(deal.price === 0 && deal.paid === 0) ? 'center-content' : ''}">
        ${(deal.price === 0 && deal.paid === 0)
        ? 'Не выбран' : `<div class="price-info ${deal.price <= deal.paid ? 'green' : ''}">
                          <div class="price-info__left">
                            ${(deal.price <= deal.paid)
          ? `<div data-deal-paid class="column_paid">${deal.paid ? `${deal.paid} ₽` : '0 ₽'}</div>`
          : ` <div data-deal-price class="column_price">${deal.price ? deal.price : '0'}</div>
                                    <div class="column_price-del">/</div>
                                    <div data-deal-paid class="column_paid">${deal.paid ? `${deal.paid} ₽` : '0 ₽'}</div>`
        }
                          </div>
            ${+deal.status !== 1
          ? '<button js-add-bill-btn js-add-bill-up-client class="price-info__btn in-crm"></button>' : ''
        }
        </div>`
      }
      </td>
      <td class="platform-table__column status deal-status__crm" select-here deal-select-type="status-select" data-status-code="${deal.status}" data-code="${deal.statusCode}" data-status-name="${statusName}"></td>
      <td class="platform-table__column reminder">
        ${tasks && tasks.length ? `
          <div data-deal-reminder class="reminder__wrapper ${pendingTask[0].reminderExpiration ? 'reminder__past' : ''}">
            <div class="tooltip tooltip__crm">
              <table class="tooltip__table">
                <thead>
                  <tr class="tooltip__row--head">
                    <td class="tooltip__date">Дата</td>
                    <td class="tooltip__message">Задача</td>
                  </tr>
                </thead>
                <tbody>
                ${tasks.join('')}
                </tbody>
              </table>
            </div>
            <div class="reminder-count">${tasks.length}</div>
            <div class="reminder-d">${pendingTask ? pendingTask[0].reminderDate : ''}</div>
          </div>
          `
        : '<div data-deal-reminder class="reminder__add"></div>'
      }
      </td>
      <td class="platform-table__column column-hide">
        ${deal.isHidden ? '<span class="deal-card__recover--crm" js-reveal-deal-btn></span>' : '<span class="deal-card__hide" js-hide-deal-btn></span>'
      }
      </td>
    `;
  }

  #getIconSocials(sn, tg) {
    let template;

    if (sn && tg) {
      template = `
        <a class="link__circle ${sn.iconClass}" href="${sn.link}" target="_blank" rel="norefferer noopener"></a>
        <a class="link__circle ${tg.iconClass}" href="${tg.link}" target="_blank" rel="norefferer noopener"></a>
      `;
    } else if (sn) {
      template = `<a class="link__circle ${sn.iconClass}" href="${sn.link}" target="_blank" rel="norefferer noopener"></a>`;
    } else if (tg) {
      template = `<a class="link__circle ${tg.iconClass}" href="${tg.link}" target="_blank" rel="norefferer noopener"></a>`;
    }

    return template;
  }

  #getClientColor(deal) {
    const { clientColor } = deal;

    let colorStyle;

    if (clientColor) {
      const { bgColor } = clientColor;
      const { color } = clientColor;
      const { borderColor } = clientColor;

      colorStyle = `style="background-color: ${bgColor}; color: ${color}; border: 1px solid ${borderColor}"`;
    } else {
      colorStyle = 'style="background-color: #FF9E73; color: #FF7B40; border: 1px solid #FF4F00"';
    }

    return colorStyle;
  }

  getStream(deal) {
    const hasStartDate = deal.startDate ? utils.getDateFormatDDMMYYYY(deal.startDate) : '&mdash;';

    return hasStartDate;
  }

  getDealType(deal) {
    const isBase = (deal.type === 'Допродажа' || deal.type === 'additional') ? 'База' : '';
    const isTraffic = (deal.type === 'Трафик' || deal.type === 'traffic') ? 'Трафик' : '';

    return isBase || isTraffic;
  }

  #getStreamValue(deal) {
    const stream = this.getStream(deal);

    const streamValue = (stream === '&mdash;' || !stream) ? stream : utils.getDateFormatDDMMYYYY(stream);

    return streamValue;
  }

  async renderDealRows(data) {
    const { items, pack } = data;

    const dealTable = document.querySelector('.deals-table__wrapper');

    if (items) {
      pack.items = [...items];
      await this.renderRows(pack, dealTable);
    } else if (pack.items) {
      await this.renderRows(pack, dealTable);
    }
  }

  async renderRows(pack, dealTable) {
    const sortedRows = pack.items.sort((a, b) => b.id - a.id);

    const renderRows = this.getRenderDeals(sortedRows, pack);

    const acces = ['ROLE_MANAGER', 'ROLE_HEAD_MANAGER'];

    const isAdmin = (!acces.includes(pack.role) && renderRows.length) ? renderRows : false;
    const isManager = acces.includes(pack.role) ? renderRows : false;

    const arrayDeals = (isAdmin || isManager) || sortedRows;

    utils.removeChildren(dealTable, 0);

    for (let index = 0; index < arrayDeals.length; index++) {
      const deal = arrayDeals[index];

      const renderData = {
        deal,
        pack,
      };

      const tr = document.createElement('tr');
      tr.setAttribute('data-deal', deal.id);
      tr.setAttribute('data-client', deal.idClient);
      tr.classList.add('platform-table__row');
      tr.innerHTML = await this.dealRow(renderData);

      await dealTable.appendChild(tr);
    }
  }

  getRenderDeals(sortedRows, pack) {
    let renderRows;
    let sorted = sortedRows;

    const showToggle = document.querySelector('[js-filter-hidden-deals]');

    const acces = ['ROLE_MANAGER', 'ROLE_HEAD_MANAGER'];

    if (showToggle) {
      let showHidden;

      if ((showToggle.value === 'true' || showToggle.value === '') && acces.includes(pack.role)) {
        showHidden = sortedRows.filter((el) => el.isHidden === false);
      } else if (showToggle.value === 'false' && acces.includes(pack.role)) {
        showHidden = sortedRows;
      }

      if (!acces.includes(pack.role) && showToggle.value === '') {
        sorted = sortedRows.filter((el) => el.isHidden === false);
      }

      renderRows = acces.includes(pack.role) ? showHidden : sorted;
    } else {
      renderRows = sortedRows;

      if (acces.includes(pack.role)) {
        renderRows = sortedRows.filter((el) => el.isHidden === false);
      }
    }

    return renderRows;
  }

  renderDealCard(dealItem, dealPack) {
    const { pack } = dealPack;
    const { closeStatusArray } = pack;

    let pendingTask;
    let tasks;

    if (dealItem.reminders.length) {
      const sorted = utils.arraySorted.bind(utils);
      pendingTask = dealItem.reminders.filter((el) => !el.done).sort(sorted);
      tasks = this.taskInTooltip(pendingTask);
    }

    const statusHistoryChanges = this.statusHistory.bind(this);

    const { dealStatuses } = pack;

    let statusHistory;

    if (!closeStatusArray.includes(dealItem.statusCode)) {
      const indexStatus = dealStatuses.findIndex((el) => el.code === dealItem.statusCode);

      statusHistory = dealStatuses.slice(0, indexStatus).map(statusHistoryChanges).join('');
    }

    const statusName = this.getStatusName(dealItem);

    const taskStatus = this.getStatusTask(pendingTask);
    const task = this.getTask(pendingTask, tasks);
    const dealCardButton = this.getDealCardButton(dealPack, dealItem);

    const isFirstStatus = dealItem.statusChanges.length === 1;

    return `
        <div class="deal-card__inner">
            <div class="deal-card__header ${dealItem.theme === 'light' ? 'light' : ''}" style="background-color: white">
                <div class="deal-card__task deal-task">
                    <p data-deal-reminder class="deal-task__taskchecker ${taskStatus}"> 
                    ${task}
                    </p>
                </div>
                ${dealItem.backgroundImage ? `
                <div class="deal-card__img">
                  ${this.getPreloader()}
                </div>
                ` : ''}
            </div>
            <div class="deal-card__info">
                <div class="deal-card__name">
                    <div class="deal-card__title">${dealItem.course ? dealItem.course : 'Продукт не выбран'}</div>
                    <div class="deal-card__create-info">
                        <div class="deal-card__date">${dealItem.createDate ? utils.getDateFormatDDMMYYYY(dealItem.createDate) : ''}</div>
                        <div class="deal-card__author">
                            <div class="tooltip tooltip__manager--card">
                                ${dealItem.managerAccessName ? dealItem.managerAccessName : ''}
                            </div>
                            ${dealItem.managerName ? dealItem.managerName : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div class="deal-card__status deal-status">
                <input type="hidden" status-previous value="${dealItem.statusCode}">
                <div class="deal-status__text deal-select__${dealItem.statusCode}" select-here data-select-type="status-deal" data-status-code="${dealItem.status}" data-code="${dealItem.statusCode}" data-status-name="${statusName}"></div>
            </div>
            <div class="deal-card__indicator deal-indicator">
              <div class="deal-indicator__left ${isFirstStatus ? 'width_0' : ''}">${statusHistory || ''}</div>
              <div class="deal-indicator__right ${dealItem.statusCode} ${isFirstStatus ? 'width_100' : ''}"></div>
            </div>
            <div class="deal-card__price deal-price">
                <div class="deal-price__cost">
                    <div class="deal-price__name">Стоимость</div>
                    <div class="deal-price__value">${dealItem.price} &#8381;</div>
                </div>
                <div class="deal-price__received">
                    <div class="deal-price__name">Получено</div>
                    <div class="deal-price__value--black">${dealItem.paid} &#8381;</div>
                </div>
            </div> 
            <div class="deal-card__controls">
              ${dealCardButton}
            </div>
        </div>
    `;
  }

  getPreloader() {
    return `
    <?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title/><g data-name="Layer 2" id="Layer_2"><path d="M26,27H6a3,3,0,0,1-3-3V12A3,3,0,0,1,6,9h4.22l.43-1.73A3,3,0,0,1,13.56,5h4.88a3,3,0,0,1,2.91,2.27L21.78,9H26a3,3,0,0,1,3,3V24A3,3,0,0,1,26,27ZM6,11a1,1,0,0,0-1,1V24a1,1,0,0,0,1,1H26a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1H21a1,1,0,0,1-1-.76l-.62-2.49a1,1,0,0,0-1-.75H13.56a1,1,0,0,0-1,.75L12,10.24A1,1,0,0,1,11,11Z"/><path d="M16,23a5,5,0,1,1,5-5A5,5,0,0,1,16,23Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,15Z"/><path d="M24,15H23a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Z"/></g><g id="frame"><rect class="cls-1" height="32" width="32"/></g></svg>`;
  }

  getDealCardButton(dealPack, dealItem) {
    const { pack } = dealPack;
    const idManager = pack.manager ? pack.manager.id : pack.filter.idManager;

    const viewMode = pack.role === 'ROLE_EXAMINER' || (pack.role === 'ROLE_MANAGER' && idManager !== dealItem.idManager);

    const viewBtn = '<div class="deal-card__management view" js-view-course>Посмотреть сделку</div>';

    const editBtn = this.getEditBtn();
    const recoverBtn = '<div class="deal-card__recover deal-card__recover-icon" js-reveal-deal-btn>Восстановить сделку</div>';

    const clientIsNotHidden = dealItem.isHidden ? recoverBtn : editBtn;

    const notViewBtn = dealPack.client?.hidden ? viewBtn : clientIsNotHidden;

    return viewMode ? viewBtn : notViewBtn;
  }

  getEditBtn() {
    return `
        <div class="deal-card__management" js-course-card>Управление сделкой</div>
        <div class="deal-card__delete--btn deal-card__delete-icon" js-hide-deal-btn></div>`;
  }

  getStatusTask(pendingTask) {
    const hasTasks = pendingTask && pendingTask.length;

    let isNow;
    let expiration;

    if (hasTasks) {
      isNow = pendingTask[0]?.reminderToday ? 'reminder__now' : '';
      expiration = pendingTask[0]?.reminderExpiration ? 'reminder__off' : 'reminder__on';
    }

    return hasTasks ? (isNow || expiration) : '';
  }

  getTask(pendingTask, tasks) {
    return `${pendingTask?.length ? `
      <div class="tooltip tooltip__deal-card">
        <table class="tooltip__table">
          <thead>
            <tr class="tooltip__row--head">
              <td class="tooltip__date">Дата</td>
              <td class="tooltip__message">Задача</td>
            </tr>
          </thead>
          <tbody>
            ${tasks.join('')}
          </tbody>
        </table>
      </div>` : ''}`;
  }

  getStatusName(dealItem) {
    const isComplete = dealItem.statusName === 'Успешно реализована' ? 'Реализована' : '';
    const isUncomplete = dealItem.statusName === 'Закрыта не реализована' ? 'Не реализована' : '';
    const installment = dealItem.statusName === 'Рассрочка' ? 'Долями' : '';

    return isComplete || isUncomplete || installment || dealItem.statusName;
  }

  taskInTooltip(pendingsTasks) {
    const sortedArray = utils.arraySorted.bind(utils);

    return pendingsTasks.sort(sortedArray).map((item) => {
      return `
        <tr class="tooltip__row">
            <td class="tooltip__date">${item.reminderDate}</td>
            <td class="tooltip__message">${item.reminderMessage}</td>
        </tr>
        `;
    });
  }

  statusHistory(item) {
    return `<div class="deal-indicator__history ${item.code}"></div>`;
  }
}

export default DealTemplates;
