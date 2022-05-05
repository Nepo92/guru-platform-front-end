import { dealAPI } from '../../../../../api/api.js';
import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class DealTab {
  init(tabPacks) {
    const { idClient, client } = tabPacks;

    const menu = document.querySelector('[js-menu-client-card]');

    const dealWrapper = menu.querySelector('[js-client-deals]');

    const preloader = setTimeout(() => {
      const span = utils.setPreloaderToTab();
      dealWrapper.appendChild(span);
    }, 400);

    const getDeals = dealAPI.getDeals(idClient || client.id);

    getDeals.then((deals) => {
      clearTimeout(preloader);
      tabPacks.deals = this.sortingDeals(deals);

      const dealTabObserver = tabPacks.dealTabObs;

      const items = [dealTabObserver];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(tabPacks);
      });
    });
  }

  sortingDeals(deals) {
    return deals.sort((a, b) => b.id - a.id);
  }
}

export default DealTab;
