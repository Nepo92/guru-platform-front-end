import PlanTemplate from '../template/planTemplate.js';

const planTemplate = new PlanTemplate();

class PlanFilter {
  async init(props) {
    const { pack } = props;
    const { years, filter } = pack;

    const yearSelect = document.querySelector('[js-select-year]');

    if (yearSelect) {
      const optionsTemplate = planTemplate.optionYear.bind(planTemplate);
      const options = years.map(optionsTemplate);

      await yearSelect.insertAdjacentHTML('afterbegin', options);

      yearSelect.value = filter.year;
    }
  }

  changeYear() {
    const form = document.querySelector('[js-month-form]');

    form.trigger('submit');
  }
}

export default PlanFilter;
