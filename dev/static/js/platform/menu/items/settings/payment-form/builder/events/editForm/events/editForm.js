import Utils from '../../../../../../../../utils/utils.js';
import PaymentFormRequest from '../../../requests/paymentFormRequests.js';
import Validation from '../../../../../../../../utils/validation.js';
import ValidationPaymentFormBuilder from '../../../../../../../../utils/validation/payment-form/validatePaymentFormBuilder.js';

const utils = new Utils();
const paymentFormRequests = new PaymentFormRequest();
const validation = new Validation();
const validatePaymentFormBuilder = new ValidationPaymentFormBuilder();

class EditForm {
  init(props) {
    const { menu } = props;

    const updateBtn = menu.querySelector('[js-save-form]');

    if (updateBtn) {
      const update = utils.setCloneElement(updateBtn);
      const updateRequest = this.updateRequest.bind(this, props);

      update.addEventListener('click', updateRequest);

      const toValidateError = validation.toValidationError.bind(validation);

      update.addEventListener('dblclick', toValidateError);
    }
  }

  updateRequest(props) {
    const { menu } = props;

    const form = menu.querySelector('[payment-form-add-form]');

    if (validatePaymentFormBuilder.init(form)) {
      paymentFormRequests.updateForm(props);
    }
  }
}

export default EditForm;
