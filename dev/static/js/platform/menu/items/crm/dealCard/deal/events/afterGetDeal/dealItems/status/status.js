import SetStatus from './events/setStatus.js';

const setStatus = new SetStatus();

class Status {
  init(dealPack) {
    const items = [setStatus];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealPack);
    });
  }
}

export default Status;
