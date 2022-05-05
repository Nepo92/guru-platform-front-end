import Utils from '../../../utils/utils.js';

const utils = new Utils();

class TooltipDealRow {
  init(props) {
    const tooltipWrapper = document.querySelectorAll('[data-deal-reminder]');

    if (tooltipWrapper.length) {
      const showTooltip = this.showTooltip.bind(this, props);
      const hideTooltip = this.hideTooltip.bind(this, props);

      tooltipWrapper.forEach((item) => {
        item.addEventListener('mouseover', showTooltip);
        item.addEventListener('mouseleave', hideTooltip);
      });
    }
  }

  showTooltip(props, e) {
    const t = e.target;

    const rect = t.getBoundingClientRect();

    const tooltip = t.querySelector('.tooltip');

    if (tooltip) {
      tooltip.style.opacity = '1';
      tooltip.style.left = rect.left;

      tooltip.style.bottom = 'auto';
      tooltip.style.top = rect.top;
      tooltip.style.transform = 'translate(-25%, calc(-100% - 10px))';
    }
  }

  hideTooltip(props, e) {
    const t = e.target;

    const tooltip = utils.getParent(t, 'reminder').querySelector('.tooltip');

    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  }
}

export default TooltipDealRow;
