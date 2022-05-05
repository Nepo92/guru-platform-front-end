import Numbers from './numbers/numbers.js';

const numbers = new Numbers();

/* eslint-disable */


class Utils {
  isDealPage() {
    const page = this.getPage();

    const dealPage = [
      'deals',
      'clients-list',
      'performance-assessment',
      'bills',
      'head-manager-bills',
      'rating',
      'transactions',
      'head-manager-transactions',
      'homework',
    ];

    return dealPage.includes(page);
  }

  getDealType(deal) {
    const isTraffic = deal.type === 'Трафик' ? 'traffic' : false;
    const isAdditional = deal.type === 'Допродажа' ? 'additional' : false;

    return isTraffic || isAdditional || deal.type; 
  }

  isReminderBtn(t) {
    if (!t) return false;

    const reminderWrapper = this.getParent(t, 'reminder__wrapper');

    return (reminderWrapper && reminderWrapper.hasAttribute('data-deal-reminder')) || t.hasAttribute('data-deal-reminder');
  }

  setOptionToSelectStatus(selectBody, elem) {
    const option = document.createElement('div');
    option.classList.add('select__option');
    option.classList.add('select__option--status');
    option.setAttribute('value', elem.id);
    option.setAttribute('data-code', elem.code);
    option.innerText = elem.title;

    selectBody.appendChild(option);
  }

  getUrlData(props) {
    const { pack } = props;
    const { form } = pack;

    const { formCode } = form;
    const { id } = form;
    const baseUrl = window.location.href.split('/')[2];

    let idStream;

    const select = document.querySelector('[form-date]');

    if (form.streams.length !== 1 && select) {
      idStream = +select.value;
    } else {
      idStream = form.streams[0]?.id;
    }

    return [formCode, baseUrl, idStream, id];
  }

  contractsToArray(contracts) {
    const contractsItems = Object.values(contracts);

    const constractsData = [];

    contractsItems.forEach((item) => {
      item.forEach((el) => {
        constractsData.push(el);
      });
    });

    return constractsData;
  }

  checkSertificate(baseUrl) {
    return baseUrl.split(':')[0] === 'localhost' ? 'http' : 'https';
  }

  copied(prop) {
    const target = {};

    for (let key in prop) {
      target[key] = prop[key];
    }
  }

  checkObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value) && !value.tagName && !value.__proto__.init && typeof value !== 'function';
  }

  getDeepCopy(data) {
    const isObject = this.checkObject(data);
    const isArray = Array.isArray(data);

    let target = isObject ? {} : [];

    if (isObject) {
      for (let key in data) {
        const value = data[key];

        const isValueObj = this.checkObject(value);
        const isArrayObj = Array.isArray(value);

        let mutable = isValueObj || isArrayObj;

        if (mutable) {
          target[key] = this.getDeepCopy(value);
        } else {
          target[key] = value;
        }
      };
    } else if (isArray) {
      target = data.slice();
    }

    return target;
  }

  uploadImg(e) {
    const t = e.target;

    const input = t;

    const label = input.nextElementSibling;
    const labelVal = label.innerText;

    let fileName = '';

    if (t.value) {
      fileName = t.value.split('\\').pop();
    }

    if (fileName) {
      label.classList.add('has-file')
      label.querySelector('.js-fileName')
      label.innerText = fileName;
    } else {
      label.classList.remove('has-file')
      label.innerText = labelVal;
    }
  }

  getActiveMenu() {
    const dealMenu = document.querySelector('[js-menu-deal]');
    const clientMenu = document.querySelector('[js-menu-client-card]');

    const isClientCard = dealMenu.classList.contains('open');

    return isClientCard ? dealMenu : clientMenu;
  }

  getIdManager(pack) {
    const { role, manager, filter } = pack;

    const isAdmin = role === 'ROLE_ADMIN' ? filter.idManager : null;
    const isManager = (manager && manager.id !== 0) ? manager.id : null;

    return isAdmin ?? isManager;
  }

  hideLoader() {
    const loader = document.querySelector('.transition-loader');

    if (loader) {
      loader.classList.remove('show');
    }
  }

  showLoader() {
    const loader = document.querySelector('.transition-loader');

    if (loader) {
      loader.classList.add('show');
    }
  }

  getPage(param) {
    const url = window.location.href;
    const page = url.split('/');

    return !param ? this.getPageName(page, param) : page[page.length - (param + 1)];
  }

  getPageName(page) {
    const last = page.pop();

    const banned = ['#', '?'];

    /* eslint-disable-next-line */
    const exception = (isNaN(last) && banned.includes(last)) || (last.split('?').length > 1 || last.split('#').length > 1);

    /* eslint-disable-next-line */
    const needPageName = !last || !isNaN(last) || exception;

    return needPageName ? this.getPageName(page) : last;
  }

  accountNumberRequire(props, e) {
    let { menu } = props;
    const { bill, target } = props;

    menu = menu.hasAttribute('[add-bill-menu]') ? menu : document.querySelector('[add-bill-menu]');

    let t;

    if (e) {
      t = this.getSelected(e.target || e)?.innerText;
    }

    const item = e.target || e;

    const unrequired = ['Карта Сбербанка', 'PayPal Бизнес', 'LeeLoo (Юкасса)'];

    const accountNumber = menu.querySelector('[js-bill-account-number]');

    const accountItem = this.getParent(accountNumber, 'pay-info__item');

    const name = Array.from(accountItem.children)[0];

    const isRequired = unrequired.includes(t || bill.paymentMethod);

    if (!isRequired) {
      if (name.innerText.split('*').length === 1) {
        const requiredText = `${name.innerText} *`;
        name.innerText = requiredText;
        accountNumber.setAttribute('required', '')
      }
    } else {
      name.innerText = name.innerText.split('*')[0];
      accountNumber.removeAttribute('required');
    }
  }

  toggleCreateMenu(menu, t, items, props) {
    const addBillMenu = document.querySelector('[add-bill-menu]');
    const createMenu = addBillMenu.querySelector('[create-bill-menu]');
    const name = this.getParent(t, 'bills-form__item').querySelector('.bills-item__name');
    const nameText = name.innerText;

    const info = addBillMenu.querySelector('.bills-form__item--information');

    const addBillBtn = document.querySelector('[add-bill-btn]');
    const payInfo = document.querySelector('.bills-item__pay-info');
    const remains = document.querySelector('.bills-remains');
    const wrapper = this.getParent(t, 'bills-form__item');

    if (t.value) {
      createMenu.classList.add('hide');
      info.classList.remove('hide');
      addBillBtn.classList.add('hide');
      payInfo.classList.add('hide');
      remains.classList.add('hide');
      wrapper.classList.remove('mt_20');

      props.needValidateDate = false;

      if (nameText.split('*').length === 1) {
        name.innerText = `${nameText} *`;
        t.setAttribute('required', '');
      }

      items.forEach((item) => {
        item.removeAttribute('required');
      });

    } else {
      createMenu.classList.remove('hide');
      createMenu.classList.remove('mt_0');
      info.classList.add('hide');
      addBillBtn.classList.remove('hide');
      payInfo.classList.remove('hide');
      remains.classList.remove('hide');
      wrapper.classList.add('mt_20');

      t.removeAttribute('required');

      props.needValidateDate = true;

      if (nameText.split('*').length > 1) {
        [name.innerText] = nameText.split('*');
      }

      items.forEach((item) => {
        item.setAttribute('required', '');
      });
    }
  }

  getDateFormatDDMMYYYY(date, spliter = '.') {
    if (!date || date === 'Выберите дату старта') return false;

    const dateArr = date.split('.').length > 1 ? date.split('.') : date.split('-');

    const badDayFormat = (dateArr[0] < 10 && dateArr[0].length < 2) ? 'bad-day' : '';
    const isNotDay = dateArr[0].length > 2 ? 'bad-day' : '';

    const badDay = isNotDay || badDayFormat;

    const badMonth = dateArr[1] < 10 && dateArr[1].length === 1 ? 'bad-month' : '';

    const badYear = (dateArr && dateArr[2].length !== 4 && dateArr[0].length === 2) ? 'bad-year' : '';

    const formattedDate = badDay || badMonth || badYear || 'default';

    switch (formattedDate) {
      case 'bad-year': {
        const yearFormat = `${dateArr[2]}`;

        const dateFormat = `${dateArr[0]}${spliter}${dateArr[1]}${spliter}${yearFormat}`;

        return dateFormat;
      }
      case 'bad-month': {
        const months = `0${dateArr[1]}`;
        const dateFormat = `${dateArr[0]}${spliter}${months}${spliter}${dateArr[2]}`;

        return dateFormat;
      }
      case 'bad-day': {
        let dateFormat;

        if (dateArr[0].length !== 4) {
          let day = (dateArr[0] < 10 && dateArr[0].length < 2) ? `0${dateArr[0]}` : dateArr[0];

          const dateFormat = `${day}${spliter}${dateArr[1]}${spliter}${dateArr[2]}`;
        } else {
          let day = (dateArr[2] < 10 && dateArr[2].length < 2) ? `0${dateArr[2]}` : dateArr[2];

          dateFormat = `${day}${spliter}${dateArr[1]}${spliter}${dateArr[0]}`;
        }

        return dateFormat;
      }
      default: {
        return `${dateArr[0]}${spliter}${dateArr[1]}${spliter}${dateArr[2]}`;;
      }
    }
  }

  getSymboRoubles(key, value, withoutNull = false) {
    const roubles = ['totalRevenue', 'trafficRevenue', 'additionalRevenue', 'advExpenses', 'average', 'averageTrafficMailing', 'averageAdditional', 'profit', 'revenue', 'averageAdditionalPage', 'revenueTraffic', 'advExpensesTrafficPage', , 'averageCheck', 'clickPrice', 'applicationPrice', 'importantPriceRow', 'invoicePrice', 'clientPriceDo', 'clientPrice', 'showPrice', 'averageCheckTraffic'];

    const percent = ['shareAdvExpensesTrafficPage', 'CV5Row', 'clickToApplicationDo', 'applicationToClient', 'invoiceToClient', 'applicationToInvoice', 'clickToApplicatio', 'showToClick', 'prescribedToSale', 'clickToApplication'];

    return !withoutNull ? roubles.includes(key) ? value === null ? `0 ₽` : `${numbers.setWhiteSpace(value)} ₽` : percent.includes(key) ? value === null ? `0 %` : `${numbers.setWhiteSpace(value)} %` : value === null ? 0 : numbers.setWhiteSpace(value) :
      roubles.includes(key) ? (value === null || value === 0) ? '' : `${numbers.setWhiteSpace(value)} ₽` : percent.includes(key) ? (value === null || value === 0) ? '' : `${numbers.setWhiteSpace(value)} %` : (value === null || value === 0) ? '' : numbers.setWhiteSpace(value);
  }

  setWhiteSpace(value) {
    if (value === null || value === 0) return value;

    const strArr = String(value).split('');

    return this.setWhiteSpaceInNumber(strArr, '');
  }

  setWhiteSpaceInNumber(array, result) {
    const digit = array.splice(-3);

    result = digit.join('') + ' ' + result;

    if (array.length) {
      return this.setWhiteSpaceInNumber(array, result);
    } else {
      return result;
    }
  }

  changeDealStatuses(statuses) {
    const status = statuses.concat();
    const unknow = status.splice(status.length - 1, status.length - 1)[0];
    const startArr = status.splice(0, 4);

    startArr.push(unknow);

    status.forEach((item) => {
      startArr.push(item);
    });

    return startArr;
  }

  openModalAnimation(modal, isOverflowed) {
    modal.classList.add('open');
    modal.classList.add('black');

    setTimeout(() => {
      modal.style.opacity = '1';
    }, 100);

    const filter = modal.querySelector('.filter__wrapper');

    if (filter) {
      setTimeout(() => {
        filter.style.top = '0';
      }, 100);
    } else {
      setTimeout(() => {
        const modalWindow = modal.querySelector('.platform-modal__wrapper');
        modalWindow.style.right = '0';
      }, 0);

      setTimeout(() => {
        const modalContent = modal.querySelector('.platform-modal__content');

        if (modalContent) {
          modalContent.style.right = '0';
        }
      }, 0);
    }

    this.setOverflow(isOverflowed);
  }

  closeModalAnimation(modal, wrapper, isFilter, isOverflowed = null) {
    if (isFilter) {
      this.closeFilter(modal, wrapper);
    } else {
      this.closeMenu(modal, wrapper);
    }

    this.setOverflow(isOverflowed);
  }

  closeFilter(modal, wrapper) {
    wrapper.style.top = '-150%';

    setTimeout(() => {
      modal.style.opacity = '0';
    }, 200);

    setTimeout(() => {
      modal.classList.remove('open');
    }, 400);
  }

  closeMenu(modal, wrapper) {
    wrapper.style.right = '-100%';
    const content = wrapper.querySelector('.platform-modal__content');

    if (content) {
      content.style.right = '-100%';
    }

    setTimeout(() => {
      modal.style.opacity = '0';
    }, 500);

    setTimeout(() => {
      modal.classList.remove('open');
    }, 700);
  }

  setOverflow(isOverflowed) {
    if (isOverflowed) {
      document.body.style.overflow = 'hidden';
    } else if (!isOverflowed && isOverflowed !== null) {
      document.body.style.overflow = 'auto';
    }
  }

  setCloneElement(item) {
    const itemClone = item.cloneNode(true);

    const haveSibling = item.nextElementSibling;

    const insert = this.insertBeforeElement.bind(this, item, itemClone);
    const append = this.appendChildElement.bind(this, item, itemClone);

    return haveSibling ? insert() : append();
  }

  cloneElement(item) {
    const itemClone = item.cloneNode(true);

    return itemClone;
  }

  insertBeforeElement(item, itemClone) {
    item.parentNode.insertBefore(itemClone, item.nextElementSibling);
    item.remove();

    return itemClone;
  }

  appendChildElement(item, itemClone) {
    item.parentNode.appendChild(itemClone);
    item.remove();

    return itemClone;
  }

  getParent(element, cls) {
    while ((element = element.parentElement) && !element.classList.contains(cls));

    return element;
  }

  copyLink(value) {
    const body = document.querySelector('body');
    const tmp = this.setTextArea();

    tmp.innerHTML = value;

    body.appendChild(tmp);

    document.querySelector('.tmp').select();
    document.execCommand('copy');
    tmp.remove();
  }

  setTextArea() {
    const tmp = document.createElement('textarea');
    tmp.classList.add('tmp');

    return tmp;
  }

  getCssProperty(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(`${property}`);
  }

  removeChildren(item, index) {
    if (index || index === 0) {
      Array.from(item.children).forEach((elem, count) => {
        if (count !== index) {
          elem.remove();
        }
      });
    } else if (!index) {
      Array.from(item.children).forEach((elem) => {
        elem.remove();
      });
    }
  }

  getSelected(select) {
    return Array.from(select.children).find((el) => el.selected);
  }

  findRecord(element, eventsArray) {
    for (let i = 0; i < eventsArray.length; i++) {
      const record = eventsArray[i];

      if (element == record.element) {
        return record;
      }
    }

    return false;
  }

  addListener(element, event, listener, options, eventsArray) {
    let record = this.findRecord(element, eventsArray);

    if (record) {
      record.listeners[event] = record.listeners[event] || [];
    } else {
      record = {
        element,
        listeners: {},
      };

      record.listeners[event] = [];

      eventsArray.push(record);
    }

    record.listeners[event].push(listener);
    element.addEventListener(event, listener, options);
  }

  checkListener(element, event, listener, eventsArray) {
    const record = this.findRecord(element, eventsArray);

    if (record && event in record.listeners) {
      return !!~record.listeners[event].indexOf(listener);
    }

    return false;
  }

  removeListener(element, event, listener, options, eventsArray) {
    const record = this.findRecord(element, eventsArray);

    if (record && event in record.listeners) {
      const index = record.listeners[event].indexOf(listener);

      if (~index) {
        record.listeners[event].splice(index, 1);
      }

      if (!record.listeners[event].length) {
        delete record.listeners[event];
      }
    }

    element.removeEventListener(event, listener, options);
  }

  adaptivePhotos(photos) {
    if (photos.length) {
      photos.forEach((item) => {
        this.setAdaptivePhoto(item);
      });
    } else {
      this.setAdaptivePhoto(photos);
    }
  }

  setAdaptivePhoto(item) {
    const resolution = item.naturalWidth / item.naturalHeight;

    if (resolution < 1) {
      item.style.width = '100%';
      item.style.height = 'auto';
    } else if (resolution === 1) {
      item.style.width = '100%';
      item.style.height = '100%';
    } else if (resolution > 1) {
      item.style.width = 'auto';
      item.style.height = '100%';
    }
  }

  changeItemsAccess(arr, callback, auto, interval = 10, loader = false) {
    let i = 0;
    const timer = setInterval(() => {
      if (i >= arr.length) {
        clearInterval(timer);
        if (loader) {
          this.hideLoader();
        }
      } else {
        if (arr[i]) {
          callback(arr[i], auto, arr);
        }
        i++;
      }
    }, interval);
  }

  setPreloaderToTab() {
    const span = document.createElement('span');
    span.classList.add('platform__empty');
    span.innerText = 'Загрузка...';

    return span;
  }

  blockTabs(tabPack) {
    const { menu } = tabPack;

    const tabItems = menu.querySelectorAll('.client-tab__item');

    tabItems.forEach((item) => {
      item.style.pointerEvents = 'none';
    });
  }

  unBlockTabs(tabPack) {
    const { menu } = tabPack;

    const tabItems = menu.querySelectorAll('.client-tab__item');

    tabItems.forEach((item) => {
      item.style.pointerEvents = 'all';
    });
  }

  sortingArrayTasks(array) {
    const done = array.filter((el) => el.done);
    const now = array.filter((el) => !el.done);

    const arraySorted = this.arraySorted.bind(this);

    const nowSorted = now.sort(arraySorted);

    const today = nowSorted.filter((el) => el.reminderToday);

    const notEmptyToday = today.length !== 0;

    switch (notEmptyToday) {
      case true: {
        /* Задачи не сегодня */
        const notTodayNotDone = nowSorted.filter((el) => !today.includes(el));

        /* Задачи, время которых прошло */
        const notTodayExpiration = notTodayNotDone.filter((el) => el.reminderExpiration);

        notTodayExpiration.forEach((item) => {
          today.push(item);
        });

        /* Задачи, время которых не прошло */
        const notTodayNotExpiration = notTodayNotDone.filter((el) => !el.reminderExpiration);

        notTodayNotExpiration.forEach((item) => {
          today.push(item);
        });

        const doneSorted = done.sort(arraySorted);

        doneSorted.forEach((item) => {
          today.push(item);
        });

        return today;
      }
      case false: {
        const doneSorted = done.sort(arraySorted);

        doneSorted.forEach((item) => {
          nowSorted.push(item);
        });

        return nowSorted;
      }
      default: {
        return false;
      }
    }
  }

  checkClientCardOpen() {
    return document.querySelector('[js-menu-client-card]').classList.contains('open');
  }

  arraySorted(a, b) {
    const year = `${new Date().getFullYear()}`.split('')[0] + `${new Date().getFullYear()}`.split('')[1];

    let yearResultOne;
    let monthResultOne;
    let dayResultOne;

    if (a.reminderDate) {
      yearResultOne = year + a.reminderDate.split('.')[2];

      if (a.reminderDate.split('.')[1].split('')[0] === '0') {
        monthResultOne = +a.reminderDate.split('.')[1].split('')[1];
      } else {
        monthResultOne = +a.reminderDate.split('.')[1];
      }

      if (a.reminderDate.split('.')[0].split('')[0] === '0') {
        dayResultOne = +a.reminderDate.split('.')[0].split('')[1];
      } else {
        dayResultOne = +a.reminderDate.split('.')[0];
      }
    }

    let monthResultTwo;
    let dayResultTwo;
    let yearResultTwo;

    if (b.reminderDate) {
      yearResultTwo = year + b.reminderDate.split('.')[2];

      if (b.reminderDate.split('.')[1].split('')[0] === '0') {
        monthResultTwo = +b.reminderDate.split('.')[1].split('')[1];
      } else {
        monthResultTwo = +b.reminderDate.split('.')[1];
      }

      if (b.reminderDate.split('.')[0].split('')[0] === '0') {
        dayResultTwo = +b.reminderDate.split('.')[0].split('')[1];
      } else {
        dayResultTwo = +b.reminderDate.split('.')[0];
      }
    }

    const reultOne = yearResultOne && monthResultOne && dayResultOne;
    const resultTwo = yearResultTwo && monthResultTwo && dayResultTwo;

    const result = reultOne && resultTwo;

    const resultValues = [
      yearResultOne,
      monthResultOne,
      dayResultOne,
      yearResultTwo,
      monthResultTwo,
      dayResultTwo,
    ];

    const getDifferenceDate = this.getDifferenceDate.bind(this);

    return result ? getDifferenceDate(resultValues) : false;
  }

  compareDates(one, two) {
    const oneFormatted = this.getDateFormatDDMMYYYY(one);
    const twoFormatted = this.getDateFormatDDMMYYYY(two);

    const oneArr = oneFormatted.split('.').length > 1 ? oneFormatted.split('.') : oneFormatted.split('-');
    const twoArr = twoFormatted.split('.').length > 1 ? twoFormatted.split('.') : twoFormatted.split('-');

    const oneDate = new Date(+oneArr[2], oneArr[1] - 1, +oneArr[0]);
    const twoDate = new Date(+twoArr[2], twoArr[1] - 1, +twoArr[0]);

    return oneDate - twoDate >= 0;
  }

  sortBills(one, two) {
    const first = new Date('20' + one.plannedPayDate?.split('.')[2], one.plannedPayDate?.split('.')[1], one.plannedPayDate?.split('.')[0]);
    const second = new Date('20' + two.plannedPayDate?.split('.')[2], two.plannedPayDate?.split('.')[1], two.plannedPayDate?.split('.')[0]);

    return first - second;
  }

  getDifferenceDate(resultValues) {
    const [
      yearResultOne,
      monthResultOne,
      dayResultOne,
      yearResultTwo,
      monthResultTwo,
      dayResultTwo] = resultValues;

    const dateOne = new Date(+yearResultOne, monthResultOne - 1, dayResultOne);
    const dateTwo = new Date(+yearResultTwo, monthResultTwo - 1, dayResultTwo);

    return dateOne.getTime() - dateTwo.getTime();
  }

  isFunnelPage() {
    const page = this.getPage();

    const funnelPage = [
      'funnels',
    ];

    return funnelPage.includes(page);
  }

  today() {
    const day = String(new Date().getDate());

    let dayFormatted;

    if (day.length === 1) {
      dayFormatted = 0 + day;
    } else {
      dayFormatted = day;
    }

    const month = String(new Date().getMonth() + 1);

    let monthFormatted;

    if (month.length === 1) {
      monthFormatted = 0 + month;
    } else {
      monthFormatted = month;
    }

    const year = String(new Date().getFullYear());

    return `${dayFormatted}.${monthFormatted}.${year}`;
  }

  dateParse(date) {
    const dateArr = date.split('-').length > 1 ? date.split('-') : date.split('.');

    const day = +dateArr[0];
    const month = +dateArr[1];
    const year = +dateArr[2];

    return new Date(year, month - 1, day);
  }

  getMonths() {
    return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  }

  declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
  }

  getBlockName(key) {
    const names = [
      { totalRevenue: 'blockProceed' },
      { advExpenses: 'blockAdvertisingExpenses' },
      { profit: 'blockProceedAdvertisingExpenses' },
      { shareAdvExpensesTrafficPage: 'blockPercentNetProceed' },
      { kpd: 'blockKPD' },
      { advShow: 'blockShows' },
      { advClick: 'blockClicks' },
      { advApplication: 'blockApplications' },
      { importantRow: 'blockAveragePrepayment' },
      { invoices: 'blockBills' },
      { salesNewClient: 'blockSales' },
      { salesNewClientNM: 'blockSalesWithoutSales' },
      { salesNewClientM: 'blockSalesWithSales' },
      { rejectsRow: 'blockSurcharges' },
      { newClientsDo: 'blockClientsDO' },
      { newClientsTraffic: 'blockClientsTraffic' },
      { newClientsAll: 'blockSalesDo' },
      { newClientsWithoutMailing: 'blockSalesDoWithoutMailing' },
      { newClientsWithMailing: 'blockSalesDoWithMailing' },
      { averageCheckTraffic: 'blockAverage' },
      { showPrice: 'blockPriceShows' },
      { clickPrice: 'blockPriceClick' },
      { applicationPrice: 'blockPriceApplication' },
      { importantPriceRow: 'blockAverageSurcharge' },
      { invoicePrice: 'blockPriceBill' },
      { clientPrice: 'blockClient' },
      { clientPriceDo: 'blockClientDO' },
      { showToClick: 'blockShowToClick' },
      { invoiceToClient: 'blockBillToClient' },
      { clickToApplication: 'blockClickToApplication' },
      { applicationToInvoice: 'blockApplicationToBill' },
      { applicationToInvoice: 'blockBillToClient' },
      { applicationToClient: 'blockApplicationToClient' },
      { clickToApplicationDo: 'blockPrepaymentProceed' },
      { CV5Row: 'blockApplicationToClientDO' },
    ];

    const current = names.find((el) => Object.entries(el)[0][0] === key);

    return current ? Object.values(current)[0] : null;
  }

  sumBills(bill) {
    const billsItems = document.querySelectorAll('.bill__item');

    const bills = Array.from(billsItems).filter((el) => !el.classList.contains('bill__create') && el.getAttribute('data-bill') > 0 && (bill ? (+el.getAttribute('data-bill') !== bill.id) : true));

    let sumBills = 0;

    if (bills.length) {
      bills.forEach((item) => {
        sumBills += parseInt(item.querySelector('.price__value').innerText, 10);
      });
    }

    return sumBills;
  }

  setBillTemplates(templatesItem, item) {
    const option = document.createElement('option');
    option.value = item.id;
    option.innerText = item.name;

    templatesItem.appendChild(option);
  }
}

export default Utils;
