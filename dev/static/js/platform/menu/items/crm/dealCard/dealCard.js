import DealCardEvents from './dealCardEvents.js';
import RenderDealCards from './render/renderDealCard.js';

const dealCardEvents = new DealCardEvents();
const renderDealCards = new RenderDealCards();

class DealCard {
  init(tabPack) {
    const dealCard = this.#getProps(tabPack);
    const renderDeals = renderDealCards.render(dealCard);

    renderDeals.then(() => {
      const items = [dealCardEvents];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(dealCard);
      });
    });
  }

  #getProps(tabPack) {
    return {
      ...tabPack,
      ...tabPack.dealTabObs,
      menu: document.querySelector('[js-menu-client-card]'),
    };
  }
}

export default DealCard;
