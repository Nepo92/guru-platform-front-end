import DealType from '../dealItems/dealType/dealType.js';
import Utils from '../../../../../../../../utils/utils.js';

const dealType = new DealType();
const utils = new Utils();

class InterfaceDealType {
  change(props) {
    const dealTypeSelect = document.querySelector('[name="dealType"]');

    if (dealTypeSelect) {
      const cloneDealTypeSelect = utils.setCloneElement(dealTypeSelect);

      const changeDealType = dealType.changeDealType.bind(dealType, props);

      cloneDealTypeSelect.addEventListener('change', changeDealType);
    }
  }
}

export default InterfaceDealType;
