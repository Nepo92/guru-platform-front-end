import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class IndicatorHistoryChanges {
  init(dealCardPack) {
    const { deals, menu } = dealCardPack;

    if (deals) {
      deals.forEach((item) => {
        const dealCard = menu.querySelector(`.deal-card[data-deal="${item.id}"]`);

        if (dealCard) {
          const status = dealCard.querySelector('[data-select-type="status-deal"] [id-selected]');

          if (status) {
            const changeHistory = this.#changeStatusHistory.bind(this, dealCardPack);

            status.addEventListener('change', changeHistory);
          }
        }
      });
    }
  }

  #changeStatusHistory(dealCardPack, e) {
    const { deals } = dealCardPack;
    const t = e.target;

    dealCardPack.target = t;

    dealCardPack.card = utils.getParent(t, 'deal-card');

    const idDeal = +dealCardPack.card.getAttribute('data-deal');

    dealCardPack.deal = deals.find((el) => el.id === idDeal);

    this.#appendStatusToHistory(dealCardPack);
  }

  #appendStatusToHistory(dealCardPack) {
    const { card, pack } = dealCardPack;
    const { dealStatuses, closeStatusArray } = pack;

    if (!closeStatusArray.includes(dealCardPack.statusCode)) {
      const indexStatus = dealStatuses.findIndex((el) => el.code === dealCardPack.statusCode);

      const prevStatuses = dealStatuses.slice(0, indexStatus);

      const historyWrapper = card.querySelector('.deal-indicator__left');
      utils.removeChildren(historyWrapper);

      if (prevStatuses.length) {
        prevStatuses.forEach((item) => {
          const div = document.createElement('div');
          div.classList.add('deal-indicator__history');
          div.classList.add(item.code);

          historyWrapper.appendChild(div);
        });
      }
    }
  }
}

export default IndicatorHistoryChanges;
