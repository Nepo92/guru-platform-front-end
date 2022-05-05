import Utils from '../../../../../../utils/utils.js';
import ChooseFormType from './chooseFormType.js';
import SaveForm from './saveForm.js';
import OpenMenuGeneral from './openMenuGeneral.js';

const chooseFormType = new ChooseFormType();
const saveForm = new SaveForm();
const utils = new Utils();

class OpenPaymentFormBuilderMenu extends OpenMenuGeneral {
  init(props) {
    props.menu = document.querySelector('[payment-form-add]');

    const paymentFormAdd = document.querySelector('[js-payment-form-add]');

    if (paymentFormAdd) {
      const openPaymentFormMenu = this.openPaymentFormMenu.bind(this, props);

      const openBtn = utils.setCloneElement(paymentFormAdd);
      openBtn.addEventListener('click', openPaymentFormMenu);
    }
  }

  openPaymentFormMenu(props) {
    const paymentProps = {
      ...props,
      currentForm: undefined,
      deal: undefined,
      idFunnel: undefined,
      dateType: undefined,
    };

    const { menu } = paymentProps;

    menu.querySelector('.menu-header__title').innerText = 'Добавить форму оплаты';
    menu.querySelector('[js-save-form]').innerText = 'Добавить форму';

    this.clearMenu(paymentProps);

    utils.openModalAnimation(menu, true);

    menu.querySelector('.payment-form__menu--content').scrollTop = '0';

    const items = [chooseFormType, saveForm];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(paymentProps);
    });
  }
}

export default OpenPaymentFormBuilderMenu;
