import OpenProduct from './openProducts.js';
import CloseProduct from './closeProduct.js';
import ChangeStatus from './changeStatus.js';

const openProduct = new OpenProduct();
const closeProduct = new CloseProduct();
const changeStatus = new ChangeStatus();

class SetStatus {
  init(dealPack) {
    const {
      menu,
      deal,
      isView,
    } = dealPack;

    const statusSelect = menu.querySelector('[data-select-type="select-status"]');

    this.dispatchViewMode(isView, statusSelect);

    const statusEventsProps = {
      statusSelect,
      dealPack,
      deal,
    };

    this.setStatusEvents(statusEventsProps);
  }

  dispatchViewMode(isView, statusSelect) {
    if (isView) {
      statusSelect.classList.add('disable');
    } else {
      statusSelect.classList.remove('disable');
    }
  }

  setStatusEvents(props) {
    const {
      statusSelect,
      dealPack,
      deal,
    } = props;

    const statusSelected = statusSelect.querySelector('[id-selected]');
    dealPack.status = statusSelected;

    statusSelected.value = deal ? deal.status : '';

    const items = [changeStatus, openProduct, closeProduct];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealPack);
    });
  }
}

export default SetStatus;
