import DealFields from '../dealFields.js';
import Funnel from '../funnel/funnel.js';
import Utils from '../../../../../../../../../utils/utils.js';

const funnel = new Funnel();
const utils = new Utils();

class DealType extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    if (dealPack.currentForm) {
      dealPack.deal = {
        ...dealPack.currentForm,
      };
    }

    const { menu, isView } = dealPack;
    const dealTypeWrapper = menu.querySelector('[data-select-type="select-deal-type"]');

    this.#dispatchViewMode(isView, dealTypeWrapper);

    const changes = this.changeDealType.bind(this, dealPack);

    const dealTypeValue = dealTypeWrapper.querySelector('[id-selected]');
    dealTypeValue.addEventListener('change', changes);
  }

  #dispatchViewMode(isView, dealTypeWrapper) {
    const select = dealTypeWrapper.querySelector('[select]');
    const wrapper = utils.getParent(select, 'platform-form__item');

    if (isView) {
      wrapper?.classList.add('disable');
    } else {
      wrapper?.classList.remove('disable');
    }
  }

  changeDealType(dealPack, e) {
    const t = e.target;

    let { deal } = dealPack;

    if (deal && typeof deal !== 'number') {
      deal.type = t.value;
    } else if (!deal || typeof deal === 'number') {
      const newDeal = {};

      if (typeof deal === 'number') {
        newDeal.id = deal;
      }

      newDeal.type = t.value;

      deal = {
        ...newDeal,
      };
    }

    dealPack.isChanged = true;
    dealPack.deal = deal;

    const setFunnels = funnel.init.bind(funnel);

    setFunnels(dealPack);

    this.change(dealPack);
  }
}

export default DealType;
