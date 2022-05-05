import BillLevel from './billLevel.js';
import SaveBill from './saveBill/saveBill.js';
import CloseBillAddMenu from './closeAddBillMenu.js';
import Utils from '../../../../../../../utils/utils.js';
import Validation from '../../../../../../../utils/validation.js';

const billLevel = new BillLevel();
const saveBill = new SaveBill();
const closeBillAddMenu = new CloseBillAddMenu();
const utils = new Utils();
const validation = new Validation();

class AfterOpenAddBillMenu {
  init(props) {
    const items = [billLevel, closeBillAddMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });

    const saveBtn = document.querySelector('.bill__save');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);

      const saveNewBill = saveBill.init.bind(saveBill, props);
      save.addEventListener('click', saveNewBill);

      const toValidationError = validation.toValidationError.bind(validation);
      save.addEventListener('dblclick', toValidationError);
    }
  }
}

export default AfterOpenAddBillMenu;
