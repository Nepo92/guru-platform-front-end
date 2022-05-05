import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class PaymentMethodIcons {
  init(props) {
    const { menu } = props;

    const select = menu.querySelector('[js-bill-payment-method]');

    if (select) {
      const currentMethod = utils.getSelected(select)?.getAttribute('data-code');

      const wrapper = utils.getParent(select, 'update-deal__select-wrapper');

      wrapper.className = 'platform-select__wrapper update-deal__select-wrapper';

      switch (currentMethod) {
        case 'yandex': {
          wrapper.classList.add('pay-info__select');
          wrapper.classList.add('yandex');
          break;
        }
        case 'sber': {
          wrapper.classList.add('pay-info__select');
          wrapper.classList.add('sber');
          break;
        }
        case 'westernunion': {
          wrapper.classList.add('pay-info__select');
          wrapper.classList.add('western-union');
          break;
        }
        case 'paypal': {
          wrapper.classList.add('pay-info__select');
          wrapper.classList.add('paypal');
          break;
        }
        case 'qiwi': {
          wrapper.classList.add('pay-info__select');
          wrapper.classList.add('qiwi');
          break;
        }
        case 'bill': {
          wrapper.classList.add('pay-info__select');
          wrapper.classList.add('bill');
          break;
        }
        case 'other': {
          wrapper.classList.add('pay-info__select');
          wrapper.classList.add('other');
          break;
        }
        case null: {
          wrapper.className = 'platform-select__wrapper update-deal__select-wrapper';
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}

export default PaymentMethodIcons;
