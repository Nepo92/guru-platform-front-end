import ClientCard from '../../../menu/items/crm/clientCard/clientCard.js';
import DealCard from '../../../menu/items/crm/dealCard/dealCard.js';
import CreateClient from '../../../menu/items/crm/createClient/createClient.js';
import Monitor from '../../../menu/items/monitor/monitor.js';
import Filter from '../../../modules/filter/filter.js';
import DealRowEvents from '../../../menu/items/crm/dealRow/dealRowEvents.js';
import SearchClient from '../../../menu/items/crm/searchClient/searchClient.js';
import ContentManager from '../../../contentManager/contentManager.js';

const clientCard = new ClientCard();
const dealCard = new DealCard();
const createClient = new CreateClient();
const monitor = new Monitor();
const filter = new Filter();
const dealRowEvents = new DealRowEvents();
const searchClient = new SearchClient();

class ManagerEvents {
  init(pack) {
    const items = [
      clientCard,
      dealCard,
      createClient,
      monitor,
      filter,
      dealRowEvents,
      searchClient,
    ];

    pack.rowEventsObs = dealRowEvents;
    pack.clientCardObs = clientCard;
    pack.rerenderContent = new ContentManager();

    items.forEach((item) => {
      item.init(pack);
    });
  }
}

export default ManagerEvents;
