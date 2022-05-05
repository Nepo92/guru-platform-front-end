import Utils from '../../../../../utils/utils.js';
import Validation from '../../../../../utils/validation.js';

const utils = new Utils();
const validation = new Validation();
class Public {
  init(props) {
    const params = {
      ...props,
    };

    const select = document.querySelector('[form-date]');

    const form = document.querySelector('[payment-form]');
    const button = document.querySelector('.client__info--button.pay');

    this.disableForm(select, button);

    this.setRedirectItems(props, form);

    if (select) {
      const selectItem = utils.setCloneElement(select);
      const changeStream = this.changeStream.bind(this, params, button, form);

      selectItem.addEventListener('change', changeStream);
    }

    if (button) {
      const submitForm = this.submitForm.bind(this, form);
      button.addEventListener('click', submitForm);
    }
  }

  changeStream(props, button, form, e) {
    const t = e.target;

    if (t) {
      this.disableForm(t, button);
    }

    this.setRedirectItems(props, form);
  }

  disableForm(t, button) {
    if (button && t?.value === '') {
      button.removeAttribute('type');
      button.setAttribute('type', 'button');
    } else if (t?.value !== '' && button) {
      button.removeAttribute('type');
      button.setAttribute('type', 'submit');
    }
  }

  setRedirectItems(props, form) {
    const [, baseUrl, idStream, idForm] = utils.getUrlData(props);

    const security = utils.checkSertificate(baseUrl);

    if (form) {
      form.removeAttribute('action');

      form.setAttribute('action', `${security}://${baseUrl}/payment-form-public/toPayByUser/${idForm}/${idStream}`);
    }
  }

  submitForm(form, e) {
    if (!validation.validateBuyProduct(form)) {
      e.preventDefault();
      e.stopPropagation();
    }
    utils.showLoader();
  }
}

export default Public;
