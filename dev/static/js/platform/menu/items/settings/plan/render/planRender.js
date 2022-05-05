import PlanTemplate from '../template/planTemplate.js';
import Utils from '../../../../../utils/utils.js';

const planTemplate = new PlanTemplate();
const utils = new Utils();

class PlanRender {
  async init(props) {
    const { pack, year } = props;
    const { plans, months } = pack;

    const planItem = plans.map((item) => {
      const monthName = months.find((el, index) => item.month === index + 1);

      const current = year === item.year;

      if (current) {
        const template = planTemplate.planItemTemplate.bind(planTemplate);
        return template(item, monthName);
      }
    }).join('');

    const wrapper = document.querySelector('.plans-now__list');

    if (wrapper) {
      utils.removeChildren(wrapper);

      await wrapper.insertAdjacentHTML('afterbegin', planItem);
    }
  }
}

export default PlanRender;
