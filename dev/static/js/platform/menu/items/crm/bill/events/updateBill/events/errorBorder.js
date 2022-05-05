import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class ErrorBorder {
  init(props) {
    this.setSumError(props);
  }

  setSumError(props) {
    const { menu, bill, deal } = props;

    const sum = menu.querySelector('[js-bill-sum-update]');

    const sumBill = utils.sumBills(bill);
    const currentSum = bill?.sum + sumBill;

    if (bill?.id < 0) {
      if (currentSum > deal.price || bill.sum < 0) {
        sum.classList.add('bill-error');
        sum.classList.add('bill-error__border');
      } else {
        sum.classList.remove('bill-error');
        sum.classList.remove('bill-error__border');
      }
    } else {
      sum.classList.remove('bill-error');
      sum.classList.remove('bill-error__border');
    }
  }
}

export default ErrorBorder;
