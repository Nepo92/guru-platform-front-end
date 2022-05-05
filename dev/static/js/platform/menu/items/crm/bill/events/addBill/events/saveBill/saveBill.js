import Validation from '../../../../../../../../utils/validation.js';
import SaveBillWithoutTemplate from './saveBillWithoutTemplate.js';

const validation = new Validation();
const saveBillWithoutTemplate = new SaveBillWithoutTemplate();

class SaveBill {
  init(props, e) {
    const t = e.target;

    const {
      deal,
      menu,
    } = props;

    const checkBill = validation.validateBillWithoutTemplate(props);

    const layers = menu.querySelectorAll('.bill-layer');

    if (layers.length && checkBill) {
      const patternData = [
        menu,
        deal,
        props,
        t,
      ];

      saveBillWithoutTemplate.init(patternData);
    }
  }
}

export default SaveBill;
