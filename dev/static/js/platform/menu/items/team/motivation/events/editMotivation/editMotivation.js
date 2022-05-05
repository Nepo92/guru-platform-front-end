import { motivationAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';
import SetData from '../addMotivation/events/openMenu/setData.js';
import SetBlocks from '../addMotivation/events/openMenu/setBlocks/setBlocks.js';
import CloseMenu from './events/closeMenu.js';

const setData = new SetData();
const utils = new Utils();
const setBlocks = new SetBlocks();
const closeMenu = new CloseMenu();

class EditMotivation {
  init(props) {
    const motivations = document.querySelectorAll('.motivation-now__block');

    if (motivations.length) {
      const openMenu = this.openMenu.bind(this, props);

      motivations.forEach((item) => {
        const btn = utils.setCloneElement(item);

        btn.addEventListener('click', openMenu);
      });
    }
  }

  openMenu(props, e) {
    const editProps = {
      ...props,
      menu: document.querySelector('[js-menu-motivation-add]'),
    };

    const t = e.target;
    const {
      menu,
      positions,
      advertiser,
      managers,
    } = editProps;

    const poitionsItems = positions;
    poitionsItems.marketing = advertiser;
    poitionsItems.sales = managers;

    this.changeMenu(editProps);

    menu.querySelector('.motivation-menu__title').innerText = 'Редактировать мотивацию';

    const block = utils.getParent(t, 'motivation-now__block');
    const currentId = block ? +block.querySelector('[name="id"]').value : +t.querySelector('[name="id"]').value;

    const motivations = motivationAPI.getMotivation();

    motivations.then((wages) => {
      const current = wages.filter((el) => el.id === currentId)[0];
      editProps.currentWage = current;
      editProps.motivations = wages;

      const motivationSettings = this.motivationSettings.bind(this, current, poitionsItems);

      editProps.motivationSettings = motivationSettings;
      editProps.target = t;

      utils.openModalAnimation(menu, true);

      const items = [setData, setBlocks, closeMenu];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(editProps);
      });
    });
  }

  motivationSettings(current, positions) {
    const department = document.querySelector('.motivation-add__department');
    const dep = Array.from(department.children).filter((el) => +el.getAttribute('value') === current.idDepartment)[0];

    const currentPositions = this.currentPositions(positions, current.idPosition, dep);

    const forSelfEmployed = document.querySelector('.motivation-add__employed');

    const emp = Array.from(forSelfEmployed.children).filter((el) => {
      const forSelfEmp = el.getAttribute('value') === 'true' ? true : null;
      const notForSelfEmp = el.getAttribute('value') === 'false' ? false : null;

      const option = forSelfEmp ?? notForSelfEmp;
      return option === current.forSelfEmployed;
    })[0];

    const yearSel = document.querySelector('.motivation-add__year');
    const year = Array.from(yearSel.children).filter((el) => +el.getAttribute('value') === current.year)[0];

    const name = current.motivationName;

    return [dep, currentPositions, emp, year, name];
  }

  currentPositions(positions, idPos, currentDep) {
    const depName = currentDep.getAttribute('data-department');

    let positionName;

    Object.entries(positions).forEach((item) => {
      const dep = item[0];
      const pos = item[1];

      if (dep === depName) {
        pos.forEach((elem) => {
          if (elem.id === idPos) {
            positionName = elem.title;
          }
        });
      }
    });

    const option = document.createElement('option');
    option.setAttribute('value', idPos);
    option.innerText = positionName;

    return option;
  }

  changeMenu(props) {
    const { menu } = props;

    const removeBtn = menu.querySelector('[js-motivation-delete]');

    if (!removeBtn) {
      const span = document.createElement('span');
      span.setAttribute('js-motivation-delete', '');
      span.classList.add('motivation-menu__delete');
      span.classList.add('motivation-delete');
      span.innerText = 'Удалить';

      menu.querySelector('.motivation-menu__control').appendChild(span);
    }

    const cancelBtn = menu.querySelector('[js-motivation-cancel]');

    if (cancelBtn) {
      cancelBtn.remove();
    }
  }
}

export default EditMotivation;
