import Utils from '../../../../../../utils/utils.js';
import SearchClient from '../searchClients/searchClient.js';

const utils = new Utils();
const searchClient = new SearchClient();

class OpenCreateCLientMenu {
  init(createClientPack) {
    const props = {
      ...createClientPack,
    };

    const { menu } = props;

    if (menu) {
      const openMenuBtn = document.querySelector('[search-client-add-deal]');

      if (openMenuBtn) {
        const openMenu = this.openMenu.bind(this, props);
        openMenuBtn.addEventListener('click', openMenu);
      }
    }
  }

  openMenu(props) {
    const { menu } = props;

    utils.openModalAnimation(menu, true);

    const items = [searchClient];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default OpenCreateCLientMenu;
