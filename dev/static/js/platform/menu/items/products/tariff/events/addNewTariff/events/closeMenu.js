import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseMenu {
  init(props) {
    const { menu } = props;

    if (menu) {
      const closeBtn = menu.querySelector('[close-tariff]');

      if (closeBtn) {
        const closeMenu = this.closeMenu.bind(this, props);

        const close = utils.setCloneElement(closeBtn);

        close.addEventListener('click', closeMenu);
      }
    }
  }

  closeMenu(props) {
    const { menu } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true, false);
  }
}

export default CloseMenu;
