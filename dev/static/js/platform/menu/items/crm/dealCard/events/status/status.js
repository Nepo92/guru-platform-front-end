import ChangeStatus from './events/changeStatus.js';
import Indicator from '../indicator/indicator.js';
import IndicatorNow from '../indicator/events/indicatorNow.js';

const changeStatus = new ChangeStatus();
const indicator = new Indicator();
const indicatorNow = new IndicatorNow();

class Status {
  init(dealCardPack) {
    const selects = document.querySelectorAll('[data-select-type="status-deal"]');

    if (selects.length) {
      const items = [changeStatus, indicator, indicatorNow];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(dealCardPack);
      });
    }
  }
}

export default Status;
