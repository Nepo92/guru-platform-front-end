import Utils from '../../../../../utils/utils';

const utils = new Utils();

class BannersModal {
  menu = document.querySelector('[js-add-banner-menu]');

  init() {
    if (this.menu) {
      const addBanner = document.querySelector('.banner__add');

      if (addBanner) {
        const open = this.open.bind(this);
        addBanner.addEventListener('click', open);
      }

      const closeMenuBtn = document.querySelector('[close-add-banner-menu]');

      if (closeMenuBtn) {
        const close = this.close.bind(this);

        closeMenuBtn.addEventListener('click', close);
      }
    }
  }

  open() {
    utils.openModalAnimation(this.menu, true);
  }

  close() {
    const wrapper = this.menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(this.menu, wrapper, false, false);
  }
}

export default BannersModal;
