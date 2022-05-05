import Filter from '../../../modules/filter/filter.js';

const filter = new Filter();

class ControlEvents {
  init(props) {
    const items = [
      filter,
    ];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default ControlEvents;
