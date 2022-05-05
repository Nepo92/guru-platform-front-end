import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseMenu {
  init(props) {
    const { menu } = props;

    if (menu) {
      const closeBtn = menu.querySelector('[close-funnels-funnel-add]');
      const cancelBtn = menu.querySelector('[cancel-funnel]');

      const btns = [closeBtn, cancelBtn];

      if (btns.length) {
        const closeMenu = this.closeMenu.bind(this, props);

        btns.forEach((item) => {
          const close = utils.setCloneElement(item);
          close.addEventListener('click', closeMenu);
        });
      }
    }
  }

  closeMenu(props) {
    const { menu } = props;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false, false);
  }
}

export default CloseMenu;
