import Utils from '../../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../../api/api.js';

const utils = new Utils();

class TaskTabFromClientMenu {
  init(tabPack) {
    const {
      idClient,
      menu,
      client,
    } = tabPack;

    const getDeals = dealAPI.getDeals(idClient || client.id);

    const taskItems = [];

    const taskWrapper = menu.querySelector('[js-client-tasks]');

    const preloader = setTimeout(() => {
      const span = utils.setPreloaderToTab();
      taskWrapper.appendChild(span);
    }, 400);

    getDeals.then((deals) => {
      clearTimeout(preloader);

      deals.forEach((item) => {
        if (item.reminders.length) {
          item.reminders.forEach((elem) => {
            taskItems.push(elem);
          });
        }
      });

      tabPack.tasks = [...taskItems];

      tabPack.start(tabPack);
    });
  }
}

export default TaskTabFromClientMenu;
