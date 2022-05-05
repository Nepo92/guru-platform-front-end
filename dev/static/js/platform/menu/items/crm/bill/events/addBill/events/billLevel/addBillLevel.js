import BillTemplates from '../../../../templates/billTemplates.js';
import Datepicker from '../../../../../../../../modules/datepicker/datepicker.js';
import BillLevelWrapper from './billLevelWrapper.js';

const billTemplates = new BillTemplates();
const datepicker = new Datepicker();

class AddBillLevel extends BillLevelWrapper {
  init(props) {
    const { menu } = props;

    const bill = this.getTemplateBillLayer(props);
    this.setBillLevel(bill, menu);

    props.prevValue = null;

    props.arrayBillInputs.push({
      index: null,
      prevValue: [],
    });

    this.changeBillPrice(props);

    props.isCreateBill = true;

    datepicker.init(props);
  }

  setBillLevel(bill, menu) {
    const billsLayersWrapper = menu.querySelector('.bills-layers__list');
    const btnWrapper = menu.querySelector('.add-layer');
    billsLayersWrapper.insertBefore(bill, btnWrapper);
  }

  getTemplateBillLayer(props) {
    const { menu } = props;

    const counter = menu.querySelectorAll('.bill-layers__item').length + 1;

    const layer = document.createElement('li');
    layer.classList.add('bill-layers__item');
    layer.classList.add('bill-layer');
    layer.setAttribute('data-index', counter - 1);

    if (counter > 0) {
      const btnWrapper = menu.querySelector('.add-layer');
      btnWrapper.classList.add('mt_20');
    }

    if (!props.currentTemplate) {
      layer.innerHTML = billTemplates.addBillMenuBillTemplate(counter);
    } else {
      layer.innerHTML = billTemplates.addBillMenuBillTemplate(counter, props.currentTemplate);
    }

    return layer;
  }
}

export default AddBillLevel;
