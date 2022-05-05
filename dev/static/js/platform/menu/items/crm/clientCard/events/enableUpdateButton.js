import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class EnableUpdateButton {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
      menu: document.querySelector('[js-menu-client-card]'),
    };

    const { menu } = props;

    const fields = menu.querySelectorAll('.client-edit');

    if (fields.length) {
      const enable = this.enableUpdateButton.bind(this, props);

      fields.forEach((item) => {
        const cloneInput = utils.setCloneElement(item);
        cloneInput.addEventListener('input', enable);
      });
    }
  }

  enableUpdateButton(clientCardPack) {
    const { menu } = clientCardPack;

    const updateBtn = menu.querySelector('[edit-client]');

    if (updateBtn.disabled) {
      updateBtn.disabled = false;
    }
  }
}

export default EnableUpdateButton;
