import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseMenu {
  init(props) {
    const { menu } = props;

    const closeBtn = menu.querySelector('[close-motivation-add-menu]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);

      const closeMenu = this.closeMenu.bind(this, props);

      close.addEventListener('click', closeMenu);
    }
  }

  closeMenu(props) {
    const { menu } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false, false, false);
  }
}

export default CloseMenu;
