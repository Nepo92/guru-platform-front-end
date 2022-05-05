import Utils from '../../../utils/utils.js';
import ChooseAudience from './events/chooseAudience/chooseAudience.js';
import Datepicker from '../../datepicker/datepicker.js';
import Select from '../../select/select.js';
import InterfaceDealType from '../../../menu/items/crm/dealCard/deal/events/afterGetDeal/interfaces/interfaceDealType.js';

const utils = new Utils();
const chooseAudience = new ChooseAudience();
const datepicker = new Datepicker();
const select = new Select();
const interfaceDealType = new InterfaceDealType();

class AnalyticsFilter {
  init(props) {
    const pages = ['funnel', 'traffic', 'additional'];
    const currentPage = utils.getPage();
    const period = document.querySelector('[js-period]');

    if (period) {
      period.value = props.pack.filter.idSort;
    }

    if (pages.includes(currentPage)) {
      datepicker.init();

      const setSelectsProps = this.setSelectsToFilter(props);

      setSelectsProps.then(() => {
        const initSelect = select.init(props);

        initSelect.then(() => {
          props.isAnalyticFilter = true;
          interfaceDealType.change(props);

          this.selectPeriod(props);

          const changeFilterDate = this.changeFilterDate.bind(this, props);

          this.startDate(props, changeFilterDate);
          this.endDate(props, changeFilterDate);

          const items = [chooseAudience];

          items.forEach((item) => {
            const init = item.init.bind(item);
            init(props);
          });
        });
      });
    }
  }

  selectPeriod(props) {
    const selectPeriod = document.querySelector('[js-period]');

    if (selectPeriod) {
      selectPeriod.value = props.pack.filter.idSort;
      const setFilter = this.setFilter.bind(this);

      selectPeriod.addEventListener('change', setFilter);
    }
  }

  startDate(props, changeFilterDate) {
    const startDate = document.querySelector('[js-start-date-wrapper]');

    if (startDate) {
      startDate.value = utils.getDateFormatDDMMYYYY(props.pack.filter.startDate);

      startDate.addEventListener('click', changeFilterDate);
    }
  }

  endDate(props, changeFilterDate) {
    const endDate = document.querySelector('[js-end-date-wrapper]');

    if (endDate) {
      endDate.value = utils.getDateFormatDDMMYYYY(props.pack.filter.endDate);

      endDate.addEventListener('click', changeFilterDate);
    }
  }

  changeFilterDate(props) {
    const datepickers = Array.from(document.querySelectorAll('.datepicker'));

    const currentDatepicker = datepickers.find((el) => utils.getCssProperty(el, 'left') !== `-${(1e5)}px`);

    const dispatchDatepicker = this.dispatchDatepicker.bind(this, props);

    currentDatepicker?.addEventListener('click', dispatchDatepicker);
  }

  dispatchDatepicker(props, e) {
    const t = e.target;

    const startDate = document.querySelector('[js-start-date]');
    const startDateWrapper = document.querySelector('[js-start-date-wrapper]');

    const endDate = document.querySelector('[js-end-date]');
    const endDateWrapper = document.querySelector('[js-end-date-wrapper]');

    if (t.classList.contains('datepicker--cell-day')) {
      startDate.value = utils.getDateFormatDDMMYYYY(startDateWrapper.value, '-');
      endDate.value = utils.getDateFormatDDMMYYYY(endDateWrapper.value, '-');

      utils.showLoader();

      setTimeout(() => {
        const form = document.querySelector('.analytic__filter-form');
        form.submit();
      }, 100);
    }

    const items = [chooseAudience];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  setFilter(e) {
    const t = e.target;

    const form = utils.getParent(t, 'analytic__filter-form');

    if (t.value) {
      utils.showLoader();
      form.submit();
    }
  }

  async setSelectsToFilter(props) {
    const selects = document.querySelectorAll('[select-here]');

    props.selectsArray = [];

    if (selects.length) {
      const setSelects = this.setSelects.bind(this, props);
      await selects.forEach(setSelects);
    }
  }

  async setSelects(props, selectItem) {
    const type = selectItem.getAttribute('data-select-type');

    const generalSelectProps = {
      props,
      selectItem,
      type,
    };

    this.setSelectProps(generalSelectProps);

    await this.dispatchSelectType(props, type);
  }

  setSelectProps(generalSelectProps) {
    const {
      props,
      selectItem,
      type,
    } = generalSelectProps;

    const selectProps = {
      required: false,
      placeholder: null,
      mode: 'custom',
      item: selectItem,
      type,
      openUp: true,
    };

    switch (type) {
      case 'select-managers': {
        selectProps.defaultValue = props.pack.filter.idManager;
        break;
      }
      case 'select-products': {
        selectProps.defaultValue = props.pack.filter.idManager;
        break;
      }
      case 'select-projects': {
        selectProps.defaultValue = props.pack.filter.project;
        break;
      }
      case 'select-deal-type': {
        selectProps.defaultValue = props.pack.filter.dealType;
        break;
      }
      case 'select-funnel': {
        selectProps.defaultValue = props.pack.filter.idFunnel;
        break;
      }
      case 'select-employees': {
        selectProps.defaultValue = props.pack.filter.isNotDismiss;
        break;
      }
      default: {
        break;
      }
    }

    props.selectsArray.push(selectProps);
  }

  async dispatchSelectType(props, type) {
    const currentSelect = props.selectsArray.findIndex((el) => el.type === type);
    const { selectsArray } = props;

    switch (type) {
      case 'select-managers': {
        const { managers } = props.pack;
        const current = props.pack.filter.idManager;
        const managersArray = Object.entries(managers);
        const currentManager = managersArray.find((el) => +el[0] === current);
        const defPlaceholder = currentManager ? currentManager[1].name : null;

        selectsArray[currentSelect].placeholder = 'Все менеджеры';
        selectsArray[currentSelect].name = 'idManager';
        selectsArray[currentSelect].defaultValue = current || '0';
        selectsArray[currentSelect].defaultPlaceholder = defPlaceholder;
        break;
      }
      case 'select-projects': {
        const current = props.pack.filter.project;
        const { projects } = props.pack.analyticsFilterData;
        const currentProject = projects.find((el) => el.id === current);

        selectsArray[currentSelect].placeholder = 'Все проекты';
        selectsArray[currentSelect].name = 'project';
        selectsArray[currentSelect].defaultValue = current || '0';
        selectsArray[currentSelect].defaultPlaceholder = currentProject?.name || null;
        break;
      }
      case 'select-products': {
        const { courses } = props.pack.analyticsFilterData;
        const current = props.pack.filter.course;
        const currentCourse = courses.find((el) => el === current);

        selectsArray[currentSelect].placeholder = 'Все продукты';
        selectsArray[currentSelect].name = 'course';
        selectsArray[currentSelect].defaultValue = current || 'all';
        selectsArray[currentSelect].defaultPlaceholder = currentCourse || null;
        break;
      }
      case 'select-deal-type': {
        const { saleType } = props.pack;
        const current = props.pack.filter.dealType;
        const currentDealType = saleType.find((el) => el.value === current);

        selectsArray[currentSelect].placeholder = 'Все сделки';
        selectsArray[currentSelect].name = 'dealType';
        selectsArray[currentSelect].defaultValue = currentDealType ? currentDealType.value : 'all';
        selectsArray[currentSelect].defaultPlaceholder = currentDealType?.name || null;
        break;
      }
      case 'select-employees': {
        const { employees } = props.pack.analyticsFilterData;
        const current = props.pack.filter.isNotDismiss;
        const employee = employees.find((el) => el === current);
        const currentEmployee = employee ? 'Работающие' : 'Уволенные';

        selectsArray[currentSelect].placeholder = 'Все сотрудники';
        selectsArray[currentSelect].name = 'isNotDismiss';
        selectsArray[currentSelect].defaultValue = current || '0';
        selectsArray[currentSelect].defaultPlaceholder = employee !== null ? currentEmployee : null;
        break;
      }
      case 'select-funnel': {
        const currentIdFunnel = props.pack.filter.idFunnel;
        const currentDealType = props.pack.filter.dealType;
        const { funnels } = props.pack;
        const funnelData = Object.entries(funnels);
        const currentDeal = funnelData.find((el) => el[0] === currentDealType);

        selectsArray[currentSelect].placeholder = 'Все воронки';
        selectsArray[currentSelect].name = 'idFunnel';
        selectsArray[currentSelect].defaultValue = currentIdFunnel !== 0 ? currentIdFunnel : '0';

        if (currentDeal) {
          const currentFunnel = currentDeal[1].find((el) => el.idFunnel === currentIdFunnel);
          selectsArray[currentSelect].defaultPlaceholder = currentFunnel?.funnelName || null;
        } else {
          selectsArray[currentSelect].defaultPlaceholder = null;
        }
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default AnalyticsFilter;
