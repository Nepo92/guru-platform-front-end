import Utils from '../../../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseTunnelMenu {
  init(props) {
    const { menu } = props;

    const closeBtn = menu.querySelector('[js-menu-add-outside-close-btn]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);

      const closeMenu = this.closeMenu.bind(this, props);
      close.addEventListener('click', closeMenu);
    }
  }
}

export default CloseTunnelMenu;
