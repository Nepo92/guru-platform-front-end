import OpenClientCard from './events/openClientCard/openClientCard.js';
import CloseClientCard from './events/closeClientCard.js';

const openClientCard = new OpenClientCard();
const closeClientCard = new CloseClientCard();

class ClientCardEvents {
  init(clientCardPack) {
    const items = [openClientCard, closeClientCard];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(clientCardPack);
    });
  }
}

export default ClientCardEvents;
