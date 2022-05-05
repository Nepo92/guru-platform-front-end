import Utils from '../../../../../../../../../utils/utils.js';
import DealFields from '../dealFields.js';

const utils = new Utils();

class DateRequest extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    const { menu, isView } = dealPack;

    const input = menu.querySelector('[date-request]');
    dealPack.input = input;

    this.setDateRequest(dealPack);
    this.dispatchViewMode(isView, input);

    const textArea = menu.querySelector('[date-request]');

    const changeTextAreaValue = this.change.bind(this, dealPack);
    textArea.addEventListener('input', changeTextAreaValue);

    const eventsArray = [];

    if (eventsArray) {
      const page = document.querySelector('.page');
      const changeReqDate = this.changeReqDate.bind(this, dealPack);

      if (!utils.checkListener(page, 'click', changeReqDate, eventsArray)) {
        utils.addListener(page, 'click', changeReqDate, null, eventsArray);
      }
    }
  }

  dispatchViewMode(isView, input) {
    if (isView) {
      input.classList.add('disable');
      utils.getParent(input, 'platform-select__wrapper').classList.add('disable');
    } else {
      input.classList.remove('disable');
      utils.getParent(input, 'platform-select__wrapper').classList.remove('disable');
    }
  }

  setDateRequest(dealPack) {
    const { deal, input } = dealPack;

    if (deal && deal.type) {
      const { dealDate } = deal;

      if (dealDate) {
        input.value = utils.getDateFormatDDMMYYYY(dealDate);
      }
    } else {
      input.value = '';
    }
  }
}

export default DateRequest;
