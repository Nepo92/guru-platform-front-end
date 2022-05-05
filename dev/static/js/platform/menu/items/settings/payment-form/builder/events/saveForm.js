import Utils from '../../../../../../utils/utils.js';
import Validation from '../../../../../../utils/validation.js';
import PaymentFormRequest from '../requests/paymentFormRequests.js';
import ValidationPaymentFormBuilder from '../../../../../../utils/validation/payment-form/validatePaymentFormBuilder.js';

const utils = new Utils();
const validation = new Validation();
const paymentFormRequest = new PaymentFormRequest();
const validationPaymentFormBuilder = new ValidationPaymentFormBuilder();

class SaveForm {
  init(props) {
    const { menu } = props;

    const saveBtn = menu.querySelector('[js-save-form]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);

      const saveForm = this.saveForm.bind(this, props);
      save.addEventListener('click', saveForm);

      const toError = validation.toValidationError.bind(validation);
      save.addEventListener('dblclick', toError);
    }
  }

  saveForm(props, e) {
    const t = e.target;
    const { menu } = props;

    const form = menu.querySelector('[payment-form-add-form]');

    if (validationPaymentFormBuilder.init(form, true)) {
      t.style.pointerEvents = 'none';
      props.target = t;

      paymentFormRequest.saveForm(props);
    }
  }
}

export default SaveForm;
