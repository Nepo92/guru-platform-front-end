import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class AfterSaveDeal {
  init(dealCardPack) {
    const { menu, target } = dealCardPack;
    target.style.pointerEvents = 'all';
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true, true, false);
    const editBtn = menu.querySelector('[edit-deal]');

    if (editBtn) {
      editBtn.setAttribute('disabled', '');
    }

    utils.removeMenuAfterClosed(menu);
  }
}

export default AfterSaveDeal;
