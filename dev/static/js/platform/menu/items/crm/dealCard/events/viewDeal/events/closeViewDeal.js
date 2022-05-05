import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseViewDeal {
  init(viewDealPack) {
    const menu = document.querySelector('[js-menu-deal]');

    if (menu) {
      const closeBtn = menu.querySelector('.platform__close--btn-modal');

      if (closeBtn) {
        const closeViewMenu = this.closeViewMenu.bind(this, viewDealPack);
        viewDealPack.menu = menu;

        const cloneClose = utils.setCloneElement(closeBtn);
        cloneClose.addEventListener('click', closeViewMenu);
      }
    }
  }

  closeViewMenu(viewDealPack) {
    const { menu } = viewDealPack;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    const viewBtn = menu.querySelector('[edit-deal]');
    viewBtn.setAttribute('disabled', '');

    const isClientCardOpen = utils.checkClientCardOpen();

    utils.closeModalAnimation(menu, wrapper, false, isClientCardOpen, true, false);
  }
}

export default CloseViewDeal;
