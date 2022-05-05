import Utils from '../../../../../utils/utils.js';
import RenderPlanFunnels from './render/renderPlanFunnels.js';
import IPlanFunnel from './planFunnel/iPlanFunnel.js';
import IManagerPlan from './managerPlan/iManagerPlan.js';
import IRemovePlanFunnel from './planFunnel/removePlanFunnel/iRemovePlanFunnel.js';
import IEditPlanTabs from './tabs/iEditPlanTabs.js';

const utils = new Utils();
const renderPlanFunnels = new RenderPlanFunnels();
const iPlanFunnel = new IPlanFunnel();
const iManagerPlan = new IManagerPlan();
const iRemovePlanFunnel = new IRemovePlanFunnel();
const iEditPlanTabs = new IEditPlanTabs();

class IEditPlan {
  init(props) {
    this.#openPlanMenu(props);
    this.#closePlanMenu();
  }

  #closePlanMenu() {
    const closeBtn = document.querySelector('[close-plans-add-menu]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);

      const closeMenu = this.#closeMenu.bind(this);
      close.addEventListener('click', closeMenu);
    }
  }

  #closeMenu() {
    const menu = document.querySelector('[js-menu-plan-add]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);
  }

  #openPlanMenu(props) {
    const planItems = document.querySelectorAll('[js-plan-month]');

    if (planItems.length) {
      const openPlanMenu = this.#openEditPlanMenu.bind(this, props);

      planItems.forEach((item) => {
        item.addEventListener('click', openPlanMenu);
      });
    }
  }

  #openEditPlanMenu(props, e) {
    const t = e.target;

    props.target = t;

    const menu = document.querySelector('[js-menu-plan-add]');
    utils.openModalAnimation(menu, true);

    iEditPlanTabs.init(props);
    const render = renderPlanFunnels.init(props);

    this.#setObservers(props);

    render.then(() => {
      const items = [
        iPlanFunnel,
        iManagerPlan,
        iRemovePlanFunnel,
      ];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  #setObservers(props) {
    props.iPlanFunnel = new IPlanFunnel();
    props.iManagerPlan = new IManagerPlan();
  }
}

export default IEditPlan;
