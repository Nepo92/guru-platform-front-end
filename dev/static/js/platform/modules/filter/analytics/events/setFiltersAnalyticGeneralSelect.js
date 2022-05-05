import Select from '../../../select/select.js';

const select = new Select();

class SetFiltersAnalyticGeneralSelect {
  init() {
    // this.setFilterSelects(props);
  }

  setFilterSelects() {
    const selects = document.querySelectorAll('[select-here]');

    selects.forEach((item) => {
      const type = item.getAttribute('deal-type-select');

      switch (type) {
        case 'select-manager': {
          const selectProps = {
            required: false,
            placeholder: 'Выберите менеджера',
            mode: null,
          };

          select.appendSelect(selectProps, item);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}

export default SetFiltersAnalyticGeneralSelect;
