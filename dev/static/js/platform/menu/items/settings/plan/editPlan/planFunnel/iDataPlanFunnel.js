import ValidatePlanFunnel from '../../../../../../utils/validation/planFunnel/validatePlanFunnel.js';
import Utils from '../../../../../../utils/utils.js';
import IAddFunnel from './addFunnel/iAddFunnel.js';
import IEditFunnel from './editFunnel/iEditFunnel.js';

const validatePlanFunnel = new ValidatePlanFunnel();
const utils = new Utils();
const iAddFunnel = new IAddFunnel();
const iEditFunnel = new IEditFunnel();

class IDataPlanFunnel {
  init(props) {
    if (validatePlanFunnel.init(props)) {
      const { funnelsSelect } = props;

      props.newFunnel = {};

      this.#getFunnel(props, funnelsSelect);
      this.#getManagers(props);
      this.#getPlanPercents(props);
      this.#selectMode(props);
    }
  }

  #getFunnel(props, funnelsSelect) {
    const { currentFunnels } = props;

    const current = currentFunnels.find((el) => el.idFunnel === +funnelsSelect.value);

    props.newFunnel.funnel = current;
  }

  #getManagers(props) {
    const { pack } = props;
    const { managers } = pack;

    const selectedManagers = props.managerCheckboxs.filter((el) => el.checked);

    const selected = managers.filter((el) => selectedManagers.find((item) => +item.getAttribute('data-id') === el.idByType));

    props.newFunnel.managerPlans = [...selected.map((el) => {
      return {
        advBudget: null,
        revenue: null,
        salesCount: null,
        manager: {
          ...utils.getDeepCopy(el),
        },
      };
    })];
  }

  #getPlanPercents(props) {
    props.newFunnel.planPercents = [];

    const planPercents = document.querySelectorAll('.plans-week__day-percent');

    planPercents.forEach((item) => {
      const notNaN = +item.value === 0 ? null : +item.value;

      /* eslint-disable-next-line */
      const percent = isNaN(+item.value) ? null : notNaN;

      props.newFunnel.planPercents.push(percent);
    });
  }

  #selectMode(props) {
    const { currentPlan: plan, activeTab: tab } = props;
    const { newFunnel } = props;
    const { funnel } = newFunnel;

    const edit = plan.funnelPlans[tab].find((el) => el.funnel.idFunnel === funnel.idFunnel);

    props.currentFunnel = edit;

    if (edit) {
      props.itsNew = false;

      iEditFunnel.init(props);
    } else {
      props.itsNew = true;

      iAddFunnel.init(props);
    }
  }
}

export default IDataPlanFunnel;
