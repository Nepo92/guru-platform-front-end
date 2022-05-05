import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class CloseClientCard {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const menu = document.querySelector('[js-menu-client-card]');

    if (menu) {
      props.menu = menu;

      const closeBtn = menu.querySelector('.platform__close--btn-modal');

      if (closeBtn) {
        const closeClientCard = this.closeClientCard.bind(this, props);
        closeBtn.addEventListener('click', closeClientCard);
      }
    }
  }

  closeClientCard(clientCardPack) {
    const { menu } = clientCardPack;

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, false, false);

    const editClientBtn = menu.querySelector('[edit-client]');
    editClientBtn.setAttribute('disabled', true);

    const closeInput = this.closeInput.bind(this, clientCardPack);
    setTimeout(closeInput, 800);
  }

  closeInput(clientCardPack) {
    const { menu } = clientCardPack;

    const name = menu.querySelector('[js-client-name]');
    const isView = utils.getCssProperty(name, 'display') === 'flex';

    if (!isView) {
      name.classList.remove('hide');

      const input = menu.querySelector('[js-change-client-name]');
      input.classList.add('hide');
      input.value = '';
    }
  }
}

export default CloseClientCard;
