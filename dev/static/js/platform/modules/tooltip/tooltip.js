import Utils from '../../utils/utils.js';
import TooltipDealCard from './events/tooltipDealCard.js';
import TooltipDealRow from './events/tooltipDealRow.js';

const tooltipDealCard = new TooltipDealCard();
const tooltipDealRow = new TooltipDealRow();
const utils = new Utils();

class Tooltip {
  init(dealCardPack) {
    const tooltipProps = this.#getProps(dealCardPack);

    const items = [tooltipDealCard, tooltipDealRow];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tooltipProps);
    });
  }

  #getProps(props) {
    return utils.getDeepCopy(props);
  }

  tooltipListener(tooltipClass) {
    this.arr.forEach((item) => {
      clearTimeout(item);
    });

    const tooltip = document.querySelector(`.${tooltipClass}`);

    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  }

  tooltipInit(input, tooltipClass) {
    const tooltipOnPage = document.querySelector(`.${tooltipClass}`);

    if (!tooltipOnPage) {
      const error = document.createElement('div');
      error.classList.add('validate-error');

      error.classList.add(tooltipClass);

      error.innerText = 'Формат даты: ДД.ММ.ГГГГ';

      input.parentNode.appendChild(error);

      setTimeout(() => {
        error.style.opacity = '1';
      }, 100);
    } else {
      tooltipOnPage.style.opacity = '1';
    }
  }
}

export default Tooltip;
