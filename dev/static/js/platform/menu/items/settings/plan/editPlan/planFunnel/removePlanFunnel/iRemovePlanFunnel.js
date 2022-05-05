import PlanFunnel from '../planFunnel';
import Utils from '../../../../../../../utils/utils.js';
import RenderPlanFunnels from '../../render/renderPlanFunnels.js';

const planFunnel = new PlanFunnel();
const utils = new Utils();
const renderPlanFunnels = new RenderPlanFunnels();

class IRemovePlanFunnel {
  init(props) {
    props.saveBoard = document.querySelector('[save-board]');
    props.deleteBoard = document.querySelector('[delete-board]');
    props.deleteManagerBoard = document.querySelector('[delete-manager-board]');
    props.contentWrapper = document.querySelector('.plans-add__content');

    this.#setRemoveBoard(props);
    this.#cancel(props);
    this.#removePlan(props);
  }

  #removePlan(props) {
    const removeBtn = document.querySelector('.plans-add__delete-button');

    if (removeBtn) {
      const remove = this.#remove.bind(this, props);

      const cloneRemove = utils.setCloneElement(removeBtn);

      cloneRemove.addEventListener('click', remove);
    }
  }

  #remove(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const remove = planFunnel.remove(props);

    remove.then((plan) => {
      this.#replaceFunnelPlan(props, plan);

      renderPlanFunnels.renderFunnelPlans(props).then(() => {
        this.#cancelRemove(props);

        const items = [
          props.iManagerPlan,
          props.iPlanFunnel,
          props.iPlan,
        ];

        this.#removePlan(props);
        this.#setRemoveBoard(props);

        items.forEach((item) => {
          const init = item.init.bind(item);
          init(props);
        });
      });
    });
  }

  #replaceFunnelPlan(props, plan) {
    const { pack, year, month } = props;

    pack.plans = [...pack.plans.map((el) => {
      if (el.year === year && el.month === month) {
        return plan;
      }

      return el;
    })];
  }

  #setRemoveBoard(props) {
    const removeBtns = document.querySelectorAll('[funnel-remove]');

    if (removeBtns.length) {
      const removePlanFunnel = this.#removePlanFunnel.bind(this, props);

      removeBtns.forEach((item) => {
        item.addEventListener('click', removePlanFunnel);
      });
    }
  }

  #cancel(props) {
    const cancelBtn = document.querySelectorAll('.plans-add__cancel-button');

    if (cancelBtn.length) {
      const cancelAction = this.#cancelRemove.bind(this, props);

      cancelBtn.forEach((item) => {
        const cancel = utils.setCloneElement(item);
        cancel.addEventListener('click', cancelAction);
      });
    }
  }

  #removePlanFunnel(props, e) {
    const t = e.target;
    props.target = t;

    const {
      deleteBoard,
      deleteManagerBoard,
      saveBoard,
      contentWrapper,
    } = props;

    [deleteManagerBoard, saveBoard, contentWrapper].forEach((item) => {
      item.classList.remove('open');
    });

    setTimeout(() => {
      if (!deleteBoard.classList.contains('open')) {
        deleteBoard.classList.add('open');
        contentWrapper.classList.add('open');
      }
    }, 400);
  }

  #cancelRemove(props, e) {
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

    [deleteBoard, saveBoard, deleteManagerBoard].forEach((item) => {
      item.classList.remove('open');
      contentWrapper.classList.remove('open');
    });
  }
}

export default IRemovePlanFunnel;
