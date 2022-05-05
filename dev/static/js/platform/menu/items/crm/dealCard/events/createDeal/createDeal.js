import Utils from '../../../../../../utils/utils.js';
import CloseCreateDealMenu from './events/closeCreateDealMenu.js';
import OpenCreateDealMenu from './events/openCreateDealMenu.js';

const openMenu = new OpenCreateDealMenu();
const closeMenu = new CloseCreateDealMenu();
const utils = new Utils();

class CreateDeal {
  init(dealPack) {
    const createProps = this.#getProps(dealPack);

    const createBtn = document.querySelector('.deal-card__create');

    if (createBtn) {
      const items = [openMenu, closeMenu];

      createProps.menu = document.querySelector('[js-menu-deal]');
      createProps.createBtn = createBtn;
      createProps.clientCard = document.querySelector('[js-menu-client-card]');

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(createProps);
      });
    }
  }

  #getProps(props) {
    return utils.getDeepCopy(props);
  }
}

export default CreateDeal;
