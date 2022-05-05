import AddBillTemplate from './addBillTemplate.js';

const addBillTemplate = new AddBillTemplate();

class BillTemplates {
  init(props) {
    const items = [addBillTemplate];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default BillTemplates;
