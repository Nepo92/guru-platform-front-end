import DealEvents from './events/dealEvents.js';

const dealEvents = new DealEvents();

class Deal {
  init(dealCardPack) {
    const items = [dealEvents];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealCardPack);
    });
  }
}

export default Deal;
