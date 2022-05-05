import { dealAPI } from '../../../../../../api/api.js';
import AfterGetDeal from './afterGetDeal/afterGetDeal.js';
import Utils from '../../../../../../utils/utils.js';

const afterGetDeal = new AfterGetDeal();
const utils = new Utils();

class DealEvents {
  init(dealPack) {
    const dealEventsData = this.getProps(dealPack);

    const { idDeal } = dealEventsData;

    const getDeal = dealAPI.getDeal({
      id: idDeal,
    });

    getDeal.then((deal) => {
      dealEventsData.deal = deal;

      const after = afterGetDeal.init.bind(afterGetDeal);
      after(dealEventsData);
    });
  }

  getProps(dealPack) {
    const { target } = dealPack;
    let idDeal;

    if (!dealPack.idDeal) {
      idDeal = +utils.getParent(target, 'deal-card').getAttribute('data-deal');
    } else {
      idDeal = dealPack.idDeal;
    }

    const {
      menu,
      pack,
      tabsObs,
      dealTabObs,
      deals,
      idClient,
      isView,
      user,
      client,
      activeTab,
      defaultTab,
      rowEventsObs,
      clientCardObs,
      rerenderContent,
    } = dealPack;

    return {
      idDeal,
      menu,
      pack,
      tabsObs,
      dealTabObs,
      deals,
      idClient,
      isView,
      user,
      client,
      activeTab,
      defaultTab,
      rowEventsObs,
      clientCardObs,
      rerenderContent,
    };
  }
}

export default DealEvents;
