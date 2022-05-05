import Utils from '../../../utils/utils.js';

const utils = new Utils();

class TooltipDealCard {
  init(dealCardPack) {
    this.showTooltipAccessManager(dealCardPack);
  }

  showTooltipAccessManager(dealCardPack) {
    const { deals, menu } = dealCardPack;

    if (deals) {
      deals.forEach((item) => {
        const card = menu ? menu.querySelector(`.deal-card[data-deal="${item.id}"]`) : '';

        if (card) {
          const manager = card.querySelector('.deal-card__author');
          const showTooltip = this.showTooltip.bind(this);
          const hideTooltip = this.hideTooltip.bind(this);

          const cloneManager = utils.setCloneElement(manager);

          cloneManager.addEventListener('mouseenter', showTooltip);
          cloneManager.addEventListener('mouseleave', hideTooltip);
        }
      });
    }
  }

  showTooltip(e) {
    const t = e.target;

    if (!t.classList.contains('deal-card__author')) return false;

    const rect = t.getBoundingClientRect();

    const tooltip = t.querySelector('.tooltip');

    tooltip.style.opacity = '1';
    tooltip.style.left = rect.left;

    tooltip.style.bottom = 'auto';
    tooltip.style.top = rect.top;
    tooltip.style.transform = 'translate(-25%, calc(-100% - 10px))';
  }

  hideTooltip(e) {
    const t = e.target;

    if (!t.classList.contains('deal-card__author')) return false;

    const tooltip = t.querySelector('.tooltip');
    tooltip.style.opacity = '0';
  }
}

export default TooltipDealCard;
