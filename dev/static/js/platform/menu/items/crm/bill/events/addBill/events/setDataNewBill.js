import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class SetDataNewBill {
  init(props) {
    const { menu } = props;

    const templatesItem = menu.querySelector('[js-bill-payment-template]');

    if (templatesItem) {
      this.setTemplatesItem(templatesItem, props);
    }

    const paymentMethodSelect = menu.querySelector('[js-bill-payment-method]');

    if (paymentMethodSelect) {
      this.setPaymentMethods(paymentMethodSelect, props);
    }

    this.setValueToCounter(menu);
  }

  setTemplatesItem(templatesItem, props) {
    utils.removeChildren(templatesItem, 0);

    const { templates, menu } = props;

    const selectTemplates = menu.querySelector('[js-bill-payment-template]');

    const setTemplates = utils.setBillTemplates.bind(utils, selectTemplates);

    templates.forEach(setTemplates);
  }

  setPaymentMethods(paymentMethodSelect, props) {
    const { pack } = props;
    const { paymentMethods } = pack;

    utils.removeChildren(paymentMethodSelect, 0);

    paymentMethods.forEach((item) => {
      if (item.apiCode > 0) {
        const option = document.createElement('option');
        option.setAttribute('value', item.title);
        option.setAttribute('data-code', item.code);
        option.setAttribute('data-api', item.apiCode);
        option.setAttribute('selected', '');

        option.innerText = item.title;
        option.removeAttribute('disabled');

        paymentMethodSelect.appendChild(option);
      }
    });
  }

  setValueToCounter(menu) {
    let price = +document.querySelector('[price]').value;

    const bills = Array.from(document.querySelectorAll('.bill__item')).filter((el) => !el.classList.contains('bill__create'));

    if (bills.length) {
      bills.forEach((item) => {
        const value = item.querySelector('.price__value').innerText;
        price -= Number.parseInt(value, 10);
      });
    }

    const remains = menu.querySelector('[bill-value-remains]');

    remains.innerText = `${price < 0 ? 0 : price} ₽`;

    const createMenu = menu.querySelector('[create-bill-menu]');
    const saveBtn = menu.querySelector('.bill__save');

    if (price <= 0) {
      createMenu.classList.add('hide');
      saveBtn.classList.add('hide');
    } else {
      createMenu.classList.remove('hide');
      saveBtn.classList.remove('hide');
    }
  }
}

export default SetDataNewBill;
