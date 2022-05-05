import Utils from '../../../../../../utils/utils.js';
import { taskAPI } from '../../../../../../api/api.js';
import TaskObserver from '../taskObserver.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

const DEALS = 'deals';
const TRANSACTIONS = 'transactions';
const HEAD_MANAGER_TRANSACTIONS = 'head-manager-transactions';

class RemoveTask extends TaskObserver {
  constructor() {
    super();
  }

  init(props) {
    const { menu } = props;

    if (menu) {
      const removeBtns = menu.querySelectorAll('.task__remove');

      if (removeBtns.length) {
        const removeTask = this.removeTask.bind(this, props);

        removeBtns.forEach((item) => {
          const remove = utils.setCloneElement(item);

          remove.addEventListener('click', removeTask);
        });
      }
    }
  }

  removeTask(props, e) {
    const t = e.target;
    props.target = t;

    const acceptRequest = this.acceptRemove.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить эту задачу ?',
      settings: null,
      title: null,
      ok: acceptRequest,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  acceptRemove(props) {
    const { target } = props;

    const taskId = +utils.getParent(target, 'task__item').getAttribute('data-id');

    target.style.pointerEvents = 'none';

    taskAPI.deleteTask(taskId).then(() => {
      target.style.pointerEvents = 'all';

      if (props.pack.items) {
        const currentItem = props.pack.items.find((el) => el.id === props.deal.id);

        if (currentItem) {
          currentItem.reminders = [...currentItem.reminders.filter((el) => el.id !== taskId)];

          if (props.deal) {
            props.deal.reminders = [...props.deal.reminders.filter((el) => el.id !== taskId)];
          }
        } else {
          this.#removeReminderFromDeal(props, taskId);
        }
      } else {
        this.#removeReminderFromDeal(props, taskId);
      }

      const updateInDealCard = props.dealObs.init.bind(props.dealObs);
      updateInDealCard(props);

      const access = [DEALS, TRANSACTIONS, HEAD_MANAGER_TRANSACTIONS];

      if (access.includes(utils.getPage())) {
        this.updateInTable(props);
      }

      props.tabTaskObs.init(props);
    }, () => {
      target.style.pointerEvents = 'all';
    });
  }

  #removeReminderFromDeal(props, taskId) {
    const currentItem = props.deals.find((el) => el.id === props.deal.id);
    currentItem.reminders = [...currentItem.reminders.filter((el) => el.id !== taskId)];

    if (props.deal) {
      props.deal.reminders = [...props.deal.reminders.filter((el) => el.id !== taskId)];
    }

    if (props.tasks) {
      props.tasks = [...props.tasks.filter((el) => el.id !== taskId)];
    }
  }
}

export default RemoveTask;
