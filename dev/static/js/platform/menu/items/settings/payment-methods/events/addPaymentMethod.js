import Utils from '../../../../../utils/utils.js';
// import Validation from '../../../utils/validation/payment-method/validatePaymentMethod.js';

const utils = new Utils();
// const validation = new Validation();

class AddPaymentMethod {
  init(props) {
    const { menu } = props;
    const createBtn = menu.querySelector('[js-create-row]');

    if (createBtn) {
      const openMenu = this.openMenu.bind(this, props);

      const create = utils.setCloneElement(createBtn);
      create.addEventListener('click', openMenu);
    }
  }

  openMenu(props) {
    const { menu } = props;

    utils.openModalAnimation(menu, true);
    this.closeMenu(menu);
    this.saveMethodEvent(props);
  }

  closeMenu(menu) {
    const closeBtn = menu.querySelector('[js-menu-create-row-close-btn]');

    if (closeBtn) {
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);

      const close = utils.setCloneElement(closeBtn);
      close.addEventListener('click', closeMenu);
    }
  }

  saveMethodEvent(props) {
    const { menu } = props;
    const saveBtn = menu.querySelector('[js-save-row]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);
      const saveMethod = this.saveMethod.bind(this, props);

      save.addEventListener('click', saveMethod);
    }
  }

  saveMethod() {
    // const { menu } = props;

    // const form = menu.querySelector('[js-row-form]');
  }
}

export default AddPaymentMethod;
