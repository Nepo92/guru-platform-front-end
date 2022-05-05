import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class CloseTunnelMenu {
  init(props) {
    const addLinkProps = {
      ...props,
      menu: document.querySelector('[js-menu-add-outside]'),
    };

    const { menu } = addLinkProps;

    if (menu) {
      const closeBtn = menu.querySelector('[js-menu-add-outside-close-btn]');

      if (closeBtn) {
        const close = utils.setCloneElement(closeBtn);

        const closeMenu = this.closeMenu.bind(this, addLinkProps);
        close.addEventListener('click', closeMenu);
      }
    }
  }

  closeMenu(props) {
    const { menu } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);
  }
}

export default CloseTunnelMenu;
