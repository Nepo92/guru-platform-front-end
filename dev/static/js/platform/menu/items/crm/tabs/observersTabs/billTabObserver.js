import Bill from '../../bill/bill.js';

const bill = new Bill();

class BillTabObserver {
  init(props) {
    const items = [bill];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default BillTabObserver;
