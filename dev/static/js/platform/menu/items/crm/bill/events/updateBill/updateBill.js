import SetData from './events/setData.js';
import Utils from '../../../../../../utils/utils.js';
import CloseMenu from './events/closeMenu/closeMenu.js';
import SaveBill from './events/saveBill/saveBill.js';
import ErrorBorder from './events/errorBorder.js';
import Validation from '../../../../../../utils/validation.js';
import PaymentMethodIcons from '../addBill/events/paymentMethodIcons.js';
import ChangePaymentMethod from './events/changePaymentMethod/changePaymentMethod.js';

const setData = new SetData();
const utils = new Utils();
const closeMenu = new CloseMenu();
const saveBill = new SaveBill();
const errorBorder = new ErrorBorder();
const validation = new Validation();
const paymentMethodIcons = new PaymentMethodIcons();
const changePaymentMethod = new ChangePaymentMethod();

class UpdateBill {
  init(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const { menu } = props;

    const t = e.target;

    const isCreateBtn = t.classList.contains('bill__create');
    const isDealCard = t.classList.contains('menu-client');
    const isReceiptBtn = t.classList.contains('receipt');

    if ((!isCreateBtn && !isDealCard && !isReceiptBtn) || t.classList.contains('icon')) {
      utils.openModalAnimation(menu, true);

      this.setDataInMenu(props, t);
    }
  }

  setDataInMenu(props, t) {
    const billProps = this.getProps(props, t);

    const { menu } = billProps;

    const saveBtn = menu.querySelector('.bill__save');
    saveBtn.innerText = 'Сохранить изменения';

    const template = menu.querySelector('[js-bill-payment-template]');

    this.hideItems(menu, template);

    const billsLevels = menu.querySelectorAll('.bill-layer');

    if (billsLevels.length) {
      billsLevels.forEach((item) => item.remove());
    }

    const itemsRequired = Array.from(menu.querySelectorAll('[required]'));
    itemsRequired.shift();

    this.showItems(menu);

    const items = [setData, closeMenu, saveBill, errorBorder, changePaymentMethod];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(billProps);
    });

    const sum = menu.querySelector('[js-bill-sum-update]');

    const validateInput = this.validateInput.bind(this);

    sum.addEventListener('input', validateInput);

    paymentMethodIcons.init(props);
  }

  validateInput(e) {
    const { target } = e;

    validation.validationInputNuber(target);
  }

  getProps(props, t) {
    props.target = t;

    const billProps = {
      ...props,
    };

    const { menu, bills, notValidBills } = billProps;

    menu.querySelector('[client-name]').innerText = 'Редактировать счет';
    menu.querySelector('.platform-form__access-btn.bill__save').innerText = 'Сохранить';

    const billItem = utils.getParent(t, 'bill__item');

    const bill = billItem || t;

    const idDeal = bill.getAttribute('data-deal');
    billProps.idDeal = idDeal;

    const idBill = +bill.getAttribute('data-bill');

    const currentBill = bills?.find((el) => el.id === idBill);
    const currentNotValidBills = notValidBills?.find((el) => el.id === idBill);

    const current = currentBill || currentNotValidBills;

    billProps.bill = current;

    return billProps;
  }

  showItems(menu) {
    const items = menu.querySelectorAll('[edit-bill-item]');

    if (items.length) {
      items.forEach((item) => {
        item.classList.remove('hide');
      });
    }

    const updateItems = [
      document.querySelector('[js-bill-planned-date-update]'),
      document.querySelector('[js-bill-sum-update]'),
    ];

    updateItems.forEach((item) => {
      item.setAttribute('required', '');
    });

    const info = menu.querySelector('.bills-item__pay-info');

    if (info) {
      info.classList.remove('hide');
    }
  }

  hideItems(menu, template) {
    const templateWrapper = utils.getParent(template, 'bills-form__item');
    templateWrapper.classList.add('hide');

    const addBtnLayer = menu.querySelector('[add-bill-btn]');
    addBtnLayer.classList.add('hide');

    const remains = document.querySelector('.bills-remains');
    remains.classList.add('hide');

    const createMenu = menu.querySelector('[create-bill-menu]');
    createMenu.classList.add('hide');
  }
}

export default UpdateBill;
