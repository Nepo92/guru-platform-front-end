import { taskAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';
import Validation from '../../../../../../utils/validation.js';
import Tooltip from '../../../../../../modules/tooltip/tooltip.js';
import TaskObserver from '../taskObserver.js';
import Datepicker from '../../../../../../modules/datepicker/datepicker.js';
import AfterSaveTask from './events/afterSaveTask.js';

const utils = new Utils();
const validation = new Validation();
const tooltip = new Tooltip();
const afterSaveTask = new AfterSaveTask();
const datepicker = new Datepicker();

class AddTask extends TaskObserver {
  constructor() {
    super();
  }

  init(props) {
    const { menu } = props;

    if (menu) {
      const addButton = menu.querySelector('[task-new-btn]');

      if (addButton) {
        const addTask = this.addTask.bind(this, props);
        const add = utils.setCloneElement(addButton);

        add.addEventListener('click', addTask);
      }

      const date = menu.querySelector('.menu-tasks__datepicker');

      if (date) {
        const dateInput = utils.setCloneElement(date);
        const changeDate = this.changeDate.bind(this, props);

        this.arr = [];

        dateInput.addEventListener('input', changeDate);

        this.setDatepicker(props);
      }
    }
  }

  setDatepicker(props) {
    const { menu } = props;

    const dateRequest = menu.querySelector('[date-request]').value;
    datepicker.init(props);

    menu.querySelector('[date-request]').value = dateRequest;
  }

  changeDate(props, e) {
    const t = e.target;

    const tooltipListener = tooltip.tooltipListener.bind(this);
    tooltipListener('tooltip__date-task');

    if (!validation.validateDate(t.value)) {
      const startTimeoutHint = this.hintTimeOut(t);
      this.arr.push(startTimeoutHint);
    }
  }

  hintTimeOut(t) {
    const setHint = tooltip.tooltipInit.bind(this, t, 'tooltip__date-task');
    return setTimeout(setHint, 900);
  }

  addTask(props, e) {
    const { menu, deal } = props;
    const t = e.target;

    const form = menu.querySelector('.menu-tasks__form');
    const date = form.querySelector('.menu-tasks__datepicker').value.trim();

    if (validation.validateTask(form) && validation.validateDate(date)) {
      t.style.pointerEvents = 'none';

      const data = {
        idDeal: deal.id || deal,
        reminderDate: date,
        reminderMessage: form.querySelector('[js-task-message]').value.trim(),
      };

      const saveTask = taskAPI.saveTask(data);

      saveTask.then(
        (saved) => {
          props.target = t;
          const updateInTable = this.updateInTable.bind(this);
          props.updateInTable = updateInTable;

          const items = [afterSaveTask];

          if (typeof deal === 'number') {
            const id = deal;

            props.deal = {
              id,
              reminders: [],
            };

            this.addReminder(props, saved);
          } else {
            this.addReminder(props, saved);
          }

          items.forEach((item) => {
            const init = item.init.bind(item);
            init(props);
          });
        },
        () => {
          t.style.pointerEvents = 'all';
        },
      );
    }
  }

  addReminder(props, saved) {
    if (props.pack.items) {
      const currentDeal = props.pack.items.find((el) => el.id === props.deal.id);

      if (currentDeal) {
        currentDeal.reminders.push(saved);
      } else {
        this.#addReminderToDeal(props, saved);
      }
    } else {
      this.#addReminderToDeal(props, saved);
    }
  }

  #addReminderToDeal(props, saved) {
    const deal = props.deals.find((el) => el.id === props.deal.id);

    deal.reminders.push(saved);
  }
}

export default AddTask;
