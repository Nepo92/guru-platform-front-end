import DealCard from '../../dealCard/dealCard.js';

const dealCard = new DealCard();

class DealTabObserver {
  init(tabPacks) {
    const items = [dealCard];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tabPacks);
    });
  }
}

export default DealTabObserver;
