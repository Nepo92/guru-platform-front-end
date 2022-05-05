import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class ClearClientCard {
  init(createClientPack) {
    const props = {
      ...createClientPack,
    };

    const clear = this.clear.bind(this);
    clear(props);
  }

  clear(createClientPack) {
    const { menu } = createClientPack;

    const clientInfo = menu.querySelectorAll('.client-edit');

    clientInfo.forEach((item) => {
      item.value = '';
    });

    const selector = menu.querySelector('.platform-form__selector');
    selector.style.display = 'none';

    const access = menu.querySelector('.access-item');
    access.style.display = 'none';
    utils.removeChildren(access, 0);

    const tabs = menu.querySelector('.client-card__tabs');
    tabs.style.display = 'none';

    const contents = menu.querySelectorAll('.client-card__content');

    contents.forEach((item) => {
      utils.removeChildren(item);
    });

    const iconsCopy = menu.querySelectorAll('.platform__copy');
    const iconsGo = menu.querySelectorAll('.platform__go');

    iconsCopy.forEach((item) => {
      item.style.display = 'none';
    });

    iconsGo.forEach((item) => {
      item.style.display = 'none';
    });

    const delimetrs = menu.querySelectorAll('.platform__nav--delim');

    delimetrs.forEach((item) => {
      item.style.display = 'none';
    });

    const avatar = menu.querySelector('.platform-form__avatar--bg');

    if (avatar) {
      avatar.innerText = '';
    }
  }
}

export default ClearClientCard;
