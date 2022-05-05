import Utils from '../../../../../../../../utils/utils.js';
import SetData from './setData.js';
import SetBlocks from './setBlocks/setBlocks.js';

const utils = new Utils();
const setData = new SetData();
const setBlocks = new SetBlocks();

class OpenMenu {
  init(props) {
    const addProps = {
      ...props,
      menu: document.querySelector('[js-menu-motivation-add]'),
    };

    const saveBtn = document.querySelector('[motivation-add]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);

      const openMenu = this.openMenu.bind(this, addProps);

      save.addEventListener('click', openMenu);
    }
  }

  openMenu(props, e) {
    const { menu } = props;

    props.target = e.target;

    utils.openModalAnimation(menu, true);

    menu.querySelector('.motivation-menu__title').innerText = 'Добавить мотивацию';

    const items = [setData, setBlocks];

    const getData = this.getData.bind(this);

    props.motivationSettings = getData;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  getData() {
    const depertmentSelect = document.querySelector('.motivation-add__department');
    const positionSelect = document.querySelector('.motivation-add__position');
    const employedSelect = document.querySelector('.motivation-add__employed');
    const yearSelect = document.querySelector('.motivation-add__year');

    const department = utils.getSelected(depertmentSelect);
    const position = utils.getSelected(positionSelect);
    const employed = utils.getSelected(employedSelect);
    const year = utils.getSelected(yearSelect);

    return [department, position, employed, year];
  }
}

export default OpenMenu;
