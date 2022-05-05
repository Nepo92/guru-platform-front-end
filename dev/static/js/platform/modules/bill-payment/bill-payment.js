import Utils from '../../utils/utils.js';
import ValidateClient from '../../utils/validation/client/validateClient.js';
import Validation from '../../utils/validation.js';

const utils = new Utils();
const validateClient = new ValidateClient();
const validation = new Validation();

class BillPayment {
  init(props) {
    this.setLinkToDocs(props);
    this.initBillPayment(props);
  }

  initBillPayment(props) {
    const btn = document.querySelector('.payment__btn');

    if (window.innerWidth <= 720) {
      this.setMobileIcons();
    }

    if (btn) {
      const paymentBtn = utils.setCloneElement(btn);

      const changeForm = this.changeForm.bind(this, props);
      paymentBtn.addEventListener('click', changeForm);

      const toValidationError = validation.toValidationError.bind(validation);
      paymentBtn.addEventListener('dblclick', toValidationError);
    }

    const label = document.querySelector('.payment__agreement');

    if (label) {
      const openAgreements = this.openAgreements.bind(this);
      label.addEventListener('click', openAgreements);
    }

    utils.hideLoader();
  }

  setMobileIcons() {
    const mirImg = document.querySelectorAll('.payment-methoods__item')[2].querySelector('img');
    const masterCardImg = document.querySelectorAll('.payment-methoods__item')[0].querySelector('img');

    if (mirImg && masterCardImg) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        mirImg.classList.add('scaled');
        masterCardImg.classList.add('scaled');
      }
    }
  }

  changeForm(props, e) {
    const { bill, client } = props;

    this.getDifference(client);

    if (validateClient.init()) {
      const t = e.target;

      const hasDiff = this.getDifference(client);

      if (hasDiff) {
        const form = utils.getParent(t, 'payment__action');
        form.submit();
      } else {
        window.location.href = `/bill-payment/toPay/${bill.id}`;
      }

      utils.showLoader();
    }
  }

  getDifference(client) {
    const clientCache = {
      email: client.email,
      name: client.name,
      phone: client.phone,
    };

    const currentName = document.querySelector('[name="name"]')?.value.trim();
    const currentPhone = document.querySelector('[name="phone"]')?.value.trim();
    const currentEmail = document.querySelector('[name="email"]')?.value.trim();

    const currentData = {
      email: currentEmail,
      name: currentName,
      phone: currentPhone,
    };

    const cacheArray = Object.entries(clientCache);
    const currentArray = Object.entries(currentData);

    const diff = !cacheArray.every((el) => currentArray.find((it) => el[0] === it[0])[1] === el[1]);

    return diff;
  }

  openAgreements(e) {
    const t = e.target;

    if (t.tagName === 'A') {
      e.preventDefault();
      e.stopPropagation();

      const url = t.getAttribute('href');

      const address = (url.startsWith('http://') || url.startsWith('https://')) ? url : `https://${url}`;

      window.open(address, '_blank');
    }
  }

  setLinkToDocs(props) {
    const { docs } = props;

    const oferta = document.querySelector('[oferta]');
    const ofertaData = docs.find((el) => el.type === 0);

    oferta.setAttribute('href', ofertaData?.link || '#');

    const confidentiality = document.querySelector('[confidentiality]');
    const confidentialityData = docs.find((el) => el.type === 1);

    confidentiality.setAttribute('href', confidentialityData?.link || '#');

    utils.hideLoader();
  }
}

export default BillPayment;
