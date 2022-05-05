import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseMenu {
  init(props) {
    const closeProps = {
      ...props,
      menu: document.querySelector('[js-menu-motivation-add]'),
    };

    const { menu } = closeProps;

    const closeBtn = menu.querySelector('[close-motivation-add-menu]');
    const cancelBtn = menu.querySelector('[js-motivation-cancel]');

    const btns = [closeBtn, cancelBtn];

    if (btns.length) {
      btns.forEach((item) => {
        if (item) {
          const close = utils.setCloneElement(item);

          const closeMenu = this.closeMenu.bind(this, closeProps);
          close.addEventListener('click', closeMenu);
        }
      });
    }
  }

  closeMenu(props) {
    const { menu } = props;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false, false);
  }
}

export default CloseMenu;
