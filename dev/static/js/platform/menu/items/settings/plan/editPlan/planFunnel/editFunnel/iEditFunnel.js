import IManagerPlan from '../../managerPlan/iManagerPlan.js';
import RenderPlanFunnels from '../../render/renderPlanFunnels.js';
import Utils from '../../../../../../../utils/utils.js';
import IRemovePlanFunnel from '../removePlanFunnel/iRemovePlanFunnel.js';

const iManagerPlan = new IManagerPlan();
const renderPlanFunnels = new RenderPlanFunnels();
const utils = new Utils();
const iRemovePlanFunnel = new IRemovePlanFunnel();

class IEditFunnel {
  init(props) {
    this.#getFunnelData(props);

    props.saveBoard = document.querySelector('[save-board]');
    props.deleteBoard = document.querySelector('[delete-board]');
    props.deleteManagerBoard = document.querySelector('[delete-manager-board]');
    props.contentWrapper = document.querySelector('.plans-add__content');

    const render = renderPlanFunnels.renderFunnelPlans(props);

    render.then(() => {
      const menu = document.querySelector('[js-menu-funnel-add]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');

      utils.closeModalAnimation(menu, wrapper, false, true);

      this.#setSaveBoard(props);

      const items = [iManagerPlan, iRemovePlanFunnel];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  #setSaveBoard(props) {
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

  #getFunnelData(props) {
    const { currentFunnel, pack, newFunnel } = props;
    const { managers: managersPack } = pack;
    const { managerPlans } = currentFunnel;

    if (currentFunnel) {
      const managers = Array.from(document.querySelectorAll('[manager-id]'));

      if (managers.length) {
        const findManagerExist = this.#findManagerExist.bind(this, managerPlans);

        const existManagers = managers.filter(findManagerExist);

        if (existManagers.length) {
          const addedProps = {
            existManagers,
            managers,
            managersPack,
            currentFunnel,
          };

          this.#getAddedManagers(addedProps);

          const removedProps = {
            existManagers,
            currentFunnel,
            props,
          };

          this.#getRemovedManagers(removedProps);
        } else {
          currentFunnel.managerPlans = newFunnel.managerPlans;
        }
      }

      this.#getDayPercent(currentFunnel);
    }
  }

  #getRemovedManagers(removedProps) {
    const {
      existManagers,
      currentFunnel,
      props,
    } = removedProps;

    const { managerPlans: mp } = currentFunnel;

    const removedManagers = existManagers.filter((el) => !el.checked).map((el) => +el.getAttribute('data-id'));

    const managerPlans = document.querySelectorAll('[js-manager-id]');

    const removedPlans = [];

    if (removedManagers) {
      managerPlans.forEach((item) => {
        removedManagers.forEach((elem) => {
          if (+item.value === elem) {
            const row = utils.getParent(item, 'manager-row');

            removedPlans.push(+row.querySelector('[js-id-manager-plan]').value);
          }
        });
      });
    }

    props.removedManagers = removedPlans;
    props.target = false;

    if (removedManagers.length) {
      const removed = this.#removeRemovedManagers.bind(this, removedManagers);

      currentFunnel.managerPlans = [...mp.filter((el) => !removed(el))];
    }
  }

  #getDayPercent(currentFunnel) {
    const days = document.querySelectorAll('.plans-week__day-percent');

    currentFunnel.planPercents.length = 0;

    days.forEach((item) => {
      currentFunnel.planPercents.push(+item.value);
    });
  }

  #removeRemovedManagers(removedManagers, el) {
    return removedManagers.includes(el.manager.idByType);
  }

  #getAddedManagers(props) {
    const {
      existManagers,
      managers,
      managersPack,
      currentFunnel,
    } = props;

    const findManagersAdded = this.#findManagersAdded.bind(this, existManagers);

    const addedManagers = managers.filter((el) => el.checked).filter(findManagersAdded);

    if (addedManagers.length) {
      const addedManagersData = managersPack.filter((el) => addedManagers.find((item) => el.idByType === +item.getAttribute('data-id')));

      addedManagersData.forEach((item) => {
        const manager = {
          manager: item,
          advBudget: null,
          salesCount: null,
          revenue: null,
        };

        currentFunnel.managerPlans.push(manager);
      });
    }
  }

  #findManagerExist(managerPlans, el) {
    return managerPlans.find((item) => item.manager.idByType === +el.getAttribute('data-id'));
  }

  #findManagersAdded(existManagers, el) {
    return !existManagers.includes(el);
  }
}

export default IEditFunnel;
