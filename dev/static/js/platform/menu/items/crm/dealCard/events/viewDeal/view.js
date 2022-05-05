import OpenViewDeal from './events/openViewDeal.js';
import CloseViewDeal from './events/closeViewDeal.js';

const openMenu = new OpenViewDeal();
const closeMenu = new CloseViewDeal();

class ViewDeal {
  init(viewDealPack) {
    const items = [openMenu, closeMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(viewDealPack);
    });
  }
}

export default ViewDeal;
