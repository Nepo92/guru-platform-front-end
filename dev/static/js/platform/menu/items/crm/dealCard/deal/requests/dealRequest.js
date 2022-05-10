import ValidateDeal from '../../../../../../utils/validation/deal/validateDeal.js';
import Utils from '../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../api/api.js';
import Validation from '../../../../../../utils/validation.js';
import RerenderDealRow from '../../events/status/events/RerenderDealRow.js';

const utils = new Utils();
const validateDeal = new ValidateDeal();
const validation = new Validation();
const rerenderDealRow = new RerenderDealRow();

const TRANSACTIONS = 'transactions';
const HEAD_MANAGER_TRANSACTIONS = 'head-manager-transactions';

class DealRequest {
  updateDeal(dealPack, e) {
    const { idClient, deal } = dealPack;

    const menu = document.querySelector('[js-menu-deal]');

    const form = menu.querySelector('[js-deal-form]');

    if (validateDeal.init(form)) {
      const data = this.getUpdateData(dealPack);

      const update = dealAPI.updateDeal(data);

      const showLoader = setTimeout(utils.showLoader, 400);

      update.then((courseData) => {
        utils.hideLoader();
        clearTimeout(showLoader);

        const t = e.target;
        t.disabled = true;

        const getDeals = dealAPI.getDeals(idClient || deal.idClient);

        getDeals.then((deals) => {
          const dealTabObserver = dealPack.dealTabObs;
          const { tabsObs } = dealPack;
          dealPack.deal = courseData;

          this.#updateDealInProps(dealPack, courseData);

          dealPack.deals = this.sortingDeals(deals);
          dealPack.isCreate = false;

          const items = [tabsObs, rerenderDealRow];

          if (dealTabObserver) {
            items.push(dealTabObserver);
          }

          items.forEach((item) => {
            const init = item.init.bind(item);
            init(dealPack);
          });
        });
      });
    }
  }

  #updateDealInProps(dealPack, courseData) {
    if (dealPack.pack.items) {
      dealPack.pack.items = dealPack.pack.items.map((el) => {
        if (el.id === courseData.id) {
          el = courseData;
        }

        return el;
      });
    } else if (dealPack.deals) {
      dealPack.deals = dealPack.deals.map((el) => {
        if (el.id === courseData.id) {
          el = courseData;
        }

        return el;
      });
    }
  }

  getUpdateData(updateProps) {
    const {
      deal,
      menu,
      pack,
      idClient,
    } = updateProps;

    const idDeal = deal.id || deal;
    const status = +menu.querySelector('[data-select-type="select-status"] [id-selected]').value;
    const social = +menu.querySelector('[data-select-type="select-social"] [id-selected]').value;
    const dateRequest = menu.querySelector('[date-request]').value;
    const dealType = menu.querySelector('[data-select-type="select-deal-type"] [id-selected]').value;
    const funnel = menu.querySelector('[data-select-type="select-funnel"] [id-selected]').value;
    const products = menu.querySelector('[data-select-type="select-product"] [id-selected]').value;
    const tariff = menu.querySelector('[data-select-type="select-tariff"] [id-selected]').value;
    const streams = menu.querySelector('[data-select-type="select-stream"] [id-selected]').value;
    const price = menu.querySelector('[price-item] [price]').value;
    const tag = menu.querySelector('[tag]').value;
    const comment = menu.querySelector('[comment]').value;
    const isAdmin = pack.role === 'ROLE_ADMIN' ? pack.filter.idManager : null;
    const isManager = pack?.manager?.id;
    const idManager = isAdmin || isManager;

    const product = Array.from(menu.querySelector('[data-select-type="select-product"] [select-body]').children).find((el) => el.getAttribute('value') === products);

    const courseValue = product.getAttribute('data-title');
    const productTypeValue = product.getAttribute('data-type');
    const saleTypeValue = product.getAttribute('data-type');

    const course = courseValue || deal.course;
    const productType = productTypeValue || deal.product;
    const saleType = saleTypeValue || deal.saleType;

    const additionalValue = ['Допродажа', 'База', 'additional', 'допродажа', 'база'];

    const type = (additionalValue.includes(dealType)) ? 'additional' : 'traffic';

    return {
      id: idDeal || null,
      idManager,
      idClient,
      status,
      dealDate: dateRequest,
      createDate: pack.today,
      saleType,
      idFunnel: +funnel,
      idProduct: products,
      idTariff: tariff || null,
      idStream: streams,
      price: price !== 'undefined' ? price : 0,
      tag,
      comment,
      course,
      social,
      type,
      product: productType || '',
    };
  }

  saveNewDeal(dealPack, e) {
    const {
      menu,
      idClient,
      client,
      tabsObs,
    } = dealPack;

    const form = menu.querySelector('[js-deal-form]');

    if (validateDeal.init(form)) {
      const showLoader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      const data = this.getSaveDealData(dealPack);

      const save = dealAPI.createDeal(data);

      save.then((deal) => {
        utils.hideLoader();
        clearTimeout(showLoader);

        const t = e.target;
        t.disabled = true;
        dealPack.deal = data;
        this.setTabSettings(dealPack, deal);

        dealPack.isView = false;

        const getDeals = dealAPI.getDeals(idClient || client.id);

        getDeals.then((deals) => {
          const dealTabObserver = dealPack.dealTabObs;
          dealPack.deals = this.sortingDeals(deals);

          dealPack.deal = dealPack.deals.find((el) => el.id === deal);

          tabsObs.init(dealPack);

          const items = [dealTabObserver];

          items.forEach((item) => {
            const init = item.init.bind(item);
            init(dealPack);
          });

          const access = [TRANSACTIONS, HEAD_MANAGER_TRANSACTIONS];

          if (access.includes(utils.getPage())) {
            const editNewDeal = this.editNewDeal.bind(this, deal);
            dealPack.pack.items = dealPack.pack.items.map(editNewDeal);
            dealPack.deal.clientColor = { ...dealPack.client.clientColor };

            dealPack.pack.items = [...dealPack.pack.items.map((item) => {
              if (item.id === dealPack.deal.id) {
                item.clientColor = { ...dealPack.client.clientColor };
              }

              return item;
            })];

            dealPack.rerenderContent.init(dealPack).then(() => {
              dealPack.clientCardObs.init(dealPack);
              dealPack.rowEventsObs.init(dealPack);
            });
          }

          this.changeMenuMode(dealPack);
        });
      });
    }
  }

  editNewDeal(deal, el) {
    if (el.id === deal) {
      const link = document.querySelector('[client-vk]').value.trim();

      /* eslint-disable-next-line */
      el.clientLink = link ? link.split('https://').length > 1 ? link : link.split('http://').length > 1 ? link : `https://${link}` : null;
      el.clientName = document.querySelector('[js-client-name]').innerText.trim();
      el.clientPhone = document.querySelector('[client-phone]').value.trim();
      el.clientTelegram = document.querySelector('[client-telegram]').value.trim();

      const socialOptions = Array.from(document.querySelectorAll('[js-menu-deal] [data-select-type="select-social"] .select__option'));

      el.socialCode = socialOptions.find((it) => +it.getAttribute('value') === el.status)?.getAttribute('data-code');

      const streamOptions = Array.from(document.querySelectorAll('[data-select-type="select-stream"] .select__option'));

      el.startDate = streamOptions.find((it) => it.getAttribute('value') === el.idStream).innerHTML.trim();
      el.statusChanges = [];

      const statusOptions = Array.from(document.querySelectorAll('[js-menu-deal] [data-select-type="select-status"] .select__option'));

      el.statusCode = statusOptions.find((it) => +it.getAttribute('value') === el.status)?.getAttribute('data-code');
      el.statusName = statusOptions.find((it) => +it.getAttribute('value') === el.status)?.innerText.trim();
      el.managerName = document.querySelector('[js-menu-client-card] [who-create]').innerText.trim();

      if (el.isHidden === undefined) {
        el.isHidden = false;
      }
    }

    return el;
  }

  getSaveDealData(dealPack) {
    const {
      menu,
      pack,
      idClient,
      client,
    } = dealPack;

    const statusValue = +menu.querySelector('[data-select-type="select-status"] [id-selected]').value;
    const socialValue = +menu.querySelector('[data-select-type="select-social"] [id-selected]').value;
    const dateRequestValue = menu.querySelector('[date-request]').value;
    const dealTypeValue = menu.querySelector('[data-select-type="select-deal-type"] [id-selected]').value;
    const funnelValue = menu.querySelector('[data-select-type="select-funnel"] [id-selected]').value;
    const productsValue = menu.querySelector('[data-select-type="select-product"] [id-selected]').value;
    const tariffValue = menu.querySelector('[data-select-type="select-tariff"] [id-selected]').value;
    const streamsValue = menu.querySelector('[data-select-type="select-stream"] [id-selected]').value;
    const priceValue = menu.querySelector('[price-item] [price]').value;
    const tagValue = menu.querySelector('[tag]').value;
    const commentValue = menu.querySelector('[comment]').value;

    const isAdmin = pack.role === 'ROLE_ADMIN' ? pack.filter.idManager : null;
    const isManager = pack.manager?.id;

    const idManager = isAdmin || isManager;

    const productSelected = Array.from(menu.querySelector('[data-select-type="select-product"] [select-body]').children).find((el) => el.getAttribute('value') === productsValue);

    const course = productSelected.getAttribute('data-title');
    const productType = productSelected.getAttribute('data-type');
    const saleType = productSelected.getAttribute('data-type');

    const additionalValue = ['Допродажа', 'База', 'additional', 'допродажа', 'база'];

    const type = (additionalValue.includes(dealTypeValue)) ? 'additional' : 'traffic';

    return {
      idManager,
      idClient: idClient || client.id,
      status: statusValue,
      dealDate: dateRequestValue,
      createDate: pack.today,
      saleType: saleType || null,
      idFunnel: funnelValue,
      idProduct: +productsValue,
      idTariff: tariffValue || null,
      idStream: streamsValue,
      price: priceValue || 0,
      tag: tagValue,
      comment: commentValue,
      course,
      social: socialValue,
      type,
      product: productType || '',
    };
  }

  changeMenuMode(dealPack) {
    const { menu } = dealPack;

    const menuTitle = menu.querySelector('[client-name]');
    menuTitle.innerText = 'Редактировать сделку';

    const updateBtn = menu.querySelector('[edit-deal]');

    if (updateBtn) {
      const update = utils.setCloneElement(updateBtn);
      const dealRequestUpdate = this.updateDeal.bind(this, dealPack);

      update.addEventListener('click', dealRequestUpdate);

      const toValidationError = validation.toValidationError.bind(validation);
      update.addEventListener('dblclick', toValidationError);
    }
  }

  sortingDeals(deals) {
    return deals.sort((a, b) => b.id - a.id);
  }

  setTabSettings(dealPack, deal) {
    dealPack.isCreate = true;
    dealPack.activeTab = 'Счета и платежи';
    dealPack.defaultTab = 'Счета и платежи';
    dealPack.deal.id = deal;
    dealPack.deal.reminders = [];

    if (dealPack.pack.items) {
      dealPack.pack.items.push(dealPack.deal);
    } else {
      dealPack.pack.items = [];
      dealPack.pack.items.push(dealPack.deal);
    }
  }
}

export default DealRequest;
