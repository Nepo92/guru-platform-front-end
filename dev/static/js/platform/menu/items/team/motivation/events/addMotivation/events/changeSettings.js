import Utils from '../../../../../../../utils/utils.js';
import OpenMenu from './openMenu/openMenu.js';
import CloseMenu from './closeMenu.js';

const utils = new Utils();
const openMenu = new OpenMenu();
const closeMenu = new CloseMenu();

class ChangeSettings {
  init(props) {
    const depertment = document.querySelector('.motivation-add__department');
    const position = document.querySelector('.motivation-add__position');
    const employed = document.querySelector('.motivation-add__employed');
    const year = document.querySelector('.motivation-add__year');

    const selects = this.setClones(depertment, position, employed, year);

    const changeProps = {
      ...props,
      selects,
    };

    this.setDisable(changeProps);

    if (!changeProps.changeYear) {
      this.setYears(changeProps);
    }

    this.setListeners(changeProps);
  }

  setYears(props) {
    const { selects } = props;
    const year = selects[3];

    utils.removeChildren(year, 0);

    const reverse = props.months.sort((a, b) => b - a);

    reverse.forEach((item) => {
      const option = document.createElement('option');
      option.value = item;
      option.innerText = item;
      year.appendChild(option);
    });

    if (props.selectsData[3]) {
      const [, , , currentYear] = props.selectsData;
      year.value = currentYear;
    }
  }

  setClones(department, position, employed, year) {
    const cacheValue = {
      dep: utils.getSelected(department).getAttribute('value'),
      pos: utils.getSelected(position).getAttribute('value'),
      emp: utils.getSelected(employed).getAttribute('value'),
      year: utils.getSelected(year).getAttribute('value'),
    };

    const dep = utils.setCloneElement(department);
    const pos = utils.setCloneElement(position);
    const emp = utils.setCloneElement(employed);
    const yearSelect = utils.setCloneElement(year);

    dep.value = cacheValue.dep;
    pos.value = cacheValue.pos;
    emp.value = cacheValue.emp;
    yearSelect.value = cacheValue.year;

    return [dep, pos, emp, yearSelect];
  }

  setDisable(props) {
    const { selects } = props;
    const dep = selects[0];
    const pos = selects[1];
    const emp = selects[2];
    const yearSelect = selects[3];

    if (+dep.value === 0) {
      pos.disabled = true;
      pos.value = '';
      emp.value = '';
      yearSelect.value = '';
      emp.disabled = true;
      yearSelect.disabled = true;

      const addButton = document.querySelector('[motivation-add]');
      const add = utils.setCloneElement(addButton);
      add.disabled = true;
    } else {
      pos.disabled = false;
    }
  }

  setListeners(props) {
    const changeDep = this.changeDepartment.bind(this, props);
    const changePos = this.changePositions.bind(this, props);
    const changeEmp = this.changeEmployed.bind(this, props);
    const changeYear = this.changeYear.bind(this, props);

    const { selects } = props;

    const [dep, pos, emp, yearSelect] = selects;

    dep.addEventListener('change', changeDep);
    pos.addEventListener('change', changePos);
    emp.addEventListener('change', changeEmp);
    yearSelect.addEventListener('change', changeYear);

    const items = [openMenu, closeMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  changeDepartment(props, e) {
    const t = e.target;
    props.target = t;

    if (+t.value === 0) {
      this.setDisable(props);
    } else {
      this.chooseDepartment(props);
    }

    props.motivation$.init(props);
  }

  chooseDepartment(props) {
    props.changeYear = false;

    const {
      departments,
      positions,
      target,
      selects,
    } = props;
    const [dep, posSelect, emp, year] = selects;

    utils.removeChildren(posSelect, 0);

    const pos = Object.entries(positions);
    const selected = utils.getSelected(dep).getAttribute('data-department');

    departments.forEach((item) => {
      const department = item.id;

      if (department === +target.value) {
        // eslint-disable-next-line
        for (const position of pos) {
          if (position[0] === selected) {
            position[1].forEach((elem) => {
              const option = document.createElement('option');
              option.classList.add('motivation-add__pos');
              option.setAttribute('value', elem.id);
              option.innerHTML = elem.title;
              posSelect.appendChild(option);
            });
          }
        }
      }
    });

    posSelect.disabled = false;
    emp.value = '';
    emp.disabled = true;
    year.value = '';
    year.disabled = true;

    const addButton = document.querySelector('[motivation-add]');
    const add = utils.setCloneElement(addButton);
    add.disabled = true;
  }

  changePositions(props, e) {
    props.changeYear = false;
    const t = e.target;
    const { selects } = props;
    const emp = selects[2];
    const year = selects[3];

    if (t.value) {
      emp.disabled = false;
    } else {
      emp.disabled = true;
    }

    emp.value = '';
    year.value = '';
    year.disabled = true;

    const addButton = document.querySelector('[motivation-add]');
    const add = utils.setCloneElement(addButton);
    add.disabled = true;

    props.motivation$.init(props);
  }

  changeEmployed(props, e) {
    props.changeYear = false;
    const t = e.target;
    const { selects } = props;
    const year = selects[3];

    year.value = '';

    if (t.value) {
      year.disabled = false;
    } else {
      year.disabled = true;
    }

    const addButton = document.querySelector('[motivation-add]');
    const add = utils.setCloneElement(addButton);
    add.disabled = true;

    props.motivation$.init(props);
  }

  changeYear(props, e) {
    props.changeYear = true;

    const t = e.target;
    const add = document.querySelector('[motivation-add]');

    if (t.value !== '') {
      add.disabled = false;

      this.changeMenu();
    } else {
      add.disabled = false;
    }

    props.motivation$.init(props);
  }

  changeMenu() {
    const menu = document.querySelector('[js-menu-motivation-add]');

    const cancelBtn = menu.querySelector('[js-motivation-cancel]');

    if (!cancelBtn) {
      const span = document.createElement('span');
      span.setAttribute('js-motivation-cancel', '');
      span.classList.add('motivation-menu__cancel');
      span.innerText = 'Отмена';

      menu.querySelector('.motivation-menu__control').appendChild(span);
    }

    const removeBtn = menu.querySelector('[js-motivation-delete]');

    if (removeBtn) {
      removeBtn.remove();
    }
  }
}

export default ChangeSettings;
