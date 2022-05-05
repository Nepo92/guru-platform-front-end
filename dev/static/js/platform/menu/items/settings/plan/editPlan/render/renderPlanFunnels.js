import Utils from '../../../../../../utils/utils.js';
import PlanTemplate from '../../template/planTemplate.js';
import EditPlanTabs from '../tabs/editPlanTabs.js';

const planTemplate = new PlanTemplate();
const editPlanTabs = new EditPlanTabs();
const utils = new Utils();

class RenderPlanFunnels {
  async init(props) {
    this.#setYearAndMonths(props);
    await this.renderFunnelPlans(props);
  }

  #setYearAndMonths(props) {
    const { pack, target } = props;

    props.month = +target.querySelector('[js-current-month]').value;
    const monthName = pack.months[props.month - 1];

    const monthNameElement = document.querySelector('.plans-add__month--value');

    if (monthNameElement) {
      monthNameElement.innerText = monthName;
    }

    const yearElement = document.querySelector('.plans-add__year--value');

    if (yearElement) {
      yearElement.innerText = props.year;
    }
  }

  async renderFunnelPlans(props) {
    const { month, year, pack } = props;
    const { plans } = pack;

    const currentPlan = plans.find((el) => el.year === year && el.month === month);

    if (currentPlan) {
      const planFunnels = Object.entries(currentPlan.funnelPlans);

      props.activeTab = editPlanTabs.getActiveTab;
      props.currentPlan = currentPlan;

      const [, currentFunnels] = planFunnels.find((el) => el[0] === props.activeTab);

      const notEmpty = currentFunnels.length;

      if (notEmpty) {
        props.itsNew = false;
        await this.#renderFunnels(props);
      } else {
        await this.#setEmptyTable(props);
      }
    }
  }

  async #renderFunnels(props) {
    const { currentPlan, activeTab } = props;
    const tabContent = Array.from(document.querySelectorAll('.plans-funnel')).find((el) => el.getAttribute('data-type') === activeTab);

    const funnelsType = Object.entries(currentPlan.funnelPlans);

    const currentFunnels = funnelsType.find((el) => el[0] === activeTab);

    if (currentFunnels) {
      const [, funnels] = currentFunnels;

      const renderFunnelItems = this.#renderFunnelItems.bind(this, activeTab);

      const funnelTemplates = funnels.map(renderFunnelItems).join('');

      utils.removeChildren(tabContent);

      tabContent.insertAdjacentHTML('afterbegin', funnelTemplates);
    }
  }

  #renderFunnelItems(activeTab, el) {
    const { managerPlans } = el;

    const getManagerRowTemplate = planTemplate.managerRow.bind(planTemplate, activeTab);
    const managerRows = managerPlans.map(getManagerRowTemplate);

    const renderProps = {
      el,
      managerRows,
      activeTab,
    };

    const funnelItems = planTemplate.funnelTemplate(renderProps);

    return funnelItems;
  }

  #setEmptyTable(props) {
    const emptyTable = planTemplate.emptyTableTemplate();

    const contentTab = Array.from(document.querySelectorAll('.plans-funnel'));
    const currentContent = contentTab.find((el) => el.getAttribute('data-type') === props.activeTab);

    const empty = currentContent.querySelector('.empty-table');

    if (!empty) {
      utils.removeChildren(currentContent);

      currentContent.insertAdjacentHTML('afterbegin', emptyTable);
    }
  }
}

export default RenderPlanFunnels;
