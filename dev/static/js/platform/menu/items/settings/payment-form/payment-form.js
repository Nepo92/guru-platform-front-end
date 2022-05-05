import PaymentFormBuilder from './builder/builder.js';
import Public from './public/public.js';
import Utils from '../../../../utils/utils.js';

const builder = new PaymentFormBuilder();
const publicForm = new Public();
const utils = new Utils();

const PAYMENT_FORM_BUILDER = 'payment-form-builder';
const PAYMENT_FORM_PUBLIC = 'payment-form-public';

class PaymentForm {
  init(props) {
    props.paymentForm$ = new PaymentForm();

    const page = utils.getPage();
    const prePage = utils.getPage(2);

    this.checkPage(page, props);
    this.checkPrePage(prePage, props);
  }

  checkPage(page, props) {
    switch (page) {
      case PAYMENT_FORM_BUILDER: {
        builder.init.bind(builder)(props);
        break;
      }
      case PAYMENT_FORM_PUBLIC: {
        publicForm.init.bind(publicForm)(props);
        break;
      }
      default: {
        break;
      }
    }
  }

  checkPrePage(prePage, props) {
    switch (prePage) {
      case PAYMENT_FORM_PUBLIC: {
        publicForm.init.bind(publicForm)(props);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default PaymentForm;
