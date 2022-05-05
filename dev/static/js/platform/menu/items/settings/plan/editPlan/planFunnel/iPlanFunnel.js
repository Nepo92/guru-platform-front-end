import Utils from '../../../../../../utils/utils.js';
import PlanTemplate from '../../template/planTemplate.js';
import Validation from '../../../../../../utils/validation.js';
import IDataPlanFunnel from './iDataPlanFunnel.js';

const utils = new Utils();
const planTemplate = new PlanTemplate();
const validation = new Validation();
const iDataPlanFunnel = new IDataPlanFunnel();

class IPlanFunnel {
  init(props) {
    this.#settingsFunnel(props);
    this.#closeFunnel();
    this.#cancel();
    this.#funnelSelect(props);
    this.#saveFunnel(props);
  }

  #settingsFunnel(props) {
    const settingsFunnelBtn = document.querySelector('[add-funnel]');

    if (settingsFunnelBtn) {
      const cloneSettingsBtn = utils.setCloneElement(settingsFunnelBtn);
      const openSettingsFunnelMenu = this.#openSettingsFunnelMenu.bind(this, props);

      cloneSettingsBtn.addEventListener('click', openSettingsFunnelMenu);
    }
  }

  #closeFunnel() {
    const closeFunnelBtn = document.querySelector('[close-plans-funnel-add]');

    if (closeFunnelBtn) {
      const cloneCloseBtn = utils.setCloneElement(closeFunnelBtn);

      const closeMenu = this.#closeMenu.bind(this);

      cloneCloseBtn.addEventListener('click', closeMenu);
    }
  }

  #cancel() {
    const cancelFunnelBtn = document.querySelector('[cancel-funnel]');

    if (cancelFunnelBtn) {
      const cloneCancelBtn = utils.setCloneElement(cancelFunnelBtn);

      const closeMenu = this.#closeMenu.bind(this);

      cloneCancelBtn.addEventListener('click', closeMenu);
    }
  }

  #funnelSelect(props) {
    const changeFunnelSelect = document.querySelector('[js-funnel-name]');

    if (changeFunnelSelect) {
      const cloneSelect = utils.setCloneElement(changeFunnelSelect);

      const changeFunnel = this.#changeFunnel.bind(this, props);

      cloneSelect.addEventListener('change', changeFunnel);
    }
  }

  #saveFunnel(props) {
    const addFunnelBtn = document.querySelector('[save-funnel]');

    if (addFunnelBtn) {
      const cloneAddFunnel = utils.setCloneElement(addFunnelBtn);

      const addFunnel = iDataPlanFunnel.init.bind(iDataPlanFunnel, props);
      cloneAddFunnel.addEventListener('click', addFunnel);

      const toValidateError = validation.toValidationError.bind(validation);
      cloneAddFunnel.addEventListener('dblclick', toValidateError);
    }
  }

  #openSettingsFunnelMenu(props) {
    const menu = document.querySelector('[js-menu-funnel-add]');

    this.#setDataFunnelMenu(props, menu);

    utils.openModalAnimation(menu, true);

    props.hideBoards();
  }

  #setDataFunnelMenu(props, menu) {
    const funnelsSelect = menu.querySelector('[js-funnel-name]');

    if (funnelsSelect) {
      props.funnelsSelect = funnelsSelect;
      this.#setFunnels(props, funnelsSelect);
    }

    this.#clearManagersAndPercent(props, menu);
  }

  #clearManagersAndPercent(props, menu) {
    const managersWrapper = menu.querySelector('.plans-funnel__managers-list');

    if (managersWrapper) {
      this.#setManagers(props, managersWrapper);
    }

    const planPercents = menu.querySelectorAll('.plans-week__day-percent');

    if (planPercents.length) {
      planPercents.forEach((item) => {
        item.value = '';
      });
    }
  }

  #setFunnels(props, funnelsSelect) {
    utils.removeChildren(funnelsSelect, 0);

    const { pack, activeTab } = props;
    const { funnels } = pack;

    const [, currentFunnels] = Object.entries(funnels).find((el) => el[0] === activeTab);

    props.currentFunnels = currentFunnels;

    if (currentFunnels) {
      const templateOptionFunnels = planTemplate.optionFunnels.bind(planTemplate);

      const funnelsOptionsTemplates = currentFunnels.map(templateOptionFunnels).join('');

      funnelsSelect.children[0].insertAdjacentHTML('afterend', funnelsOptionsTemplates);
    }
  }

  #setManagers(props, managersWrapper) {
    const { pack } = props;
    const { managers } = pack;

    utils.removeChildren(managersWrapper);

    const managerTemplate = planTemplate.managerTemplate.bind(planTemplate);
    const managerTemplates = managers.map(managerTemplate).join('');

    managersWrapper.insertAdjacentHTML('afterbegin', managerTemplates);
  }

  #closeMenu() {
    const menu = document.querySelector('[js-menu-funnel-add]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true);
  }

  #changeFunnel(props, e) {
    const t = e.target;
    const idFunnel = +t.value;

    const { currentPlan, activeTab } = props;
    const { funnelPlans } = currentPlan;

    const currentFunnel = funnelPlans[activeTab].find((el) => el.funnel.idFunnel === idFunnel);

    if (currentFunnel) {
      this.#setManagerToMenu(currentFunnel);
      this.#setPlanPercentsToMenu(currentFunnel);
    } else {
      const menu = document.querySelector('[js-menu-funnel-add]');
      this.#clearManagersAndPercent(props, menu);
    }
  }

  #setManagerToMenu(currentFunnel) {
    const managers = document.querySelectorAll('[manager-id]');
    const { managerPlans } = currentFunnel;

    managers.forEach((item) => {
      const idManager = +item.getAttribute('data-id');

      managerPlans.forEach((el) => {
        if (el.manager.idByType === idManager) {
          item.checked = true;
        }
      });
    });
  }

  #setPlanPercentsToMenu(currentFunnel) {
    const days = document.querySelectorAll('.plans-week__day-percent');
    const { planPercents } = currentFunnel;

    days.forEach((item, index) => {
      planPercents.forEach((el, count) => {
        if (index === count) {
          item.value = el || '';
        }
      });
    });
  }
}

export default IPlanFunnel;
