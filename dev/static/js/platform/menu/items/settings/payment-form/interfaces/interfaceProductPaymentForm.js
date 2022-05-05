import { dealAPI, tariffAPI } from '../../../../../api/api.js';
import Tariff from '../../../crm/dealCard/deal/events/afterGetDeal/dealItems/product/tariff/tariff.js';
import ChangeStreams from '../builder/events/formTypes/withChoice/events/events/changeStreams.js';

const tariff = new Tariff();
const changeStreams = new ChangeStreams();

class InterfaceProductPaymentForm {
  change(props) {
    const { menu } = props;

    const productSelect = menu.querySelector('[data-select-type="select-product"] [id-selected]');

    if (productSelect) {
      const changeProduct = this.changeProduct.bind(this, props);
      productSelect.addEventListener('change', changeProduct);
    }
  }

  changeProduct(props, e) {
    const t = e.target;

    const getCourseData = this.getCourseData(t);

    getCourseData.then((data) => {
      const [tariffs, streams] = data;
      props.pack.tariffs = tariffs;
      props.pack.streams = streams;
      props.isCurrentForm = true;

      tariff.init(props);
      changeStreams.init(props);
    });
  }

  async getCourseData(t) {
    const tariffs = await this.getTariffs(t);
    const streams = await this.getStreams(t);

    return [tariffs, streams];
  }

  async getTariffs(t) {
    const data = {
      id: t.value,
    };

    return await tariffAPI.getTariffs(data);
  }

  async getStreams(t) {
    const formDataStreams = new FormData();
    formDataStreams.set('idCourse', t.value);

    return await dealAPI.getStreams(formDataStreams);
  }
}

export default InterfaceProductPaymentForm;
