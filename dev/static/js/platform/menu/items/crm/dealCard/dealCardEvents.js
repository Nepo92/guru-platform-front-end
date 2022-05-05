import Status from './events/status/status.js';
import Tooltip from '../../../../modules/tooltip/tooltip.js';
import Deal from './deal/deal.js';
import DealViewManager from './dispatch/dealViewManager.js';
import DealCreateManager from './dispatch/dealCreateManager.js';
import DealHideManager from './dispatch/dealHideManager.js';
import DealShowManager from './dispatch/dealShowManager.js';
import Utils from '../../../../utils/utils.js';
import OpenTaskMenuDealCard from './events/openTaskMenuDealCard/openTaskMenuDealCard.js';
import AfterGetDeal from './deal/events/afterGetDeal/afterGetDeal.js';
import CloseMenu from '../dealRow/events/openCourse/closeMenu/closeMenu.js';

const status = new Status();
const tooltip = new Tooltip();
const dealViewManager = new DealViewManager();
const dealCreateManager = new DealCreateManager();
const dealHideManager = new DealHideManager();
const dealShowManager = new DealShowManager();
const deal = new Deal();
const utils = new Utils();
const openTaskMenuDealCard = new OpenTaskMenuDealCard();

class DealCardEvents {
  init(tabsData) {
    const props = this.#getProps(tabsData);

    const items = [
      status,
      tooltip,
      dealHideManager,
      dealShowManager,
      dealViewManager,
      dealCreateManager,
      openTaskMenuDealCard,
    ];

    utils.hideLoader();

    props.showManager = dealShowManager;
    props.hideManager = dealHideManager;
    props.afterGetDeal = new AfterGetDeal();
    props.closeDealMenu = new CloseMenu();

    tabsData.dealObs = deal;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  #getProps(tabsData) {
    const {
      pack,
      idClient,
      menu,
      tabsObs,
      deals,
      dealTabObs,
      client,
      clientCardObs,
      rowEventsObs,
      rerenderContent,
      user,
    } = tabsData;

    const props = {
      pack,
      idClient,
      menu,
      dealObs: deal,
      tabsObs,
      deals,
      dealTabObs,
      clientCardObs,
      rowEventsObs,
      client,
      user,
      rerenderContent,
    };

    return props;
  }
}

export default DealCardEvents;
