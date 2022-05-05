import Utils from '../../../../../../utils/utils.js';
import PlanFunnel from '../planFunnel/planFunnel.js';
import RenderPlanFunnels from '../render/renderPlanFunnels.js';
import IRemovePlanFunnel from '../planFunnel/removePlanFunnel/iRemovePlanFunnel.js';
import ManagerPlan from './managerPlan.js';

const utils = new Utils();
const planFunnel = new PlanFunnel();
const renderPlanFunnels = new RenderPlanFunnels();
const iRemovePlanFunnel = new IRemovePlanFunnel();
const managerPlan = new ManagerPlan();

class IManagerPlan {
  init(props) {
    props.saveBoard = document.querySelector('[save-board]');
    props.deleteBoard = document.querySelector('[delete-board]');
    props.deleteManagerBoard = document.querySelector('[delete-manager-board]');
    props.contentWrapper = document.querySelector('.plans-add__content');

    this.#changeValueInput(props);
    this.#savePlan(props);
    this.#removeNamanagersBtn(props);
    this.#cancel(props);
    this.#removeManagerRow(props);
  }

  #changeValueInput(props) {
    const funnelInputs = document.querySelectorAll('[funnel-input]');

    if (funnelInputs.length) {
      const changeValue = this.#changeValue.bind(this, props);

      funnelInputs.forEach((item) => {
        item.addEventListener('keyup', changeValue);
      });
    }
  }

  #savePlan(props) {
    const saveChangesBtn = document.querySelector('.plans-add__save-button');

    if (saveChangesBtn) {
      const save = utils.setCloneElement(saveChangesBtn);

      const saveChanges = this.#saveChanges.bind(this, props);

      save.addEventListener('click', saveChanges);
    }
  }

  #removeNamanagersBtn(props) {
    const removeManagerBtns = document.querySelectorAll('.funnel-manager__delete-btn');

    if (removeManagerBtns.length) {
      const removeManager = this.#removeManager.bind(this, props);

      removeManagerBtns.forEach((item) => {
        const removeBtn = utils.setCloneElement(item);

        removeBtn.addEventListener('click', removeManager);
      });
    }
  }

  #cancel(props) {
    const cancelBtn = document.querySelectorAll('.plans-add__cancel-button');

    if (cancelBtn.length) {
      const cancelAction = this.#cancelAction.bind(this, props);

      cancelBtn.forEach((item) => {
        const cancel = utils.setCloneElement(item);
        cancel.addEventListener('click', cancelAction);
      });
    }
  }

  #changeValue(props) {
    const {
      deleteBoard,
      deleteManagerBoard,
      saveBoard,
      contentWrapper,
    } = props;

    [deleteBoard, deleteManagerBoard].forEach((item) => {
      if (item.classList.contains('open')) {
        item.classList.remove('open');
        contentWrapper.classList.remove('open');
      }
    });

    setTimeout(() => {
      if (!saveBoard.classList.contains('open')) {
        saveBoard.classList.add('open');
        contentWrapper.classList.add('open');
      }
    }, 400);
  }

  #removeManager(props, e) {
    const t = e.target;
    props.target = t;

    const {
      deleteBoard,
      deleteManagerBoard,
      saveBoard,
      contentWrapper,
    } = props;

    [deleteBoard, saveBoard, contentWrapper].forEach((item) => {
      item.classList.remove('open');
    });

    setTimeout(() => {
      if (!deleteManagerBoard.classList.contains('open')) {
        deleteManagerBoard.classList.add('open');
        contentWrapper.classList.add('open');
      }
    }, 400);
  }

  #cancelAction(props, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const {
      deleteBoard,
      deleteManagerBoard,
      saveBoard,
      contentWrapper,
    } = props;

    [deleteBoard, saveBoard, deleteManagerBoard, contentWrapper].forEach((item) => {
      item.classList.remove('open');
      contentWrapper.classList.remove('open');
    });
  }

  #saveChanges(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const {
      pack,
      year,
      month,
    } = props;
    const { plans } = pack;

    const t = e.target;

    props.target = t;

    const save = planFunnel.save(props);

    if (props.removedManagers?.length) {
      props.removedManagers.forEach((item) => {
        managerPlan.remove(item);
      });
    }

    save.then((plan) => {
      const findPack = {
        plan,
        year,
        month,
      };

      const replaceCurrentPlan = this.#replaceCurrentPlan.bind(this, findPack);

      pack.plans = [...plans.map(replaceCurrentPlan)];

      renderPlanFunnels.renderFunnelPlans(props).then(() => {
        this.#cancelAction(props);

        const items = [
          props.iManagerPlan,
          props.iPlanFunnel,
          iRemovePlanFunnel,
          props.iPlan,
        ];

        items.forEach((item) => {
          const init = item.init.bind(item);
          init(props);
        });
      });
    });
  }

  #replaceCurrentPlan(props, el) {
    const {
      plan,
      year,
      month,
    } = props;

    const current = el.year === year && el.month === month;

    return current ? plan : el;
  }

  #removeManagerRow(props) {
    const removeBtn = document.querySelector('.plans-add__delete-button--manager');

    if (removeBtn) {
      const cloneBtn = utils.setCloneElement(removeBtn);

      const removeManager = this.#removeManagerFromTable.bind(this, props);

      cloneBtn.addEventListener('click', removeManager);
    }
  }

  #removeManagerFromTable(props) {
    const { year, month } = props;
    const remove = managerPlan.remove(props);

    remove.then(() => {
      this.#cancelAction(props);

      planFunnel.save(props).then((plan) => {
        props.pack.plans = [...props.pack.plans.map((el) => {
          if (el.year === year && el.month === month) {
            return plan;
          }

          return el;
        })];

        props.iPlan.init(props);
      });
    });
  }
}

export default IManagerPlan;
