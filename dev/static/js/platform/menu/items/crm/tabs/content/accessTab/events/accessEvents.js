import ChangeStopLesson from './stopLesson/stopLesson.js';
import ChangeAccess from './cangeAccess/changeAccess.js';

const changeStopLesson = new ChangeStopLesson();
const changeAccess = new ChangeAccess();

class AccessEvents {
  init(tabPack) {
    const items = [changeStopLesson, changeAccess];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tabPack);
    });
  }
}

export default AccessEvents;
