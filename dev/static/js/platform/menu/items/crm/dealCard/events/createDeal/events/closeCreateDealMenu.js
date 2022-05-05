import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseCreateDealMenu {
  init(dealPack) {
    const { menu } = dealPack;

    const closeBtn = menu.querySelector('.platform__close--btn-modal');

    if (closeBtn) {
      const closeMenu = this.closeMenu.bind(this, dealPack);
      closeBtn.addEventListener('click', closeMenu);
    }
  }

  closeMenu(dealPack) {
    const { menu } = dealPack;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    const isClientCardOpen = utils.checkClientCardOpen();

    utils.closeModalAnimation(menu, wrapper, false, isClientCardOpen, false);
  }
}

export default CloseCreateDealMenu;
