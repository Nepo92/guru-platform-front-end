import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class HoverTooltipActionBanner {
  init() {
    const tooltips = document.querySelectorAll('[tooltip-action]');

    if (tooltips.length) {
      const showTooltip = this.showTooltip.bind(this);
      const hideTooltip = this.hideTooltip.bind(this);

      tooltips.forEach((item) => {
        item.addEventListener('mouseover', showTooltip);
        item.addEventListener('mouseleave', hideTooltip);
      });
    }
  }

  showTooltip(e) {
    const t = e.target;

    const tooltipItem = t.hasAttribute('tooltip-action') ? t : utils.getParent(t, 'tile__tooltip');

    if (tooltipItem) {
      const tooltipMessage = tooltipItem.querySelector('.action-banner__tooltip');

      if (tooltipMessage) {
        tooltipMessage.style.position = 'fixed';
        tooltipMessage.style.top = `${tooltipItem.getBoundingClientRect().top - tooltipMessage.offsetHeight - 10}px`;
        tooltipMessage.style.left = `${tooltipItem.getBoundingClientRect().right}px`;
        tooltipMessage.style.opacity = '1';
        tooltipMessage.style.transform = 'translateX(-100%)';
      }
    }
  }

  hideTooltip(e) {
    const t = e.target;

    const tooltipItem = t.hasAttribute('tooltip-action') ? t : utils.getParent(t, 'tile__tooltip');

    if (tooltipItem) {
      const tooltipMessage = tooltipItem.querySelector('.action-banner__tooltip');

      if (tooltipMessage) {
        tooltipMessage.style.opacity = '0';
      }
    }
  }
}

export default HoverTooltipActionBanner;
