import Plan from './plan.js';
import PageData from '../../../../utils/pageData/pageData.js';
import PlanRender from './render/planRender.js';
import Utils from '../../../../utils/utils.js';
import IEditPlan from './editPlan/iEditPlan.js';
import IPlanFilter from './filter/iPlanFilter.js';

const plan = new Plan();
const pageData = new PageData();
const planRender = new PlanRender();
const utils = new Utils();
const iEditPlan = new IEditPlan();
const iPlanFilter = new IPlanFilter();

class IPlan {
  init(props) {
    const isCommonPlansPage = pageData.getPage() === 'common-plans';

    if (isCommonPlansPage) {
      const planProps = this.#getProps(props);

      planProps.iPlan = new IPlan();

      const items = [
        iPlanFilter,
        planRender,
        iEditPlan,
      ];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(planProps);
      });
    }
  }

  #getProps(props) {
    const { pack } = props;
    const { filter } = pack;

    const planProps = {
      ...props,
      planRender,
      itsNew: true,
      year: filter.year,
    };

    return utils.getDeepCopy(planProps);
  }

  closePlan() {
    const closePlanBtn = document.querySelector('[close-plans-add-menu]');

    if (closePlanBtn) {
      const closePlanMenu = plan.closePlanMenu.bind(plan);

      closePlanBtn.addEventListener('click', closePlanMenu);
    }
  }
}

export default IPlan;
