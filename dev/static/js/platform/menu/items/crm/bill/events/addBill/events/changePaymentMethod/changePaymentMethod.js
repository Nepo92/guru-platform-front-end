import Utils from '../../../../../../../../utils/utils.js';
import PaymentMethodIcons from '../paymentMethodIcons.js';

const paymentMethodIcons = new PaymentMethodIcons();
const utils = new Utils();

class ChangePaymentMethod {
  init(props) {
    const { menu } = props;

    const select = menu.querySelector('[js-bill-payment-method]');

    if (select) {
      const selectPaymentMethod = utils.setCloneElement(select);
      const changePaymentMethod = this.changePaymentMethod.bind(this, props);
      selectPaymentMethod.addEventListener('change', changePaymentMethod);
    }
  }

  changePaymentMethod(props) {
    paymentMethodIcons.init(props);
  }
}

export default ChangePaymentMethod;
