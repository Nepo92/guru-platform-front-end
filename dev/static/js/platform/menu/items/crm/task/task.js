import Utils from '../../../../utils/utils.js';
import TaskEvents from './taskEvents.js';
import TaskTemplates from './templates/taskTemplates.js';

const taskTemplates = new TaskTemplates();
const utils = new Utils();
const taskEvents = new TaskEvents();

class Task {
  init(taskPack) {
    const props = this.#getProps(taskPack);
    const render = this.#render(props);

    render.then(() => {
      const items = [taskEvents];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  #getProps(taskPack) {
    const { isDealMenu, deal } = taskPack;

    let menu;

    if (isDealMenu) {
      menu = document.querySelector('[js-menu-deal]');
    } else {
      menu = document.querySelector('[js-menu-client-card]');
    }

    taskPack.menu = menu;
    taskPack.tasks = [];

    if (deal) {
      const dealFromPack = taskPack.pack.items?.find((el) => el.id === deal.id);
      const dealFromDeals = taskPack.deals?.find((el) => el.id === deal.id);

      taskPack.tasks = [...dealFromPack?.reminders || dealFromDeals?.reminders || deal.reminders];
    }

    return taskPack;
  }

  async #render(props) {
    const {
      menu,
      tasks,
      idClient,
      isDealMenu,
      isView,
    } = props;

    const tasksWrapper = menu.querySelector('[js-client-tasks]');

    utils.removeChildren(tasksWrapper);

    if (tasks?.length) {
      const taskSorted = utils.sortingArrayTasks(tasks);

      taskSorted.forEach(async (item) => {
        const div = document.createElement('div');
        div.classList.add('task__item');
        div.setAttribute('data-deal', item.idDeal);
        div.setAttribute('data-client', idClient);
        div.setAttribute('data-id', item.id);
        div.innerHTML = taskTemplates.renderTask(item, isView);

        await tasksWrapper.appendChild(div);
      });
    } else if ((!tasks?.length && !isDealMenu) || (!tasks?.length && isView)) {
      const span = document.createElement('span');
      span.classList.add('platform__empty');
      span.innerText = 'Нет задач...';
      tasksWrapper.appendChild(span);
    }

    if (isDealMenu && !isView) {
      const div = document.createElement('div');
      div.classList.add('menu__tasks');

      if (tasks.length) {
        div.classList.add('full');
      }

      div.innerHTML = taskTemplates.taskNav(props);

      await tasksWrapper.appendChild(div);
    }
  }
}

export default Task;
