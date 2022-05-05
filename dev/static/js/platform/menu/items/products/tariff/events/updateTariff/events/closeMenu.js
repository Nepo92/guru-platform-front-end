import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseMenu {
  init(props) {
    const { menu } = props;

    const removeBtn = menu.querySelector('[js-menu-update-tariff-close-btn]');

    if (removeBtn) {
      const closeMenu = this.closeMenu.bind(this, props);

      const remove = utils.setCloneElement(removeBtn);
      remove.addEventListener('click', closeMenu);
    }
  }

  closeMenu(props) {
    const { menu } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true, false);

    setTimeout(() => {
      this.clearMenu(props);
    }, 800);
  }

  clearMenu(props) {
    const { menu } = props;

    menu.querySelector('[tariff-name]').value = '';
    menu.querySelector('[tariff-coast]').value = '';
    menu.querySelector('.menu-tariff__blocks')?.remove();
  }
}

export default CloseMenu;
