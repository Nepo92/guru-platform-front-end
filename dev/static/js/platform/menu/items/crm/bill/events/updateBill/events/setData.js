import Utils from '../../../../../../../utils/utils.js';
import PaymentMethodIcons from '../../addBill/events/paymentMethodIcons.js';

const utils = new Utils();
const paymentMethodIcons = new PaymentMethodIcons();

class SetData {
  init(props) {
    this.setPaymentType(props);
    this.setPaymentMethods(props);
    this.setSum(props);
    this.setPlannedDate(props);
    this.hidePaymentType(props);
  }

  setPaymentType(props) {
    const { menu, bill, pack } = props;
    const { paymentMethods } = pack;

    const currentType = paymentMethods.find((el) => el.id === bill.paymentMethodId);

    const type = menu.querySelector('[name="payment-type"]');

    if (currentType) {
      const isAcquiring = currentType.apiCode > 0;

      if (isAcquiring) {
        type.value = 'acquiring';
        this.setSelected(type, type.value);
      } else {
        type.value = 'other';
        this.setSelected(type, type.value);
      }

      const cloneType = utils.setCloneElement(type);
      const changePaymentType = this.changePaymentType.bind(this, props);
      cloneType.addEventListener('change', changePaymentType);
    } else {
      const method = menu.querySelector('[js-bill-payment-method]');

      method.value = '';

      const plannedPayDate = menu.querySelector('[js-bill-planned-date-update]');

      plannedPayDate.value = bill.plannedPayDate;
    }
  }

  setSelected(type, value) {
    Array.from(type.children).forEach((item) => {
      item.removeAttribute('selected');

      if (item.value === value) {
        item.setAttribute('selected', '');
      }
    });
  }

  changePaymentType(props, e) {
    const t = e.target;
    const { pack, menu } = props;
    const { paymentMethods } = pack;

    const isAcquiring = t.value === 'acquiring';

    this.paymentMethodsToSelect(isAcquiring, paymentMethods, menu, props);
  }

  setPaymentMethods(props) {
    const { pack } = props;
    const { paymentMethods } = pack;

    const menu = document.querySelector('[add-bill-menu]');

    const type = menu.querySelector('[js-bill-acquiring]').value;

    const isAcquiring = type === 'acquiring';

    this.paymentMethodsToSelect(isAcquiring, paymentMethods, menu, props);
  }

  paymentMethodsToSelect(isAcquiring, paymentMethods, menu, props) {
    const paymentMethod = menu.querySelector('[js-bill-payment-method]');

    if (paymentMethod) {
      utils.removeChildren(paymentMethod, 0);

      let currentMethods;

      if (isAcquiring) {
        currentMethods = paymentMethods.filter((el) => el.apiCode > 0);
      } else {
        currentMethods = paymentMethods.filter((el) => el.apiCode === 0);
      }

      currentMethods.forEach((item) => {
        const option = document.querySelector('option');
        option.setAttribute('value', item.title);
        option.setAttribute('data-code', item.code);
        option.innerText = item.title;
        option.removeAttribute('disabled');

        paymentMethod.appendChild(option);
      });

      paymentMethod.value = '';

      Array.from(paymentMethod.children).forEach((item) => {
        item.removeAttribute('selected');
      });

      paymentMethodIcons.init(props);
    }
  }

  setSum(props) {
    const { menu, bill } = props;
    if (bill) {
      const sum = menu.querySelector('[js-bill-sum-update]');

      sum.setAttribute('required', '');

      if (sum && bill.sum) {
        sum.value = bill.sum;
      } else if (sum && !bill.sum) {
        sum.value = '';
      }
    }
  }

  setPlannedDate(props) {
    const { menu, bill } = props;

    if (bill) {
      const date = menu.querySelector('[js-bill-planned-date-update]');

      date.setAttribute('required', '');

      if (bill.plannedPayDate) {
        date.value = utils.getDateFormatDDMMYYYY(bill.plannedPayDate);
      } else {
        date.value = '';
      }
    }
  }

  hidePaymentType(props) {
    const { menu } = props;

    const info = menu.querySelector('.bills-item__pay-info');

    const paymentType = Array.from(info.children)[0];
    const paymentMethod = Array.from(info.children)[1];

    paymentType.parentNode.classList.add('edit-mode');

    paymentType.classList.add('width_100');
    paymentMethod.classList.add('width_100');
    paymentMethod.classList.add('mt_15');
  }
}

export default SetData;
