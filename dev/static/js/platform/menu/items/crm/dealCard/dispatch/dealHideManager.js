import EditDeal from '../events/editDeal/editDeal.js';
import HideDeal from '../events/hideDeal/hideDeal.js';

const editDeal = new EditDeal();
const hideDeal = new HideDeal();

class DealHideManager {
  init(dealCardPack) {
    const items = [editDeal, hideDeal];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealCardPack);
    });
  }
}

export default DealHideManager;
