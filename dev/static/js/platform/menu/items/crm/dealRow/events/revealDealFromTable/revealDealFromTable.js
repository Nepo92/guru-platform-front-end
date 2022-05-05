import Utils from '../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../api/api.js';
import AfterRevealDeal from './events/afterRevealDeal.js';

const utils = new Utils();
const afterRevealDeal = new AfterRevealDeal();

class RevealDealFromTable {
  init(props) {
    const revealBtn = document.querySelectorAll('.platform-table [js-reveal-deal-btn]');

    if (revealBtn.length) {
      const reveal = this.revealDeal.bind(this, props);

      revealBtn.forEach((item) => {
        const revealButton = utils.setCloneElement(item);

        revealButton.addEventListener('click', reveal);
      });
    }
  }

  revealDeal(props, e) {
    const t = e.target;

    const row = utils.getParent(t, 'platform-table__row');

    if (row) {
      t.style.pointerEvents = 'none';

      const idDeal = row.getAttribute('data-deal');

      const data = {
        id: idDeal,
      };

      props.target = t;

      const revealDeal = dealAPI.revealDeal(data);

      revealDeal.then(
        () => {
          const items = [afterRevealDeal];
          props.target = t;

          items.forEach((item) => {
            const init = item.init.bind(item);
            init(props);
          });
        },
        () => {
          t.style.pointerEvents = 'all';
        },
      );
    }
  }
}

export default RevealDealFromTable;
