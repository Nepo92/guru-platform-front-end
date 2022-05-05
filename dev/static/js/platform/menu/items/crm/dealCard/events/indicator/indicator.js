import IndicatorHistoryChanges from './events/indicatorHistoryChanges.js';

const indicatorHistoryChanges = new IndicatorHistoryChanges();

class Indicator {
  init(dealCardPack) {
    const items = [indicatorHistoryChanges];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealCardPack);
    });
  }
}

export default Indicator;
