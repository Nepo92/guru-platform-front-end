import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class GoLink {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const clientCard = document.querySelector('[js-menu-client-card]');

    const goBtns = clientCard.querySelectorAll('.platform__go');
    props.goBtns = goBtns;

    const setEvents = this.setEvents.bind(this);
    setEvents(props);
  }

  setEvents(clientCardPack) {
    const { goBtns } = clientCardPack;

    if (goBtns.length) {
      goBtns.forEach((item) => {
        const input = utils.getParent(item, 'platform-form__item').querySelector('input');

        const cloneBtn = utils.setCloneElement(item);

        const setLink = this.setLink.bind(this, input);
        cloneBtn.addEventListener('click', setLink);
      });
    }
  }

  setLink(input, e) {
    const t = e.target;

    t.setAttribute('href', input.value);
  }
}

export default GoLink;
