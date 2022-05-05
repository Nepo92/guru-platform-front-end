import OpenProduct from './openProducts.js';
import CloseProduct from './closeProduct.js';
import DealFields from '../../dealFields.js';

const openProduct = new OpenProduct();
const closeProduct = new CloseProduct();

class ChangeStatus extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    const { status } = dealPack;

    if (status) {
      const changeDealStatus = this.changeDealStatus.bind(this, dealPack);
      status.addEventListener('change', changeDealStatus);
    }
  }

  changeDealStatus(dealPack, e) {
    const props = {
      ...dealPack,
    };

    props.dealStatus = +e.target.value;

    let toggle;

    if (props.dealStatus !== 1) {
      toggle = openProduct.init.bind(openProduct);
    } else {
      toggle = closeProduct.init.bind(closeProduct);
    }

    toggle(props);

    this.change(props);
  }
}

export default ChangeStatus;
