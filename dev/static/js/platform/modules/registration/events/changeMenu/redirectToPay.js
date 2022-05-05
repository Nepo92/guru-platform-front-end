import { paymentFormAPI } from '../../../../api/api.js';
import Utils from '../../../../utils/utils.js';
import ValidateClient from '../../../../utils/validation/client/validateClient.js';
import Popup from '../../../popup/popup.js';
import SetColor from '../../../../menu/items/crm/clientCard/events/setRandomCircle/events/setColor.js';

const utils = new Utils();
const validateClient = new ValidateClient();
const popup = new Popup();
const setColor = new SetColor();

class RedirectToPay {
  registration(props) {
    const btn = document.querySelector('.client__info--button.registration');

    if (btn) {
      const button = utils.setCloneElement(btn);

      const registrationNewClient = this.registrationNewClient.bind(this, props);

      button.addEventListener('click', registrationNewClient);
    }
  }

  registrationNewClient(props, e) {
    e.preventDefault();
    e.stopPropagation();

    this.getIdStream(props);

    if (validateClient.init()) {
      const name = document.querySelector('[form-name]');
      const tel = document.querySelector('[form-tel]');
      const email = document.querySelector('[form-email]');
      const idCompany = +document.querySelector('[id-company]').value;

      props.openClientCard = false;
      const color = setColor.getRandomColor(props);

      const data = {
        name: name.value.trim(),
        phone: tel.value.trim(),
        email: email.value.trim(),
        idCompany,
        clientColor: color,
      };

      const save = paymentFormAPI.registrationNewClient(data);

      const loader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      save.then((client) => {
        clearTimeout(loader);
        utils.hideLoader();

        const popupProps = {
          text: `Логин: ${client.username}\nПароль: ${client.password}`,
          settings: 'copy',
          title: null,
          ok: null,
          cancel: null,
          target: e.target,
        };

        popup.init(popupProps);

        this.removeRegistrationForm();

        this.redirect(props);
      }, (errorObject) => {
        utils.hideLoader();
        clearTimeout(loader);

        const { responseText: error } = errorObject;

        switch (error) {
          case 'The client already exists.': {
            alert('Error!');
            break;
          }
          default: {
            break;
          }
        }
      });
    }
  }

  removeRegistrationForm() {
    const login = document.querySelector('.have-login');
    const form = document.querySelector('.form__content');
    const registration = document.querySelector('.registration');
    const warning = document.querySelector('.info__warning');

    const items = [login, form, registration, warning];

    items.forEach((item) => {
      item.remove();
    });

    const clientNav = document.querySelector('.client__nav');

    clientNav.style.marginTop = '15px';
    clientNav.style.paddingTop = '0';
    clientNav.style.borderTop = '0';

    const payBtn = document.querySelector('.pay');

    if (payBtn) {
      payBtn.classList.remove('hide');
    }

    const p = document.createElement('p');
    p.innerText = 'Поздравляем! Регистрация прошла успешно';
    p.classList.add('after-registration__text');
    p.classList.add('mt_15');

    if (!document.querySelector('.after-registration__text')) {
      clientNav.parentNode.insertBefore(p, clientNav);
    }

    const privateLicense = document.querySelector('.private');

    if (privateLicense) {
      privateLicense.classList.add('hide');
    }
  }

  redirect(props) {
    const btn = document.querySelector('.client__info--button.pay');

    if (btn) {
      const button = utils.setCloneElement(btn);

      const redirectToPay = this.redirectToPay.bind(this, props);

      button.addEventListener('click', redirectToPay);
    }
  }

  redirectToPay(props, e) {
    e.preventDefault();

    utils.showLoader();

    const select = document.querySelector('[form-date]');

    if (select) {
      props.idStream = +select.value;
    }

    setTimeout(() => {
      const [formCode, baseUrl] = utils.getUrlData(props);

      const security = utils.checkSertificate(baseUrl);

      window.location.href = `${security}://${baseUrl}/payment-form-public/${formCode}/`;
    }, 500);
  }

  getIdStream(props) {
    const select = document.querySelector('[form-date]');

    if (select) {
      props.idStream = +select.value;
    } else {
      props.idStream = props.form?.streams[0].id;
    }
  }
}

export default RedirectToPay;
