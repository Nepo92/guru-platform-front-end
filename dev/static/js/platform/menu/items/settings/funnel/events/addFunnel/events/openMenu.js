import Utils from '../../../../../../../utils/utils.js';
import SaveFunnel from './saveFunnel.js';

const utils = new Utils();
const saveFunnel = new SaveFunnel();

class OpenMenu {
  init(props) {
    const addBtn = document.querySelector('[js-funnels-add]');

    if (addBtn) {
      const openAddMenu = this.openAddMenu.bind(this, props);

      const add = utils.setCloneElement(addBtn);
      add.addEventListener('click', openAddMenu);
    }
  }

  openAddMenu(props) {
    const { menu } = props;

    this.clearFunnelMenu(props);
    utils.openModalAnimation(menu, true);

    const items = [saveFunnel];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  clearFunnelMenu(props) {
    const { menu } = props;

    const name = menu.querySelector('[js-funnel-name]');
    name.value = '';
  }
}

export default OpenMenu;
