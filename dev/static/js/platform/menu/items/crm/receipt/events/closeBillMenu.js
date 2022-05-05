import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class CloseBillMenu {
  init() {
    const menu = document.querySelector('[js-pay-menu]');

    if (menu) {
      const closeBtn = menu.querySelector('.platform__close--btn-modal');

      const closeMenu = this.closeMenu.bind(this, menu);

      if (closeBtn) {
        const close = utils.setCloneElement(closeBtn);
        close.addEventListener('click', closeMenu);
      }

      const closePayMenu = menu.querySelector('.pay__close');

      if (closePayMenu) {
        const close = utils.setCloneElement(closePayMenu);
        close.addEventListener('click', closeMenu);
      }
    }
  }

  closeMenu(menu) {
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    const isDealMenu = document.querySelector('[js-menu-deal]') ? document.querySelector('[js-menu-deal]').classList.contains('open') : false;

    if (isDealMenu) {
      utils.closeModalAnimation(menu, wrapper, false, true, false);
    } else {
      utils.closeModalAnimation(menu, wrapper, false, false, false);
    }
  }
}

export default CloseBillMenu;
