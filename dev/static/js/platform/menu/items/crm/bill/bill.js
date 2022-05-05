import BillEvents from './billEvents.js';
import Utils from '../../../../utils/utils.js';
import BillTemplates from './templates/billTemplates.js';
import { billAPI } from '../../../../api/api.js';

const billEvents = new BillEvents();
const utils = new Utils();
const templates = new BillTemplates();

class Bill {
  init(props) {
    const render = this.render(props);

    render.then(() => {
      utils.hideLoader();
      const items = [billEvents];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  async render(props) {
    const {
      menu,
      notValidBills,
      bills,
      needRemoveBillId,
    } = props;

    const sortBills = utils.sortBills.bind(utils);
    const sortedPlannedBills = bills.sort(sortBills);
    const billsPayed = sortedPlannedBills.filter((el) => el.payDate);
    const noBillsPayed = sortedPlannedBills.filter((el) => !el.payDate);

    let sortedBills = [];

    if (billsPayed) {
      sortedBills = billsPayed.sort(sortBills);

      noBillsPayed.forEach((item) => sortedBills.push(item));
    } else {
      noBillsPayed.forEach((item) => sortedBills.push(item));
    }

    const billWrapper = menu.querySelector('[js-client-bills]');

    utils.removeChildren(billWrapper);
    const renderValidBills = this.renderBills.bind(this);

    const checkAccess = this.checkAccess.bind(this);

    if (notValidBills?.length) {
      const renderNotValid = this.renderBills.bind(this);
      await renderNotValid(notValidBills, menu, props, needRemoveBillId);
      await renderValidBills(sortedBills, menu, props);
      await checkAccess(props);
    } else {
      await renderValidBills(sortedBills, menu, props);
      await checkAccess(props);
    }
  }

  async renderBills(bills, menu, props, needRemoveBillId = false) {
    const { pack } = props;

    const billWrapper = menu.querySelector('[js-client-bills]');

    if (needRemoveBillId) {
      bills = bills.filter((el) => el.id !== needRemoveBillId);
    }

    if (bills.length) {
      let counter = 0;

      for (let index = 0; index < bills.length; index++) {
        const bill = bills[index];

        props.bill = bill;
        counter -= 1;

        let apiCode;

        if (pack) {
          const { paymentMethods } = pack;
          apiCode = paymentMethods.find((el) => el.title === bill.paymentMethod)?.apiCode;

          if (apiCode > 0) {
            bill.leeLooLink = await billAPI.getLinkBill(bill.id);
            props.apiCode = apiCode;
          } else {
            props.apiCode = 0;
          }
        }

        const div = document.createElement('div');
        div.classList.add('bill__item');

        if (bill.payDate || bill.billImage || bill.comment) {
          div.classList.add('payd');
        }

        if (bill.id === 0 || bill.id < 0) {
          div.classList.add('bill-error__border');
          bill.id = counter;
        }

        div.setAttribute('data-deal', bill.idDeal);
        div.setAttribute('data-bill', bill.id);
        div.setAttribute('data-client', props.idClient);
        props.bills = bills;

        div.innerHTML = await templates.renderBill(props);

        if (!menu.hasAttribute('js-menu-client-card')) {
          const createBtn = menu.querySelector('.bill__create');

          await billWrapper.insertBefore(div, createBtn);
        } else {
          div.classList.add('client-menu');
          await billWrapper.appendChild(div);
        }
      }
    } else {
      const span = document.createElement('span');
      span.classList.add('platform__empty');
      span.innerText = 'Нет счетов...';
      await billWrapper.appendChild(span);
    }
  }

  async checkAccess(props) {
    const {
      pack,
      isView,
      bills,
      menu,
      deal,
    } = props;

    const { role } = pack;

    const billWrapper = menu.querySelector('[js-client-bills]');

    const isClientCard = menu.hasAttribute('js-menu-client-card');

    const checkPrice = this.checkPrice(bills, menu, deal);

    const idCourse = +menu.querySelector('[data-select-type="select-product"] [id-selected]')?.value;
    const dealStatus = +menu.querySelector('[data-select-type="select-status"] [id-selected]')?.value;

    if (idCourse) {
      const roleManager = role === 'ROLE_MANAGER' || role === 'ROLE_HEAD_MANAGER';
      const haveProduct = deal.idProduct !== 0 || idCourse !== 0;
      const notImportantDeal = deal?.status !== 1 || dealStatus !== 1;
      const isValidDeal = haveProduct && checkPrice && notImportantDeal;

      const isManager = !isClientCard && roleManager && isValidDeal && !isView;

      if (isManager) {
        const hasCreateBillBtn = menu.querySelector('.bill__create');

        if (!hasCreateBillBtn) {
          if (!bills.length) {
            document.querySelector('.platform__empty')?.remove();
          }

          const div = document.createElement('div');
          div.classList.add('bill__item');
          div.classList.add('bill__create');

          const span = document.createElement('span');
          span.classList.add('bill__create--icon');

          div.innerText = 'Добавить счет';
          div.appendChild(span);

          await billWrapper.appendChild(div);
        }
      }
    }
  }

  checkPrice(bills, menu, deal) {
    let checkPrice;

    const billsItems = Array.from(menu.querySelectorAll('.bill__item'));

    if (billsItems) {
      let price = 0;

      billsItems.forEach((el) => {
        price += parseInt(el.querySelector('.price__value').innerText, 10);
      });

      /* eslint-disable-next-line */
      checkPrice = deal?.price === price ? false : deal?.price > price;
    }

    return checkPrice || (checkPrice === undefined && deal.price > 0);
  }
}

export default Bill;
