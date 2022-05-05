import Utils from '../../../../../../../utils/utils.js';
import { billAPI } from '../../../../../../../api/api.js';
import TabWrapper from '../../tabWrapper.js';

const utils = new Utils();

class BillTabDealMenu extends TabWrapper {
  init(tabProps) {
    const { deal, idDeal } = tabProps;

    const props = {
      ...tabProps,
      menu: document.querySelector('[js-menu-deal]'),
      defaultTab: 'Счета и платежи',
    };

    const { menu } = props;

    if (props.defaultTab === 'Счета и платежи') {
      const data = {
        id: deal?.id || idDeal || deal,
      };

      const billWrapper = menu.querySelector('[js-client-bills]');

      const preloader = setTimeout(() => {
        const span = utils.setPreloaderToTab();
        billWrapper.appendChild(span);
      }, 400);

      if (data.id) {
        const getData = this.getData(data, props);

        getData.then((billData) => {
          clearTimeout(preloader);
          const [bills, templates] = billData;

          props.bills = bills;
          props.templates = templates;
          tabProps.start(props);
        });
      } else {
        clearTimeout(preloader);
        this.noProduct(billWrapper);
      }
    }
  }

  async getData(data, props) {
    const bills = await billAPI.getBills(data);

    const access = ['ROLE_MANAGER', 'ROLE_HEAD_MANAGER'];

    let templates;

    if (access.includes(props.pack.role)) {
      templates = await billAPI.getBillTemplates();
    }

    const arr = [];

    arr.push(bills);

    if (templates) {
      arr.push(templates);
    }

    return arr;
  }
}

export default BillTabDealMenu;
