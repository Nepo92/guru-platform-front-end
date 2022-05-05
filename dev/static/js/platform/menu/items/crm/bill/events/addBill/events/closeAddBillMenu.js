import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseBillAddMenu {
  init(props) {
    const { menu } = props;

    const closeBtn = menu.querySelector('.platform__close--btn-modal');
    const cancelBtn = menu.querySelector('.bill__close');

    const closeMenu = this.closeMenu.bind(this, props);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeMenu);
    }
  }

  closeMenu(props) {
    const { menu } = props;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true, false);
  }
}

export default CloseBillAddMenu;
