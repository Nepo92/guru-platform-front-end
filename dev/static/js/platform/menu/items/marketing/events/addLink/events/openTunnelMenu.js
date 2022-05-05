import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class OpenTunnelMenu {
  init() {
    const openBtn = document.querySelector('[js-add-outside-link]');

    if (openBtn) {
      const open = utils.setCloneElement(openBtn);

      const openMenu = this.openMenu.bind(this);

      open.addEventListener('click', openMenu);
    }
  }

  openMenu() {
    const menu = document.querySelector('[js-menu-add-outside]');

    utils.openModalAnimation(menu, true);
  }
}

export default OpenTunnelMenu;
