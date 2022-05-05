import RevealDeal from '../events/revealDeal/revealDeal.js';

const revealDeal = new RevealDeal();

class DealShowManager {
  init(dealCardPack) {
    const items = [revealDeal];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealCardPack);
    });
  }
}

export default DealShowManager;
