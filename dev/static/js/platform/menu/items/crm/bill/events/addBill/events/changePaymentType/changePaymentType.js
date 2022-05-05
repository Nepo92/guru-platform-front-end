import Utils from '../../../../../../../../utils/utils.js';
import PaymentMethodIcons from '../paymentMethodIcons.js';

const utils = new Utils();
const paymentMethodIcons = new PaymentMethodIcons();

class ChangePaymentType {
  init(props) {
    const { menu, pack, deal } = props;
    const select = menu.querySelector('[js-bill-acquiring]');

    if (select) {
      const addBillLevel = menu.querySelector('[create-bill-menu]');
      const remains = menu.querySelector('.bills-remains');
      const paymentType = menu.querySelector('[js-bill-acquiring]');
      const templateItem = menu.querySelector('[template-item]');

      paymentType.value = 'acquiring';

      const paymentProps = {
        addBillLevel,
        remains,
        menu,
        paymentType,
        templateItem,
        pack,
        deal,
      };

      const changePaymentTypeValue = this.changePaymentTypeValue.bind(this, paymentProps);

      select.addEventListener('change', changePaymentTypeValue);
    }
  }

  changePaymentTypeValue(props) {
    const { menu, pack } = props;
    const { paymentMethods } = pack;

    const paymentMethodSelect = menu.querySelector('[js-bill-payment-method]');
    const paymentTypeSelect = menu.querySelector('[js-bill-acquiring]');

    const paymentMethodChildren = Array.from(paymentMethodSelect.children);

    const isAcquiring = paymentMethodSelect && paymentTypeSelect && paymentTypeSelect.value === 'acquiring';
    const isNotAcquiring = paymentMethodSelect && paymentTypeSelect && paymentTypeSelect.value === 'other';

    if (isAcquiring) {
      const acquiringProps = {
        paymentMethodChildren,
        paymentMethodSelect,
        props,
        paymentMethods,
      };

      this.isAcquiring(acquiringProps);
    } else if (isNotAcquiring) {
      const notAcquiringProps = {
        paymentMethodChildren,
        paymentMethodSelect,
        menu,
        paymentMethods,
      };

      this.isNotAcquiring(notAcquiringProps);
    }
  }

  isAcquiring(acquiringProps) {
    const {
      paymentMethodSelect,
      props,
      paymentMethods,
    } = acquiringProps;

    utils.removeChildren(paymentMethodSelect, 0);

    paymentMethods.forEach((item) => {
      if (item.apiCode > 0) {
        const option = document.createElement('option');
        option.setAttribute('value', item.title);
        option.setAttribute('data-code', item.code);
        option.setAttribute('data-api', item.apiCode);

        option.innerText = item.title;
        option.removeAttribute('disabled');

        paymentMethodSelect.appendChild(option);
      }
    });

    paymentMethodSelect.value = '';
    paymentMethodIcons.init(props);
  }

  isNotAcquiring(notAcquiringProps) {
    const {
      paymentMethodSelect,
      paymentMethods,
    } = notAcquiringProps;

    utils.removeChildren(paymentMethodSelect, 0);

    paymentMethods.forEach((item) => {
      if (item.apiCode === 0) {
        const option = document.createElement('option');
        option.setAttribute('value', item.title);
        option.setAttribute('data-code', item.code);

        option.innerText = item.title;

        paymentMethodSelect.appendChild(option);
      }
    });

    paymentMethodSelect.value = '';
    const paymentMethodWrapper = utils.getParent(paymentMethodSelect, 'update-deal__select-wrapper');
    paymentMethodWrapper.className = 'platform-select__wrapper update-deal__select-wrapper';
  }
}

export default ChangePaymentType;
