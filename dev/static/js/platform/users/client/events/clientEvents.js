import PaymentForm from '../../../menu/items/settings/payment-form/payment-form.js';
import Registration from '../../../modules/registration/registration.js';
import Utils from '../../../utils/utils.js';
import BillPayment from '../../../modules/bill-payment/bill-payment.js';
import Homework from '../../../menu/items/products/homework/homework';

const paymentForm = new PaymentForm();
const registration = new Registration();
const utils = new Utils();
const billPayment = new BillPayment();
const homework = new Homework();

const PAYMENT_FORM_BUILDER = 'payment-form-builder';
const PAYMENT_FORM_PUBLIC = 'payment-form-public';
const PUBLIC_REGISTRATION = 'public-registration';
const BILL_PAYMENT = 'bill-payment';

class ClientEvents {
    init(props) {
        const page = utils.getPage();
        const prePage = utils.getPage(2);

        this.checkPage(page, props);
        this.checkPrePage(prePage, props);

        homework.init();
    }

    checkPage(page, props) {
        switch (page) {
            case BILL_PAYMENT: {
                billPayment.init(props);
                break;
            }
            case PAYMENT_FORM_BUILDER: {
                paymentForm.init(props);
                break;
            }
            default: {
                break;
            }
        }
    }

    checkPrePage(prePage, props) {
        switch (prePage) {
            case PUBLIC_REGISTRATION: {
                registration.init.bind(registration)(props);
                break;
            }
            case PAYMENT_FORM_PUBLIC: {
                paymentForm.init.bind(paymentForm)(props);
                break;
            }
            default: {
                break;
            }
        }
    }
}

export default ClientEvents;
