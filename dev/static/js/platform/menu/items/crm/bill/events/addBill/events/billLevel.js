import Utils from '../../../../../../../utils/utils.js';
import BillTemplates from '../../../templates/billTemplates.js';
import Datepicker from '../../../../../../../modules/datepicker/datepicker.js';

const utils = new Utils();
const billTemplates = new BillTemplates();
const datepicker = new Datepicker();

class BillLevel {
  init(props) {
    const { menu } = props;

    const addBillBtn = menu.querySelector('[add-bill-btn]');

    if (addBillBtn) {
      const addBill = utils.setCloneElement(addBillBtn);
      const add = this.addBill.bind(this, props);

      addBill.addEventListener('click', add);
    }
  }

  addBill(props, e) {
    const { menu } = props;
    const t = e.target;

    const counter = menu.querySelectorAll('.bill__level').length + 1;

    const bill = document.createElement('li');
    bill.classList.add('platform-form__item');
    bill.classList.add('add-bill__item-wrapper');
    bill.classList.add('bill__level');
    bill.innerHTML = billTemplates.AddBillMenuBillTemplate(counter);

    utils.getParent(t, 'bills__items').insertBefore(bill, t.parentNode);

    const deleteBtns = menu.querySelectorAll('.add-bill__remove-level');

    datepicker.setData(props);

    if (deleteBtns.length) {
      const removeLvl = this.removeLvl.bind(this, props);

      deleteBtns.forEach((item) => {
        const deleteBtn = utils.setCloneElement(item);
        deleteBtn.addEventListener('click', removeLvl);
      });
    }
  }

  removeLvl(props, e) {
    const { menu } = props;
    const t = e.target;

    utils.getParent(t, 'bill__level').remove();

    menu.querySelectorAll('.bill__level').forEach((item, index) => {
      item.querySelector('[add-bill__counter]').innerText = index + 1;
    });
  }
}

export default BillLevel;
