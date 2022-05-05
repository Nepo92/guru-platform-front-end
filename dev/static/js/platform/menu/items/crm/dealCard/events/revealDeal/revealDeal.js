import Utils from '../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../api/api.js';
import AfterRevealDeal from './events/afterRevealDeal.js';

const utils = new Utils();
const afterRevealDeal = new AfterRevealDeal();

class RevealDeal {
  init(dealCardPack) {
    const revealPack = {
      menu: document.querySelector('[js-menu-client-card]'),
    };

    const { menu } = revealPack;

    if (menu) {
      const revealBtn = menu.querySelectorAll('[js-reveal-deal-btn]');

      const reveal = this.revealDeal.bind(this, dealCardPack);

      if (revealBtn.length) {
        revealBtn.forEach((item) => {
          const revealButton = utils.setCloneElement(item);
          revealButton.addEventListener('click', reveal);
        });
      }
    }
  }

  revealDeal(dealCardPacks, e) {
    const t = e?.target || e;

    t.style.pointerEvents = 'none';

    const card = utils.getParent(t, 'deal-card');
    const idDeal = card.getAttribute('data-deal');

    dealCardPacks.dealCard = card;

    const data = {
      id: idDeal,
    };

    dealCardPacks.target = t;

    const revealDeal = dealAPI.revealDeal(data);

    revealDeal.then(
      () => {
        const items = [afterRevealDeal];
        dealCardPacks.target = t;

        items.forEach((item) => {
          const init = item.init.bind(item);
          init(dealCardPacks);
        });
      },
      () => {
        t.style.pointerEvents = 'all';
      },
    );
  }
}

export default RevealDeal;
