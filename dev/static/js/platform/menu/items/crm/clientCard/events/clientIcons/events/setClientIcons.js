import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class SetClientIcons {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const setIcons = this.setClientIcons.bind(this);
    setIcons(props);
  }

  setClientIcons(clientCardPack) {
    const { client, menu } = clientCardPack;

    const toggleIcon = menu.querySelector('[client-remove]') || menu.querySelector('[client-recover]');

    if (!client.hidden && toggleIcon) {
      toggleIcon.className = 'client-nav__remove';
      toggleIcon.setAttribute('client-remove', '');
      toggleIcon.removeAttribute('client-recover');
    } else if (client.hidden && toggleIcon) {
      toggleIcon.className = 'client-nav__recover';
      toggleIcon.setAttribute('client-recover', '');
      toggleIcon.removeAttribute('client-remove');
    }

    const clientCard = document.querySelector('[js-menu-client-card]');

    const copy = clientCard.querySelectorAll('.platform__copy');
    const go = clientCard.querySelectorAll('.platform__go');

    const [tel, email, telegram, vk] = Array.from(copy);
    const [telega, link] = Array.from(go);

    if (!client.phone) {
      tel.style.display = 'none';
    } else {
      tel.style.display = 'flex';
    }

    if (!client.email) {
      email.style.display = 'none';
    } else {
      email.style.display = 'flex';
    }

    if (!client.link) {
      vk.style.display = 'none';
      link.style.display = 'none';
      const item = utils.getParent(vk, 'platform-form__item').querySelector('.platform__nav--delim');

      item.style.display = 'none';
    } else {
      vk.style.display = 'flex';
      link.style.display = 'flex';
      const item = utils.getParent(vk, 'platform-form__item').querySelector('.platform__nav--delim');

      item.style.display = 'flex';
    }

    if (!client.telegram) {
      telegram.style.display = 'none';
      telega.style.display = 'none';

      const item = utils.getParent(telega, 'platform-form__item').querySelector('.platform__nav--delim');

      item.style.display = 'none';
    } else {
      telegram.style.display = 'flex';
      const item = utils.getParent(telega, 'platform-form__item').querySelector('.platform__nav--delim');
      telega.style.display = 'flex';

      item.style.display = 'flex';
    }
  }
}

export default SetClientIcons;
