import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class StatusDealCardChanged {
  init(dealCardPack) {
    this.changeSelecStatusColor(dealCardPack);
  }

  changeSelecStatusColor(dealCardPack) {
    const { statusCode, target } = dealCardPack;

    const selectWrapper = utils.getParent(target, 'deal-status__text');

    selectWrapper.className = 'deal-status__text';
    selectWrapper.classList.add(`deal-select__${statusCode}`);
  }
}

export default StatusDealCardChanged;
