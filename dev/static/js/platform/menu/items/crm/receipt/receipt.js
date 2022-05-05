import OpenBillMenu from './events/openBillMenu.js';
import CloseBillMenu from './events/closeBillMenu.js';

const openBillMenu = new OpenBillMenu();
const closeBillMenu = new CloseBillMenu();

class PayBill {
  init(props, e) {
    const paybillProps = {
      ...props,
      menu: document.querySelector('[js-menu-deal]'),
    };

    const items = [openBillMenu, closeBillMenu];

    items.forEach(async (item) => {
      const init = item.init.bind(item);
      init(paybillProps, e);
    });
  }
}

export default PayBill;
