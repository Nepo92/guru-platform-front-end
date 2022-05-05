import Utils from '../../../../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../../../../api/api.js';
import StartDate from './startDate/startDate.js';
import Price from './price/price.js';
import Tariff from './tariff/tariff.js';
import DealFields from '../dealFields.js';

const utils = new Utils();
const stream = new StartDate();
const price = new Price();
const tariff = new Tariff();

class Product extends DealFields {
  init(props) {
    const {
      menu,
      isView,
      pack,
    } = props;

    props.isChangedTariff = false;

    if (props.currentForm) {
      props.deal = {
        ...props.currentForm,
      };
    }

    const productItem = menu.querySelector('[data-select-type="select-product"]');

    this.#setViewMode(isView, productItem);

    const idSelectInput = productItem.querySelector('[id-selected]');

    if (idSelectInput) {
      props.idSelectInput = idSelectInput;

      const { role } = pack;

      if (role !== 'ROLE_CURATOR') {
        this.#getProductData(props);
      } else {
        price.init(props);
      }

      const cloneInput = utils.setCloneElement(idSelectInput);

      const changeProduct = this.#changeProduct.bind(this, props);
      cloneInput.addEventListener('change', changeProduct);
    }
  }

  #changeProduct(props) {
    props.isChangedProduct = true;
    props.isChangedTariff = false;

    this.change(props);
    this.init(props);
  }

  #setViewMode(isView, productItem) {
    if (isView) {
      productItem.classList.add('disable');
    } else {
      productItem.classList.remove('disable');
    }
  }

  #getProductData(props) {
    const { idSelectInput } = props;

    if (idSelectInput.value) {
      this.#requestProductItems(idSelectInput, props);
    } else {
      this.#hideItems(props);
    }
  }

  #requestProductItems(idSelectInput, props) {
    const dataTariff = {
      id: idSelectInput.value,
    };

    const isAccess = this.#getAccess(props);

    const formDataStreams = new FormData();
    formDataStreams.set('idCourse', idSelectInput.value);

    let getStreams;

    if (isAccess) {
      getStreams = dealAPI.getStreams(formDataStreams);
    } else {
      getStreams = dealAPI.getManagerStreams(formDataStreams);
    }

    const loader = setTimeout(utils.showLoader, 400);

    dealAPI.getTariff(dataTariff).then((tariffs) => getStreams.then((streams) => {
      clearTimeout(loader);
      utils.hideLoader();

      props.pack.tariffs = tariffs;
      props.pack.streams = streams;

      const items = [tariff, stream, price];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    }, () => {
      clearTimeout(loader);
      utils.hideLoader();
    }));
  }

  #hideItems(props) {
    const { menu } = props;
    const tariffItem = menu.querySelector('[data-select-type="tariff-select"]');

    if (tariffItem) {
      tariffItem.classList.add('hide');

      stream.init(props);
      price.init(props);
    }
  }

  #getAccess(props) {
    const { pack } = props;
    const { role } = pack;

    const access = ['ROLE_ADMIN', 'ROLE_EXAMINER'];

    return access.includes(role);
  }
}

export default Product;
