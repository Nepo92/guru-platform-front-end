import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class ClosePaymentFormAddMenu {
  init(props) {
    const propsForm = {
      ...props,
      menu: document.querySelector('[payment-form-add]'),
    };

    const { menu } = propsForm;

    if (menu) {
      const closeBtn = menu.querySelector('[close-btn]');

      if (closeBtn) {
        const closeMenu = this.closeMenu.bind(this, propsForm);

        const close = utils.setCloneElement(closeBtn);
        close.addEventListener('click', closeMenu);
      }
    }
  }

  closeMenu(props) {
    const { menu } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    props.isPaymentForm = false;

    utils.closeModalAnimation(menu, wrapper, false, false, false);
  }
}

export default ClosePaymentFormAddMenu;
