import { dealAPI, billAPI } from '../../../../../../../api/api.js';
import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class BillTabClientMenu {
  init(tabProps) {
    const { defaultTab, idClient, client } = tabProps;

    const props = {
      ...tabProps,
      menu: document.querySelector('[js-menu-client-card]'),
    };

    const { menu } = props;

    if (defaultTab === 'Сделки') {
      const getDeals = dealAPI.getDeals(idClient || client.id);

      const billWrapper = menu.querySelector('[js-client-bills]');

      const preloader = setTimeout(() => {
        const span = utils.setPreloaderToTab();
        billWrapper.appendChild(span);
      }, 400);

      getDeals.then((deals) => {
        if (deals.length) {
          const getBills = this.getBillsData(deals);

          getBills.then((data) => {
            clearTimeout(preloader);

            utils.unBlockTabs(props);
            props.bills = data;
            tabProps.start(props);
          }, () => {
            clearTimeout(preloader);
            utils.unBlockTabs(props);
          });
        } else {
          clearTimeout(preloader);
          utils.unBlockTabs(props);
          props.bills = [];
          tabProps.start(props);
        }
      }, () => {
        clearTimeout(preloader);
        utils.unBlockTabs(props);
      });
    }
  }

  async getBillsData(deals) {
    const billsArray = [];

    for (let index = 0; index < deals.length; index++) {
      const deal = deals[index];

      const data = {
        id: deal.id,
      };

      const bills = await billAPI.getBills(data);

      const getBillsArray = await this.getBillItems(bills);

      if (getBillsArray.length) {
        getBillsArray.forEach((item) => {
          billsArray.push(item);
        });
      }
    }

    return billsArray;
  }

  async getBillItems(billsData) {
    const billsItems = [];

    for (let count = 0; count < billsData.length; count++) {
      const bill = billsData[count];

      await billsItems.push(bill);
    }

    return await billsItems;
  }
}

export default BillTabClientMenu;
