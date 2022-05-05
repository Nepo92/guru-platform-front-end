import Utils from '../../../../../../utils/utils.js';
import CloseMenu from './events/closeMenu.js';
import AddTariff from './events/addTariff.js';
import TariffBlocks from '../tariffBlocks.js';

const utils = new Utils();
const closeMenu = new CloseMenu();
const addTariff = new AddTariff();

class AddNewTariff extends TariffBlocks {
  init(props) {
    const tariffProps = {
      ...props,
      menu: document.querySelector('[js-menu-add-tariff]'),
    };

    const { addButton } = tariffProps;

    if (addButton) {
      const newTariff = this.newTariff.bind(this, tariffProps);

      const cloneAddBtn = utils.setCloneElement(addButton);

      cloneAddBtn.addEventListener('click', newTariff);
    }
  }

  newTariff(props) {
    const { menu } = props;

    utils.openModalAnimation(menu, true);

    const blocks = this.getBlocks(props);

    blocks.then((blocksData) => {
      props.blocks = blocksData;

      this.renderBlocksToMenu(props);
      this.clearMenu(props);

      const items = [closeMenu, addTariff];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }

  clearMenu(props) {
    const { menu } = props;

    menu.querySelector('[tariff-name]').value = '';
    menu.querySelector('[tariff-coast]').value = '';

    const blocks = menu.querySelectorAll('[block-checbox]');

    if (blocks.length) {
      blocks.forEach((item) => {
        item.checked = false;
      });
    }
  }
}

export default AddNewTariff;
