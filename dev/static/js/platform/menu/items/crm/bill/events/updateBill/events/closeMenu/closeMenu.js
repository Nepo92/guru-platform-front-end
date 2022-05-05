import Utils from '../../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseMenu {
  init(props) {
    const { menu } = props;

    const closeBtn = menu.querySelector('.platform__close--btn-modal');
    const cancelBtn = menu.querySelector('.bill__close');

    const closeMenu = this.closeMenu.bind(this, props);

    [closeBtn, cancelBtn].forEach((item) => {
      if (item) {
        const close = utils.setCloneElement(item);
        close.addEventListener('click', closeMenu);
      }
    });
  }

  closeMenu(props) {
    const { menu } = props;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true, false);
  }
}

export default CloseMenu;
