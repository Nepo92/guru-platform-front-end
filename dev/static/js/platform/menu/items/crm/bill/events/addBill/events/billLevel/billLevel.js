import Datepicker from '../../../../../../../../modules/datepicker/datepicker.js';
import Utils from '../../../../../../../../utils/utils.js';
import AddBillLevel from './addBillLevel.js';
import RemoveBillLevel from './removeBillLevel.js';

const addBillLevel = new AddBillLevel();
const utils = new Utils();
const removeBillLevel = new RemoveBillLevel();
const datepicker = new Datepicker();

class BillLevel {
  init(props) {
    const { menu } = props;

    const billLayerWrapper = menu.querySelector('.bills-layers__list');

    if (billLayerWrapper) {
      const remains = menu.querySelector('[bill-value-remains]');
      props.sum = parseInt(remains.innerText, 10);

      const layersWrapper = utils.setCloneElement(billLayerWrapper);

      const dispatchWrapper = this.dispatchWrapper.bind(this, props);

      layersWrapper.addEventListener('click', dispatchWrapper);

      datepicker.init();
    }
  }

  dispatchWrapper(props, e) {
    const t = e.target;

    const addLevel = t.hasAttribute('add-bill-btn') ? 'add-level' : '';
    const removeLevel = t.classList.contains('bill-layer__remove') ? 'remove-lvl' : '';

    const button = addLevel || removeLevel;

    switch (button) {
      case 'add-level': {
        addBillLevel.init(props, e);
        break;
      }
      case 'remove-lvl': {
        removeBillLevel.init(props, e);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default BillLevel;
