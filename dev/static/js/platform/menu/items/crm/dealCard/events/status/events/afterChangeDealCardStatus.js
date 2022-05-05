import StatusDealCardChanged from './statusDealCardChanges.js';
import ChangePrevStatusValue from './prevStatusChanged.js';
import RerenderDealRow from './RerenderDealRow.js';

const statusDealCardChanged = new StatusDealCardChanged();
const changePrevStatusValue = new ChangePrevStatusValue();
const rerenderDealRow = new RerenderDealRow();

class AfterChangeDealCardStatus {
  init(dealCardPack) {
    const items = [statusDealCardChanged, changePrevStatusValue, rerenderDealRow];

    dealCardPack.isChanged = true;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealCardPack);
    });
  }
}

export default AfterChangeDealCardStatus;
