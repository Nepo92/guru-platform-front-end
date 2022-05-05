import PlanFilter from './planFilter.js';

const planFilter = new PlanFilter();

class IPlanFilter {
  init(props) {
    const initFilter = planFilter.init(props);

    initFilter.then(() => {
      const selectYear = document.querySelector('[js-select-year]');

      if (selectYear) {
        const changeYear = planFilter.changeYear.bind(planFilter);
        selectYear.addEventListener('change', changeYear);
      }
    });
  }
}

export default IPlanFilter;
