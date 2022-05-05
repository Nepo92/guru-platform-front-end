import Utils from '../../../../utils/utils.js';
import PaymentFormTemplates from '../../../../menu/items/settings/payment-form/templates/paymentFormTemplates.js';
import RedirectToPay from './redirectToPay.js';

const paymentFormTemplates = new PaymentFormTemplates();
const utils = new Utils();
const redirectToPay = new RedirectToPay();

class ChangePaymentMenu {
  init(props) {
    const checkbox = document.querySelector('.platform__checkbox');

    if (checkbox) {
      if (!checkbox.checked) {
        this.setLoginMenu(props);
      }

      const checkboxListener = this.checkboxListener.bind(this, props);

      checkbox.addEventListener('change', checkboxListener);
      checkboxListener();
    }
  }

  checkboxListener(props, e) {
    if (e) {
      const t = e.target;

      if (!t.checked) {
        this.setLoginMenu(props);
        redirectToPay.registration(props);
      } else {
        this.setPaymentMenu(props);
        redirectToPay.redirect(props);
      }
    } else {
      this.setLoginMenu(props);
      redirectToPay.registration(props);
    }
  }

  setLoginMenu(props) {
    const formWrapper = document.querySelector('.form__content');

    const regBtn = document.querySelector('.client__info--button.registration');

    if (regBtn) {
      regBtn.style.display = 'flex';
    }

    const payBtn = document.querySelector('.pay');

    if (payBtn) {
      payBtn.classList.add('hide');
    }

    const privateLicense = document.querySelector('.private');

    if (privateLicense) {
      privateLicense.classList.remove('hide');
    }

    if (formWrapper) {
      utils.removeChildren(formWrapper);
      formWrapper.innerHTML = paymentFormTemplates.paymentFormTemplate(props);
    }

    const warning = document.querySelector('.info__warning');

    if (warning) {
      warning.classList.remove('hide');
      warning.classList.add('mt_20');
    }

    const info = document.querySelector('.client__info');

    if (info) {
      info.classList.add('buy-menu');
    }

    const haveLogin = document.querySelector('.have-login');

    if (haveLogin) {
      haveLogin.classList.remove('mt_0');
      haveLogin.classList.add('mt_20');
    }
  }

  setPaymentMenu() {
    const formWrapper = document.querySelector('.form__content');

    const regBtn = document.querySelector('.client__info--button.registration');

    if (regBtn) {
      regBtn.style.display = 'none';
    }

    const payBtn = document.querySelector('.pay');

    if (payBtn) {
      payBtn.classList.remove('hide');
    }

    const privateLicense = document.querySelector('.private');

    if (privateLicense) {
      privateLicense.classList.add('hide');
    }

    if (formWrapper) {
      utils.removeChildren(formWrapper);
    }

    const warning = document.querySelector('.info__warning');

    if (warning) {
      warning.classList.add('hide');
    }

    const info = document.querySelector('.client__info');

    if (info) {
      info.classList.remove('buy-menu');
    }

    const haveLogin = document.querySelector('.have-login');

    if (haveLogin) {
      haveLogin.classList.add('mt_0');
      haveLogin.classList.remove('mt_20');
    }
  }
}

export default ChangePaymentMenu;
