import ClientCard from '../../../menu/items/crm/clientCard/clientCard.js';
import DealCard from '../../../menu/items/crm/dealCard/dealCard.js';
import Monitor from '../../../menu/items/monitor/monitor.js';
import DealRowEvents from '../../../menu/items/crm/dealRow/dealRowEvents.js';
import Filter from '../../../modules/filter/filter.js';

const clientCard = new ClientCard();
const dealCard = new DealCard();
const monitor = new Monitor();
const dealRowEvents = new DealRowEvents();
const filter = new Filter();

class ExaminerEvents {
  init(pack) {
    const items = [filter, clientCard, dealCard, monitor, dealRowEvents];

    items.forEach((item) => {
      item.init(pack);
    });
  }
}

export default ExaminerEvents;
