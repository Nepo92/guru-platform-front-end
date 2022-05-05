import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class EditPlan {
  closeMenu() {
    const menu = document.querySelector('[js-menu-plan-add]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);
  }
}

export default EditPlan;
