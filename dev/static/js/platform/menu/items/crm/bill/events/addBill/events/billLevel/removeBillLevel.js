import Utils from '../../../../../../../../utils/utils.js';
import BillLevelWrapper from './billLevelWrapper.js';

const utils = new Utils();

class RemoveBillLevel extends BillLevelWrapper {
  init(props, e) {
    const t = e.target;

    const billLayer = utils.getParent(t, 'bill-layer');

    billLayer.remove();
    this.updateBillCounter(props);
    this.showAddBillButton(props);

    props.arrayBillInputs = props.arrayBillInputs.filter((el) => el.index !== +billLayer.getAttribute('data-index'));

    this.resultFunc(props, false);
  }

  updateBillCounter(props) {
    const { menu } = props;

    const levels = menu.querySelectorAll('.bill-layer');

    levels.forEach((item, index) => {
      const billCounter = item.querySelector('[bill-counter]');

      billCounter.innerText = `${index + 1} счет *`;
    });
  }

  showAddBillButton(props) {
    const { menu, sum, deal } = props;

    const addLayerBtn = menu.querySelector('.add-layer');

    if (sum <= deal.price) {
      addLayerBtn.classList.remove('hide');
      addLayerBtn.classList.add('mt_20');
    }
  }
}

export default RemoveBillLevel;
