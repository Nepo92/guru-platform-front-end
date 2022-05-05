import CreateEvents from '../../createEvents/createEvents.js';

const createEvents = new CreateEvents();

class AfterRender {
  init(props) {
    const items = [createEvents];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default AfterRender;
