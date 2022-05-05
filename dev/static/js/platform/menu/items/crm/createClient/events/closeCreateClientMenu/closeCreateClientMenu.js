import Utils from '../../../../../../utils/utils.js';
import ClearSearchMenu from '../clearSearchMenu.js';

const utils = new Utils();
const clearSearchMenu = new ClearSearchMenu();

class CloseCreateClientMenu {
  init(props) {
    const closeProps = {
      ...props,
    };

    const { menu } = props;

    if (menu) {
      const closeMenuBtn = menu.querySelector('.platform__close--btn-modal');

      if (closeMenuBtn) {
        const closeMenu = this.closeMenu.bind(this, closeProps);
        closeMenuBtn.addEventListener('click', closeMenu);
      }
    }
  }

  closeMenu(props) {
    const { menu } = props;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);
    const closeSearchMenu = clearSearchMenu.init.bind(clearSearchMenu, props);

    setTimeout(closeSearchMenu, 800);
  }
}

export default CloseCreateClientMenu;
