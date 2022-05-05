import { planAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class PlanFunnel {
  async remove(props) {
    const {
      target,
      month,
      year,
    } = props;

    const planFunnel = utils.getParent(target, 'manager-item');

    const id = +planFunnel.querySelector('[js-plan-funnel-id]').value;

    const removedProps = {
      id,
      year,
      month,
    };

    let removed;

    if (id) {
      removed = await this.#deletePlanFunnelFromDB(removedProps);
    } else {
      removed = await this.#deletPlanFunnelFromProps(props);
    }

    return removed;
  }

  async #deletePlanFunnelFromDB(removedProps) {
    const {
      id,
      year,
      month,
    } = removedProps;

    planAPI.deleteFunnel(id);
    return await planAPI.refresh(year, month);
  }

  async #deletPlanFunnelFromProps(props) {
    const {
      currentPlan,
      activeTab,
      newFunnel,
    } = props;
    const { funnelPlans } = currentPlan;

    const removeFunnelPlan = this.#removeFunnelPlan.bind(this, newFunnel);

    funnelPlans[activeTab] = await funnelPlans[activeTab].filter(removeFunnelPlan);

    return currentPlan;
  }

  #removeFunnelPlan(funnel, el) {
    const { funnel: fEl } = el;
    const { funnel: newFunnel } = funnel;

    if (newFunnel.idFunnel !== fEl.idFunnel) {
      return fEl;
    }
  }

  async save(props) {
    const {
      month,
      year,
      currentPlan,
    } = props;

    this.#getManagerData(props);

    await planAPI.save(currentPlan);
    return await planAPI.refresh(year, month);
  }

  #getManagerData(props) {
    const {
      currentPlan,
      activeTab,
    } = props;
    const { funnelPlans } = currentPlan;

    const funnels = Array.from(document.querySelectorAll('[js-funnel-id]'));
    const managers = Array.from(document.querySelectorAll('[js-manager-id]'));

    const findManager = this.#findManager.bind(this, managers);

    funnels.forEach((item) => {
      const idFunnel = +item.value;

      const current = funnelPlans[activeTab].find((el) => el.funnel.idFunnel === idFunnel);

      if (current) {
        const { managerPlans } = current;

        const currentManagers = managerPlans.filter(findManager);

        if (currentManagers.length) {
          currentManagers.forEach((elem) => {
            const currentInput = managers.find((el) => +el.value === elem.manager.idByType);
            const currentRow = utils.getParent(currentInput, 'manager-row');

            const revenue = +currentRow.querySelector('[manager-revenue]').value;
            const salesCount = +currentRow.querySelector('[manager-sales]').value;

            elem.salesCount = salesCount;
            elem.revenue = revenue;

            if (activeTab === 'traffic') {
              const advBudget = +currentRow.querySelector('[manager-adv]').value;
              elem.advBudget = advBudget;
            }
          });
        }
      }
    });
  }

  #findManager(managers, el) {
    return managers.find((item) => el.manager.idByType === +item.value);
  }
}

export default PlanFunnel;
