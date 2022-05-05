import OpenPaymentFormBuilderMenu from './events/openPaymentFormBuilderMenu.js';
import ClosePaymentFormAddMenu from './events/closeMenu.js';
import RemovePaymentForm from './events/removePaymentForm.js';
import EditPaymentForm from './events/editForm/editForm.js';
import CopyLink from './events/copyLink.js';

const openMenu = new OpenPaymentFormBuilderMenu();
const closeMenu = new ClosePaymentFormAddMenu();
const removePaymentForm = new RemovePaymentForm();
const editForm = new EditPaymentForm();
const copyLink = new CopyLink();

class PaymentFormBuilder {
  init(props) {
    const builderProps = {
      ...props,
    };

    const items = [openMenu, copyLink, closeMenu, editForm, removePaymentForm];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(builderProps);
    });
  }
}

export default PaymentFormBuilder;
