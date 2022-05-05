import ClientCard from '../../../menu/items/crm/clientCard/clientCard.js';
import DealCard from '../../../menu/items/crm/dealCard/dealCard.js';
import Monitor from '../../../menu/items/monitor/monitor.js';
import Filter from '../../../modules/filter/filter.js';
import CreateClient from '../../../menu/items/crm/createClient/createClient.js';
import DealRowEvents from '../../../menu/items/crm/dealRow/dealRowEvents.js';
import Downloads from '../../../modules/downloads/downloads.js';
import SearchClient from '../../../menu/items/crm/searchClient/searchClient.js';
import ContentManager from '../../../contentManager/contentManager.js';

const clientCard = new ClientCard();
const dealCard = new DealCard();
const monitor = new Monitor();
const filter = new Filter();
const createClient = new CreateClient();
const dealRowEvents = new DealRowEvents();
const downloads = new Downloads();
const searchClient = new SearchClient();

class HeadManagerEvents {
  init(props) {
    const items = [
      createClient,
      clientCard,
      dealCard,
      monitor,
      filter,
      dealRowEvents,
      downloads,
      searchClient,
    ];

    props.rowEventsObs = dealRowEvents;
    props.clientCardObs = clientCard;
    props.rerenderContent = new ContentManager();

    items.forEach((item) => {
      item.init(props);
    });
  }
}

export default HeadManagerEvents;
