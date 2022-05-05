import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CopyLink {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const clientCard = document.querySelector('[js-menu-client-card]');

    const copyBtns = clientCard.querySelectorAll('.platform__copy');
    props.copyBtns = copyBtns;

    const setEvents = this.setEvents.bind(this);
    setEvents(props);
  }

  setEvents(clientCardPack) {
    const { copyBtns } = clientCardPack;

    if (copyBtns.length) {
      copyBtns.forEach((item) => {
        const input = utils.getParent(item, 'platform-form__item').querySelector('input');
        const copyLink = this.copyLink.bind(this, input);

        const copyClone = utils.setCloneElement(item);
        copyClone.addEventListener('click', copyLink);
      });
    }
  }

  copyLink(input, e) {
    utils.copyLink(input.value, e);
  }
}

export default CopyLink;
