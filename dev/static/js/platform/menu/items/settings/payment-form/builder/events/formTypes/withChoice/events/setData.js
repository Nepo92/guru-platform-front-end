import SetLinks from '../../setLinks.js';
import Product from '../../../../../../../crm/dealCard/deal/events/afterGetDeal/dealItems/product/product.js';
import DealType from '../../../../../../../crm/dealCard/deal/events/afterGetDeal/dealItems/dealType/dealType.js';
import Funnel from '../../../../../../../crm/dealCard/deal/events/afterGetDeal/dealItems/funnel/funnel.js';
import Utils from '../../../../../../../../../utils/utils.js';

const setLinks = new SetLinks();
const product = new Product();
const dealType = new DealType();
const funnel = new Funnel();
const utils = new Utils();

class SetData {
  init(props) {
    props.isPaymentForm = true;

    setLinks.init(props);
    dealType.init(props);
    funnel.init(props);
    product.init(props);
    this.setPaymentMethods(props);
  }

  setPaymentMethods(props) {
    const { pack } = props;
    const { paymentMethods } = pack;

    const select = document.querySelector('[data-select-type="payment-type-select"] [select-body]');

    if (select) {
      utils.removeChildren(select, 0);

      paymentMethods.forEach((item) => {
        const option = document.createElement('div');
        option.classList.add('select__option');
        option.classList.add('no-icon');
        option.setAttribute('value', item.id);
        option.innerText = item.title;

        select.appendChild(option);
      });

      const idSelected = document.querySelector('[data-select-type="payment-type-select"] [id-selected]');
      const head = document.querySelector('[data-select-type="payment-type-select"] [select-head]');

      if (props.currentForm) {
        idSelected.value = String(props.currentForm?.idPaymentMethod);

        const selected = Array.from(select.children).find((el) => el.getAttribute('value') === String(props.currentForm?.idPaymentMethod));

        head.innerText = selected.innerText.trim();
        head.parentNode.setAttribute('title', selected.innerText.trim());
      } else {
        idSelected.value = '';
        head.parentNode.setAttribute('title', '');
      }
    }
  }
}

export default SetData;
