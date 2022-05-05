import PaymentFormTemplates from '../../../../templates/paymentFormTemplates.js';
import SetLinks from '../setLinks.js';
import DealType from '../../../../../../crm/dealCard/deal/events/afterGetDeal/dealItems/dealType/dealType.js';
import Funnel from '../../../../../../crm/dealCard/deal/events/afterGetDeal/dealItems/funnel/funnel.js';

const paymentFormTemplates = new PaymentFormTemplates();
const setLinks = new SetLinks();
const dealType = new DealType();
const funnel = new Funnel();

class WithoutChoiceProduct {
  init(props) {
    const render = this.render.bind(this);

    render(props).then(() => {
      setLinks.init(props);
      dealType.setData(props);
      funnel.setData(props);
    });
  }

  async render(props) {
    const { menu } = props;
    const wrapper = menu.querySelector('.payment-form__list');

    if (wrapper) {
      wrapper.remove();
    }

    const list = menu.querySelector('.payment-form__menu--content');

    if (list) {
      const ul = document.createElement('ul');
      ul.classList.add('payment-form__list');

      ul.innerHTML = paymentFormTemplates.menuWithoutChoice();

      list.appendChild(ul);
    }
  }
}

export default WithoutChoiceProduct;
