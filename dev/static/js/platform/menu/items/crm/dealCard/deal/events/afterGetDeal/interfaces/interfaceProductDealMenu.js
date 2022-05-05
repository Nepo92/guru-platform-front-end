import Utils from '../../../../../../../../utils/utils.js';
import Tariff from '../dealItems/product/tariff/tariff.js';
import StartDate from '../dealItems/product/startDate/startDate.js';
import Price from '../dealItems/product/price/price.js';
import { dealAPI } from '../../../../../../../../api/api.js';

const utils = new Utils();
const tariff = new Tariff();
const stream = new StartDate();
const price = new Price();

class InterfaceProductDealMenu {
  change(props) {
    const { menu } = props;
    const productSelect = menu.querySelector('[data-select-type="select-product"] [id-selected]');

    if (productSelect) {
      const productClone = utils.setCloneElement(productSelect);

      const changeProducut = this.#changeProducut.bind(this, props);
      productClone.addEventListener('change', changeProducut);
    }
  }

  #changeProducut(props) {
    const getProductData = this.getProductData.bind(this, props);

    getProductData.then(() => {

    });
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

    dealAPI.getTariff(dataTariff).then((tariffs) => getStreams.then((streams) => {
      props.pack.tariffs = tariffs;
      props.pack.streams = streams;

      const items = [tariff, stream, price];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
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

export default InterfaceProductDealMenu;
