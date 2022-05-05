import ValidationWrapper from '../../validationWrapper.js';
import Utils from '../../utils.js';

const utils = new Utils();

class ValidateUpdateBills extends ValidationWrapper {
  init(props) {
    const { menu } = props;

    const items = this.getItems(menu);

    const checkNumberNull = this.checkNumberNull.bind(this);

    const checkEmpty = items.filter((el) => el).every(checkNumberNull);

    if (!checkEmpty) {
      const setErrorEmpty = this.setErrorEmpty.bind(this);
      items.forEach(setErrorEmpty);
    }

    return !checkEmpty ? checkEmpty : this.checkInputValues(items, props);
  }

  checkNumberNull(el) {
    return +el.value.trim() === 0 ? false : el.value.trim();
  }

  getItems(menu) {
    const paymentMethod = menu.querySelector('[js-bill-payment-method]');
    const sum = menu.querySelector('[js-bill-sum-update]');
    const type = menu.querySelector('[js-bill-payment-type-update]');
    const date = menu.querySelector('[js-bill-planned-date-update]');

    return [
      paymentMethod,
      sum,
      type,
      date,
    ];
  }

  setErrorEmpty(item) {
    if ((item && !item.value.trim()) || (item && +item.value.trim() === 0)) {
      this.setError(item);
    }
  }

  checkInputValues(items, props) {
    const [, sum] = items;

    const checkSum = this.checkSum(sum, props);

    return checkSum;
  }

  checkSum(sum, props) {
    const { deal, bill } = props;

    const sumBills = utils.sumBills(bill);

    const checkSumBills = (+sum.value + sumBills) <= deal.price;

    if (!checkSumBills) {
      this.setError(sum, 'Сумма счета, больше суммы продукта');
    }

    return checkSumBills;
  }
}

export default ValidateUpdateBills;
