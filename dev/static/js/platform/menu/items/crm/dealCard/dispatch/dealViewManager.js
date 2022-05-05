import ViewDeal from '../events/viewDeal/view.js';

const viewDeal = new ViewDeal();

class DealViewManager {
  init(dealPack) {
    const items = [viewDeal];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealPack);
    });
  }
}

export default DealViewManager;
