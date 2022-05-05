import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class PrevStatusChanged {
  init(dealCardPack) {
    this.changePrevStatusValue(dealCardPack);
  }

  changePrevStatusValue(dealCardPack) {
    const { target, pack } = dealCardPack;
    const { dealStatuses } = pack;

    const dealCard = utils.getParent(target, 'deal-card');

    const prevStatus = dealCard.querySelector('[status-previous]');

    const selectedStatus = dealStatuses.find((el) => el.id === +target.value);

    prevStatus.value = selectedStatus.code;
  }
}

export default PrevStatusChanged;
