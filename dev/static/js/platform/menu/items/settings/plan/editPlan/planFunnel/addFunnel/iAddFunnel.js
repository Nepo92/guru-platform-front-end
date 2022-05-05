import RenderPlanFunnels from '../../render/renderPlanFunnels.js';
import Utils from '../../../../../../../utils/utils.js';
import IManagerPlan from '../../managerPlan/iManagerPlan.js';
import IRemovePlanFunnel from '../removePlanFunnel/iRemovePlanFunnel.js';

const renderPlanFunnels = new RenderPlanFunnels();
const utils = new Utils();
const iManagerPlan = new IManagerPlan();
const iRemovePlanFunnel = new IRemovePlanFunnel();

class IAddFunnel {
  init(props) {
    this.#getPlanFunnelData(props);

    const render = renderPlanFunnels.renderFunnelPlans(props);

    render.then(() => {
      const menu = document.querySelector('[js-menu-funnel-add]');
      const wrapper = menu.querySelector('.platform-modal__wrapper');

      utils.closeModalAnimation(menu, wrapper, false, true);

      const items = [iManagerPlan, iRemovePlanFunnel];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  #getPlanFunnelData(props) {
    const {
      month,
      year,
    } = props;

    this.#addFunnelPlanToPlans(props);

    props.pack.plans = [...props.pack.plans.map((el) => {
      const current = el.year === year && el.month === month;

      return current ? props.currentPlan : el;
    })];
  }

  #existingFunnel(funnel, el) {
    const { funnel: fEl } = el;

    if (fEl.idFunnel === funnel.idFunnel) {
      return el;
    }
  }

  #addFunnelPlanToPlans(props) {
    const {
      activeTab,
      newFunnel,
      currentPlan,
    } = props;

    const { funnelPlans } = currentPlan;
    const { funnel } = newFunnel;

    const searchExistingFunnel = this.#existingFunnel.bind(this, funnel);

    const currentFunnel = funnelPlans[activeTab].find(searchExistingFunnel);

    if (currentFunnel) {
      const replaceFunnel = this.#replaceFunnel.bind(this, newFunnel);

      funnelPlans[activeTab] = [...funnelPlans[activeTab].map(replaceFunnel)];
    } else {
      props.currentPlan.funnelPlans[activeTab].push(props.newFunnel);
    }
  }

  #replaceFunnel(funnel, el) {
    const { funnel: fEl } = funnel;

    const current = el.funnel.idFunnel === fEl.idFunnel;

    return current ? funnel : el;
  }
}

export default IAddFunnel;
