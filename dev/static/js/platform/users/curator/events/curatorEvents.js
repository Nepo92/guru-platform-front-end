import Homework from '../../../menu/items/products/homework/homework.js';
import OpenCourse from '../../../menu/items/crm/dealRow/events/openCourse/openEditMenu/openCourse.js';
import OpenClientCard from '../../../menu/items/crm/clientCard/events/openClientCard/openClientCard.js';
import CloseClientCard from '../../../menu/items/crm/clientCard/events/closeClientCard.js';

const homework = new Homework();
const openCourse = new OpenCourse();
const openClientCard = new OpenClientCard();
const closeClientCard = new CloseClientCard();

class CuratorEvents {
  init(props) {
    const items = [
      homework,
      openCourse,
      openClientCard,
      closeClientCard,
    ];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default CuratorEvents;
