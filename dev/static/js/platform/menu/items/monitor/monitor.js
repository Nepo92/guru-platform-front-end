import MonitorEvents from './events/monitorEvents.js';

const monitorEvents = new MonitorEvents();

class Monitor {
  init(props) {
    const items = [monitorEvents];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default Monitor;
