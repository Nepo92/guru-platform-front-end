import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class CopyLink {
  init(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const { isView } = props;

    const t = e.target;

    if (!isView) {
      utils.copyLink(t.getAttribute('href'));

      this.setTooltip(props, e);
    }
  }

  setTooltip(props, e) {
    const t = e.target;

    const bill = utils.getParent(t, 'bill__item');
    bill.style.pointerEvents = 'none';

    const tooltipProps = {
      bill,
      props,
    };

    this.afterClearTooltip(tooltipProps);
  }

  async setInitialStyleToTooltip(tooltip) {
    tooltip.style.top = 35;
    tooltip.style.right = '-100%';
  }

  showTooltip(tooltip, res) {
    tooltip.style.transition = 'all 0.5s cubic-bezier(.66,.65,.24,1.01)';
    tooltip.classList.remove('hide');
    res();
  }

  async removeAllTooltips(bill, res) {
    document.querySelectorAll('.tooltip__copy').forEach(async (item) => {
      item.style.top = 35;
      item.style.right = '-100%';
      item.style.transition = 'all 0s linear';
      await item.classList.add('hide');
    });

    res();
  }

  async afterClearTooltip(tooltipProps) {
    const { bill } = tooltipProps;

    const tooltip = await document.querySelector('.tooltip__copy');

    await new Promise((res) => {
      const showTooltip = this.showTooltip.bind(this, tooltip, res);
      setTimeout(showTooltip);
    });

    await new Promise((res) => {
      setTimeout(() => {
        tooltip.style.right = 80;

        res();
      }, 50);
    });

    await new Promise((res) => {
      const removeAllTooltips = this.removeAllTooltips.bind(this, bill, res);

      setTimeout(removeAllTooltips, 1050);
    });

    bill.style.pointerEvents = 'all';
  }
}

export default CopyLink;
