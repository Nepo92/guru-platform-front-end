import CreateDeal from '../events/createDeal/createDeal.js';

const createDeal = new CreateDeal();

class DealCreateManager {
  init(dealPack) {
    const items = [createDeal];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealPack);
    });
  }
}

export default DealCreateManager;
