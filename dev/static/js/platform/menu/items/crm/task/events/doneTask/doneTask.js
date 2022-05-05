import { taskAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';
import TaskObserver from '../taskObserver.js';
import AfterCompleteTask from './events/afterCompleteTask.js';
import Popup from '../../../../../../modules/popup/popup.js';

const afterCompleteTask = new AfterCompleteTask();
const utils = new Utils();
const popup = new Popup();

class DoneTask extends TaskObserver {
  constructor() {
    super();
  }

  init(props) {
    const { menu } = props;

    if (menu) {
      const completeBtn = menu.querySelectorAll('.task__complete');

      if (completeBtn.length) {
        const completeTask = this.completeTask.bind(this, props);

        completeBtn.forEach((item) => {
          const complete = utils.setCloneElement(item);
          complete.addEventListener('click', completeTask);
        });
      }
    }
  }

  completeTask(props, e) {
    const t = e.target;
    props.target = t;

    const acceptRequest = this.accept.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите завершить эту задачу?',
      settings: null,
      title: null,
      ok: acceptRequest,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  accept(props) {
    const { target } = props;

    const task = utils.getParent(target, 'task__item');

    const data = {
      id: +task.getAttribute('data-id'),
      isDone: true,
    };

    props.completedTask = data.id;

    target.style.pointerEvents = 'none';

    taskAPI.completeTask(data).then(() => {
      target.style.pointerEvents = 'all';
      const tabsObserver = props.tabTaskObs;
      const updateInTable = this.updateInTable.bind(this);
      props.updateInTable = updateInTable;

      const items = [afterCompleteTask, tabsObserver];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    }, () => {
      target.style.pointerEvents = 'all';
    });
  }
}

export default DoneTask;
