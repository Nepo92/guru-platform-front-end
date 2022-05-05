import Utils from '../../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../../api/api.js';
import TabWrapper from '../../tabWrapper.js';

const utils = new Utils();

class TaskTabFromDealMenu extends TabWrapper {
  init(tabPack) {
    const { deal, menu, isChangeTab } = tabPack;

    const taskWrapper = menu.querySelector('[js-client-tasks]');

    const preloader = setTimeout(() => {
      const span = utils.setPreloaderToTab();
      taskWrapper.appendChild(span);
    }, 400);

    if (deal && isChangeTab) {
      const getTasks = this.getTasks(deal);

      getTasks.then((tasks) => {
        clearTimeout(preloader);
        tabPack.tasks = tasks;
        tabPack.isDealMenu = true;

        tabPack.start(tabPack);
      });
    } else if (!deal && isChangeTab) {
      clearTimeout(preloader);
      this.noProduct(taskWrapper);
    } else if (!isChangeTab && deal) {
      clearTimeout(preloader);
      tabPack.tasks = deal.reminders;
      tabPack.isDealMenu = true;

      tabPack.start(tabPack);
    }
  }

  async getTasks(deal) {
    const dealData = await dealAPI.getDeal({ id: deal.id || deal });

    return dealData.reminders;
  }
}

export default TaskTabFromDealMenu;
