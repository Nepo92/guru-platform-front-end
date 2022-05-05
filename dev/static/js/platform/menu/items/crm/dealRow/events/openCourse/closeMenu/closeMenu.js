import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseMenu {
  init(props) {
    const menu = document.querySelector('[js-menu-deal]');

    const closeBtn = menu.querySelector('.platform__close--btn-modal');

    if (closeBtn) {
      const closeMenu = this.closeMenu.bind(this, props);

      const close = utils.setCloneElement(closeBtn);
      close.addEventListener('click', closeMenu);
    }
  }

  closeMenu(props) {
    const menu = document.querySelector('[js-menu-deal]');

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    const overflowed = props.openFromDealCard || false;

    utils.closeModalAnimation(menu, wrapper, false, overflowed);

    if (overflowed) {
      props.openFromDealCard = false;
    }
  }
}

export default CloseMenu;
