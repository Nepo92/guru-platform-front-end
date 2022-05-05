import { planAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class ManagerPlan {
  async remove(props) {
    const { target } = props;

    if (target) {
      const row = utils.getParent(target, 'manager-row');

      let idManagerPlan;

      if (row) {
        idManagerPlan = +row.querySelector('[js-id-manager-plan]').value;

        if (!idManagerPlan) {
          await this.#removeFromProps(props, row);
        } else {
          const removedProps = {
            props,
            idManagerPlan,
            row,
          };

          await this.#removeFromDB(removedProps);
        }
      }
    } else {
      const removed = {
        props: false,
        idManagerPlan: props,
        row: false,
      };

      await this.#removeFromDB(removed);
    }
  }

  async #removeFromProps(props, row) {
    const idManager = +row.querySelector('[js-manager-id]').value;
    const funnel = utils.getParent(row, 'manager-item');
    const idFunnel = +funnel.querySelector('[js-funnel-id]').value;

    const { currentPlan, activeTab } = props;
    const { funnelPlans } = currentPlan;
    const currentFunnels = funnelPlans[activeTab];

    const currentFunnel = currentFunnels.find((el) => el.funnel.idFunnel === idFunnel);

    if (currentFunnel) {
      currentFunnel.managerPlans = [...currentFunnel.managerPlans.filter((el) => {
        if (el.manager.idByType !== idManager) {
          return el;
        }
      })];

      await row.remove();
    }
  }

  async #removeFromDB(removedProps) {
    const { props, idManagerPlan, row } = removedProps;

    await planAPI.deleteManagerPlan(idManagerPlan);

    if (row) {
      await this.#removeFromProps(props, row);
    }
  }
}

export default ManagerPlan;
