import User from '../user.js';
import CuratorEvents from './events/curatorEvents.js';

const curatorEvents = new CuratorEvents();

class Curator extends User {
  init(props) {
    const items = [curatorEvents];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default Curator;
