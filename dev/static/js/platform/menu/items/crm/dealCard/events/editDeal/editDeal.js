import OpenEditDeal from './events/openEditDeal.js';
import CloseEditDeal from './events/closeEditDeal.js';

const openEditDeal = new OpenEditDeal();
const closeEditDeal = new CloseEditDeal();

class EditDeal {
  init(editData) {
    const items = [openEditDeal, closeEditDeal];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(editData);
    });
  }
}

export default EditDeal;
