import DealFields from '../dealFields.js';

class Social extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    const {
      menu,
      isView,
    } = dealPack;

    const select = menu.querySelector('[data-select-type="select-social"]');

    this.dispatchViewMode(isView, select);
    this.changeSocial(dealPack, select);
  }

  dispatchViewMode(isView, select) {
    if (isView) {
      select.classList.add('disable');
    } else {
      select.classList.remove('disable');
    }
  }

  changeSocial(dealPack, select) {
    const change = this.change.bind(this, dealPack);

    const selected = select.querySelector('[id-selected]');
    selected.addEventListener('change', change);
  }
}

export default Social;
