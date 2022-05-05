import Utils from '../../../../../../utils/utils.js';
import { paymentFormAPI } from '../../../../../../api/api.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemovePaymentForm {
  init(props) {
    const removeBtns = document.querySelectorAll('.payment-form__delete');

    if (removeBtns.length) {
      const removeForm = this.removeForm.bind(this, props);

      removeBtns.forEach((item) => {
        const remove = utils.setCloneElement(item);
        remove.addEventListener('click', removeForm);
      });
    }
  }

  removeForm(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    props.target = t;

    const removeRequest = this.removeRequest.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить эту форму оплаты?',
      settings: null,
      title: null,
      ok: removeRequest,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  removeRequest(props) {
    const { target } = props;

    const id = +utils.getParent(target, 'payment-form').getAttribute('data-id');

    const remove = paymentFormAPI.removePaymentForm(id);

    remove.then(() => {
      const form = document.querySelector(`.payment-form[data-id="${id}"]`);
      form.remove();
    });
  }
}

export default RemovePaymentForm;
