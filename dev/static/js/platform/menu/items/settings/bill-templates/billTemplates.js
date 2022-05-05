import Utils from '../../../../utils/utils.js';
import AddBillTemplate from './events/addBillTemplate.js';
import EditBillTemplate from './events/editBillTemplate.js';
import AddLayer from './events/layer/addLayer.js';

const addBillTemplate = new AddBillTemplate();
const utils = new Utils();
const editBillTemplate = new EditBillTemplate();
const addLayer = new AddLayer();

class BillTemplates {
  init(props) {
    utils.hideLoader();

    const items = [editBillTemplate, addLayer, addBillTemplate];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default BillTemplates;
