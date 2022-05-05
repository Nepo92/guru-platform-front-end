import DealFields from '../dealFields.js';

class Tag extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    const { menu, deal, isView } = dealPack;

    const input = menu.querySelector('[tag]');

    if (deal) {
      const { tag } = deal;
      input.value = tag || '';
    } else {
      input.value = '';
    }

    if (isView) {
      input.classList.add('disable');
    } else {
      input.classList.remove('disable');
    }

    const change = this.change.bind(this, dealPack);
    input.addEventListener('input', change);
  }
}

export default Tag;
