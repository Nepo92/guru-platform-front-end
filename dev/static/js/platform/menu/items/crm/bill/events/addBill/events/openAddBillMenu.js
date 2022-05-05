import Utils from '../../../../../../../utils/utils.js';
import SetDataNewBill from './setDataNewBill.js';
import PaymentMethodIcons from './paymentMethodIcons.js';
import ChangePaymentType from './changePaymentType/changePaymentType.js';
import BillLevel from './billLevel/billLevel.js';
import SaveBill from './saveBill/saveBill.js';
import CloseBillAddMenu from './closeAddBillMenu.js';
import ChangePaymentMethod from './changePaymentMethod/changePaymentMethod.js';
import Validation from '../../../../../../../utils/validation.js';
import ChangePaymentTemplate from './changePaymentTemplate/changePaymentTemplate.js';

const utils = new Utils();
const setDataNewBill = new SetDataNewBill();
const paymentMethodIcons = new PaymentMethodIcons();
const changePaymentType = new ChangePaymentType();
const billLevel = new BillLevel();
const saveBill = new SaveBill();
const closeBillAddMenu = new CloseBillAddMenu();
const changePaymentMethod = new ChangePaymentMethod();
const validation = new Validation();
const changePaymentTemplate = new ChangePaymentTemplate();

class OpenAddBillMenu {
  init(props) {
    const addBillProps = this.getProps(props);
    addBillProps.menu = document.querySelector('[add-bill-menu]');

    let { menu } = addBillProps;

    if (!menu) {
      menu = document.querySelector('[add-bill-menu]');
    }

    utils.openModalAnimation(menu, true);

    const menuTitle = menu.querySelector('[client-name]');
    menuTitle.innerText = 'Добавить счет';

    const items = [
      setDataNewBill,
      paymentMethodIcons,
      changePaymentType,
      changePaymentMethod,
      changePaymentTemplate,
    ];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(addBillProps);
    });

    this.clearMenu(addBillProps);
    this.setSaveBtn(addBillProps);
    this.showItems(menu);
    this.hideItems(menu);

    const addBill = this.addBill.bind(this);
    addBill(addBillProps);
  }

  getProps(props) {
    return utils.getDeepCopy(props);
  }

  setSaveBtn(props) {
    const { menu } = props;

    const saveBtn = menu.querySelector('.bill__save');
    saveBtn.innerText = 'Создать счет';

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);

      const saveBillItem = saveBill.init.bind(saveBill, props);
      save.addEventListener('click', saveBillItem);

      const toValidationError = validation.toValidationError.bind(validation);
      save.addEventListener('dblclick', toValidationError);
    }
  }

  clearMenu(props) {
    const { menu } = props;

    const paymentType = menu.querySelector('[js-bill-acquiring]');

    if (paymentType) {
      paymentType.value = 'acquiring';
    }

    const paymentMethod = menu.querySelector('[js-bill-payment-method]');

    if (paymentMethod) {
      const children = Array.from(paymentMethod.children).filter((el) => el.hasAttribute('data-api'));

      paymentMethod.value = children[0]?.getAttribute('value');
    }

    const template = menu.querySelector('[js-bill-payment-template]');
    template.value = '';

    const sum = menu.querySelector('[js-bill-sum-update]');
    sum.value = '';

    if (sum.classList.contains('bill-error') || sum.classList.contains('bill-error__border')) {
      sum.classList.remove('bill-error');
      sum.classList.remove('bill-error__border');
    }

    const date = menu.querySelector('[js-bill-planned-date-update]');
    date.value = '';

    if (date.classList.contains('bill-error') || date.classList.contains('bill-error__border')) {
      date.classList.remove('bill-error');
      date.classList.remove('bill-error__border');
    }

    const levels = Array.from(menu.querySelector('.bills-layers__list').children);

    if (levels.length) {
      levels.forEach((item) => {
        if (!item.classList.contains('add-layer')) {
          item.remove();
        } else {
          item.classList.remove('mt_20');
        }
      });
    }

    this.changeSelectTemplate(props);
  }

  changeSelectTemplate(props) {
    const { menu, templates } = props;

    const selectTemplates = menu.querySelector('[js-bill-payment-template]');

    const currentBill = Array.from(document.querySelectorAll('.bill__item')).filter((el) => !el.classList.contains('bill__create'));

    if (currentBill.length) {
      Array.from(selectTemplates.children).forEach((item, index) => {
        if (index !== 0) {
          item.remove();
        }
      });
    } else {
      utils.removeChildren(selectTemplates, 0);

      const setBillTemplates = utils.setBillTemplates.bind(utils, selectTemplates);

      templates.forEach(setBillTemplates);
    }
  }

  showItems(menu) {
    const info = menu.querySelector('.bills-item__pay-info');

    if (info) {
      Array.from(info.children)[0].classList.remove('width_100');
      Array.from(info.children)[1].classList.remove('width_100');
      Array.from(info.children)[1].classList.remove('mt_15');
      info.classList.remove('edit-mode');
    }

    const templateItem = menu.querySelector('[template-item]');

    if (templateItem) {
      templateItem.classList.remove('hide');
    }

    const remains = menu.querySelector('.bills-remains');

    if (remains) {
      remains.classList.remove('hide');
    }

    const addLayerBtn = menu.querySelector('[add-bill-btn]');

    if (addLayerBtn) {
      addLayerBtn.classList.remove('hide');
    }

    const addBillBtn = menu.querySelector('.add-layer');

    if (addBillBtn) {
      addBillBtn.classList.remove('hide');
    }
  }

  hideItems(menu) {
    const editItems = menu.querySelectorAll('[edit-bill-item]');

    if (editItems.length) {
      editItems.forEach((item) => {
        item.classList.add('hide');
      });
    }

    const sum = menu.querySelector('[js-bill-sum-update]');
    sum.removeAttribute('required');
    sum.value = '';

    const date = menu.querySelector('[js-bill-planned-date-update]');
    date.removeAttribute('required');
  }

  addBill(props) {
    const items = [billLevel, closeBillAddMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default OpenAddBillMenu;
