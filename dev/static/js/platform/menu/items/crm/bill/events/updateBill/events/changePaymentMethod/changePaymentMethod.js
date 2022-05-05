import Utils from '../../../../../../../../utils/utils.js';
import PaymentMethodIcons from '../../../addBill/events/paymentMethodIcons.js';

const utils = new Utils();
const paymentMethodIcons = new PaymentMethodIcons();
class ChangePaymentMethod {
  init(props) {
    const changeProps = {
      ...props,
    };

    const { menu, bill } = changeProps;

    if (bill) {
      const paymentSelect = menu.querySelector('[js-bill-payment-method]');

      if (paymentSelect) {
        const paymentIcons = paymentMethodIcons.init.bind(paymentMethodIcons, changeProps);

        const select = utils.setCloneElement(paymentSelect);

        select.value = bill.paymentMethod;

        select.addEventListener('change', paymentIcons);
      }
    }
  }
}

export default ChangePaymentMethod;
