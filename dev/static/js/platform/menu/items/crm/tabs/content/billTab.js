import BillTabClientMenu from './billTab/events/billTabClientMenu.js';
import BillTabDealMenu from './billTab/events/billTabDealMenu.js';
import Utils from '../../../../../utils/utils.js';

const tabClientMenu = new BillTabClientMenu();
const tabDealMenu = new BillTabDealMenu();
const utils = new Utils();

class BillTab {
  init(props) {
    const {
      target,
      billTabObserver,
      deal,
      idDeal,
      menu,
      defaultTab,
      idClient,
      pack,
      client,
      isView,
      isCreate,
    } = props;

    const tabProps = {
      target,
      billTabObserver,
      deal,
      idDeal,
      menu,
      defaultTab,
      idClient,
      pack,
      client,
      isView,
      isCreate,
    };

    if (props.notValidBills) {
      tabProps.notValidBills = utils.getDeepCopy(props.notValidBills);
    }

    if (props.needRemoveBillId) {
      tabProps.needRemoveBillId = props.needRemoveBillId;
    }

    const items = [];

    const isMenuDeal = menu.hasAttribute('js-menu-deal');

    if (isMenuDeal) {
      items.length = 0;
      items.push(tabDealMenu);
    } else {
      items.length = 0;
      items.push(tabClientMenu);
    }

    tabProps.tabBillObs = new BillTab();

    const start = this.start.bind(this);
    tabProps.start = start;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tabProps);
    });
  }

  start(tabProps) {
    const { billTabObserver } = tabProps;

    const items = [billTabObserver];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tabProps);
    });
  }
}

export default BillTab;
