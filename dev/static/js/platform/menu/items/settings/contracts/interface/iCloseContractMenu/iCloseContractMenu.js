import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class ICloseContractMenu {
  init() {
    const menu = document.querySelector('[contract-menu]');

    if (menu) {
      const closeBtn = menu.querySelector('[close-btn]');

      if (closeBtn) {
        const close = utils.setCloneElement(closeBtn);

        const closeMenu = this.#closeMenu.bind(this, menu);
        close.addEventListener('click', closeMenu);
      }
    }
  }

  #closeMenu(menu) {
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);
  }
}

export default ICloseContractMenu;
