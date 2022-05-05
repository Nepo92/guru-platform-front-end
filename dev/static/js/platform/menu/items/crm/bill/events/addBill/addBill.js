import OpenAddBillMenu from './events/openAddBillMenu.js';

const openAddBillMenu = new OpenAddBillMenu();

class AddBill {
  init(props, e) {
    props.arrayBillInputs = [];
    props.requiredItems = this.getRequiredItems();

    openAddBillMenu.init(props, e);
  }

  getRequiredItems() {
    const addBillMenu = document.querySelector('[add-bill-menu]');

    if (addBillMenu) {
      const requiredItems = addBillMenu.querySelectorAll('[required]');

      return Array.from(requiredItems);
    }
  }
}

export default AddBill;
