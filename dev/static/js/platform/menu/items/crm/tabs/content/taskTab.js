import TaskTabFromClientMenu from './taskTab/events/taskTabFromClientMenu.js';
import TaskTabFromDealMenu from './taskTab/events/taskTabFromDealMenu.js';
import Utils from '../../../../../utils/utils.js';

const taskTabFromClientMenu = new TaskTabFromClientMenu();
const taskTabFromDealMenu = new TaskTabFromDealMenu();
const utils = new Utils();

class TaskTab {
  init(tabPack) {
    const menu = utils.getActiveMenu();

    tabPack.menu = menu;

    const items = [];

    if (menu.hasAttribute('js-menu-client-card')) {
      items.length = 0;
      items.push(taskTabFromClientMenu);
    } else {
      items.length = 0;
      items.push(taskTabFromDealMenu);
    }

    tabPack.tabTaskObs = new TaskTab();
    const start = this.start.bind(this);
    tabPack.start = start;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tabPack);
    });
  }

  start(tabPack) {
    const { taskTabObserver } = tabPack;
    const items = [taskTabObserver];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tabPack);
    });
  }
}

export default TaskTab;
