import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class ClearSearchMenu {
  init(createClientPack) {
    const { menu } = createClientPack;

    const input = menu.querySelector('[js-menu-search-input]');
    input.value = '';

    const createBtn = menu.querySelector('[js-create-client]');
    createBtn.disabled = true;

    const clientList = menu.querySelector('[js-client-card-list]');
    utils.removeChildren(clientList, 0);
  }
}

export default ClearSearchMenu;
