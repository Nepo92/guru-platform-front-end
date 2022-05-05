import AddMotivation from './events/addMotivation/addMotivation.js';
import EditMotivation from './events/editMotivation/editMotivation.js';
import { motivationAPI } from '../../../../api/api.js';
import MotivationTemplates from './templates/motivationTemplates.js';
import Utils from '../../../../utils/utils.js';

const addMotivation = new AddMotivation();
const editMotivation = new EditMotivation();
const motivationTemplates = new MotivationTemplates();
const utils = new Utils();

class Motivation {
  init(props) {
    if (utils.getPage() === 'motivation-builder') {
      const motivationProps = this.getProps(props);

      motivationProps.motivation$ = new Motivation();
      const getMotvation = motivationAPI.getMotivation();

      getMotvation.then((motivations) => {
        const selectsData = this.getSelectData();

        const { motivationFilter } = motivationProps;
        const { f } = motivationFilter;

        const motivationsSorted = motivations.sort((a, b) => b.id - a.id);
        const motivationsFiltred = motivationsSorted.filter((el) => {
          return f(el, selectsData);
        });

        const wrapper = document.querySelector('[js-motivation-now__block]');
        utils.removeChildren(wrapper);

        const render = this.render.bind(this);

        render(motivationsFiltred, motivationProps).then(() => {
          motivationProps.motivations = motivationsFiltred;
          motivationProps.selectsData = selectsData;

          const items = [addMotivation, editMotivation];

          items.forEach((item) => {
            const init = item.init.bind(item);
            init(motivationProps);
          });
        });
      });
    }
  }

  async render(motivations, props) {
    const wrapper = document.querySelector('[js-motivation-now__block]');

    motivations.forEach(async (item) => {
      const div = document.createElement('div');
      div.classList.add('motivation-now__block');
      div.innerHTML = motivationTemplates.motivationBlockTemplate(item, props);

      await wrapper.appendChild(div);
    });
  }

  getProps(props) {
    let motivationProps;

    const motivationFiltred = this.motivationFilter.bind(this);
    const getSelectData = this.getSelectData.bind(this);

    const motivation = {
      f: motivationFiltred,
      getSelectData,
    };

    if (props.blockProps) {
      const { blockProps } = props;

      blockProps.positions.sales = [...blockProps.managers];
      blockProps.positions.marketing = [...blockProps.advertiser];

      motivationProps = {
        advertiser: [...blockProps.advertiser],
        allPacks: [...blockProps.allPacks],
        company: { ...blockProps.company },
        departments: [...blockProps.departments],
        idCompany: blockProps.idCompany,
        managers: [...blockProps.managers],
        months: [...blockProps.months],
        motivation$: blockProps.motivation$,
        pattern: blockProps.pattern,
        positions: { ...blockProps.positions },
        updatingBox: { ...blockProps.updatingBox },
        motivations: { ...blockProps.motivations },
        motivationFilter: motivation,
        changeYear: blockProps.changeYear,
        pack: { ...blockProps.pack },
      };
    } else {
      motivationProps = {
        advertiser: [...props.pack.motivation.advertiser],
        allPacks: [...props.pack.motivation.allPacks],
        company: { ...props.pack.motivation.company },
        departments: [...props.pack.motivation.departments],
        idCompany: props.pack.motivation.idCompany,
        managers: [...props.pack.motivation.managers],
        months: [...props.pack.motivation.months],
        motivation$: props.pack.motivation.motivation$,
        pattern: props.pack.motivation.pattern,
        positions: { ...props.pack.motivation.positions },
        updatingBox: { ...props.pack.motivation.updatingBox },
        motivations: { ...props.pack.motivation.motivations },
        motivationFilter: motivation,
        changeYear: props.pack.motivation.changeYear,
        pack: { ...props.pack },
      };

      motivationProps.positions.sales = [...props.pack.motivation.managers];
      motivationProps.positions.marketing = [...props.pack.motivation.advertiser];
    }

    return motivationProps;
  }

  getSelectData() {
    const department = document.querySelector('.motivation-add__department');
    const idDepartment = +utils.getSelected(department).getAttribute('value');

    const position = document.querySelector('.motivation-add__position');
    const idPosition = +utils.getSelected(position).getAttribute('value');

    const emp = document.querySelector('.motivation-add__employed');

    /* eslint-disable-next-line */
    const chooseEmp = utils.getSelected(emp).getAttribute('value') === 'true' ? true : utils.getSelected(emp).getAttribute('value') === 'false' ? false : null;

    const yearSelect = document.querySelector('.motivation-add__year');
    const year = +utils.getSelected(yearSelect).getAttribute('value');

    return [idDepartment, idPosition, chooseEmp, year];
  }

  motivationFilter(el, selectsData) {
    const [dep, pos, emp, year] = selectsData;

    const noDep = !dep && !pos && !emp && !year;

    const haveDep = dep && !pos && !emp && !year;
    const choosenDep = haveDep && el.idDepartment === dep;

    const havePos = dep && pos && !emp && !year;
    const choosePos = havePos && el.idDepartment === dep && el.idPosition === pos;

    const haveEmp = dep && pos && emp !== null && !year;

    /* eslint-disable-next-line */
    const chooseEmp = haveEmp && el.idDepartment === dep && el.idPosition === pos && el.forSelfEmployed === emp;

    const haveYear = dep && pos && emp !== null && year;

    /* eslint-disable-next-line */
    const chooseYear = haveYear && el.idDepartment === dep && el.idPosition === pos && el.forSelfEmployed === emp && el.year === year;

    if (noDep) {
      return el;
    }

    if (choosenDep) {
      return el;
    }

    if (choosePos) {
      return el;
    }

    if (chooseEmp) {
      return el;
    }

    if (chooseYear) {
      return el;
    }
  }
}

export default Motivation;
