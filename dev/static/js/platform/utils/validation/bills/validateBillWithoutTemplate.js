import ValidationWrapper from '../../validationWrapper.js';
import Utils from '../../utils.js';

const utils = new Utils();

class ValidateBillWithoutTemplate extends ValidationWrapper {
  init(props) {
    const { menu } = props;

    const form = menu.querySelector('[pay-form]');

    const items = this.getValidateItems(form);

    const checkEmptyItems = this.checkEmptyItems.bind(this);

    const checkEmpty = items.every(checkEmptyItems);

    return !checkEmpty ? this.noValidEmpty(items) : this.validEmpty(items, props);
  }

  getValidateItems(form) {
    const method = form.querySelector('[js-bill-payment-method]');
    const plannedPayDate = Array.from(form.querySelectorAll('[js-bill-planned-date]'));
    const sum = Array.from(form.querySelectorAll('[js-bill-sum]'));

    const items = [
      method,
      plannedPayDate,
      sum,
    ];

    return items;
  }

  checkEmptyItems(el) {
    const checkNumberNull = this.checkNumberNull.bind(this);

    let value;

    if (Array.isArray(el)) {
      value = el.every(checkNumberNull);
    } else {
      value = +el.value.trim() === 0 ? false : el.value.trim();
    }

    return value;
  }

  checkNumberNull(item) {
    return +item.value.trim() === 0 ? false : item.value.trim();
  }

  setEmptyErrors(item) {
    if (Array.isArray(item)) {
      item.forEach((elem) => {
        if (!elem.value.trim() || +elem.value.trim() === 0) {
          this.setError(elem);
        }
      });
    } else if (!Array.isArray(item) && !item.value.trim()) {
      this.setError(item);
    }
  }

  noValidEmpty(items) {
    const setEmptyErrors = this.setEmptyErrors.bind(this);
    items.forEach(setEmptyErrors);

    return false;
  }

  validEmpty(items, props) {
    const [, dates, sum] = items;

    const checkSum = this.checkSum(sum, props);

    const params = {
      ...props,
      dates,
    };

    const validItems = checkSum && this.checkDatesValue(params);

    return validItems;
  }

  checkSum(sum, props) {
    const { deal, menu } = props;

    const getSumBills = this.getSumBills.bind(this);

    const sumNoSavedBills = sum.reduce(getSumBills, 0);

    const summaSavedBills = utils.sumBills();

    const diff = deal.price - sumNoSavedBills - summaSavedBills;

    const negativeSum = sum.find((el) => el.value < 0);

    if (negativeSum) {
      sum.forEach((item) => {
        if (item.value < 0) {
          this.setError(item, 'Отрицательное значение счета');
          item.classList.add('bill-error__border');
        }
      });

      return false;
    }

    if (diff < 0) {
      sum.forEach((item, index) => {
        if (index === sum.length - 1) {
          this.setError(item, 'Сумма счетов, больше суммы продукта');
        }
      });

      const lastSumInput = sum[sum.length - 1];

      const sumArray = Array.from(menu.querySelectorAll('[js-bill-sum]'));
      const noSavedBillWithoutLast = sumArray.filter((el, index, arr) => index !== arr.length - 1);
      const noSavedBillSum = noSavedBillWithoutLast.reduce(getSumBills, 0);

      const remainder = deal.price - noSavedBillSum - summaSavedBills;

      lastSumInput.value = remainder < 0 ? '' : remainder;
    } else {
      sum.forEach((item) => item.classList.remove('bill-error__border'));
    }

    return !(diff < 0);
  }

  getSumBills(prev, current) {
    const prevValue = prev?.value ? +prev.value : +prev;

    return prevValue + +current.value;
  }

  checkDatesValue(props) {
    const { dates } = props;
    const validateDate = this.validateDate.bind(this);

    const checkDateFormat = dates.every((el) => validateDate(el.value, el));

    const setErrorDateFormat = this.setErrorDateFormat.bind(this);

    if (!checkDateFormat) {
      dates.forEach(setErrorDateFormat);
    } else {
      dates.forEach(setErrorDateFormat);
    }

    return checkDateFormat;
  }

  setErrorDateFormat(item) {
    if (!this.validateDate(item.value, item)) {
      this.setError(item, 'Формат даты: ДД.ММ.ГГГГ');
      item.classList.add('bill-error__border');
    } else {
      item.classList.remove('bill-error__border');
    }
  }

  checkFirstDate(props) {
    const { deal, dates } = props;
    const first = dates.find((el) => el.hasAttribute('first-payment'));

    return first ? this.checkFirstDateValue(deal, first) : true;
  }

  checkFirstDateValue(deal, first) {
    const startDate = utils.getDateFormatDDMMYYYY(deal.startDate);

    const compareDates = utils.compareDates(startDate, first.value);

    if (!compareDates) {
      this.setError(first, 'Дата оплаты при первом расчете,\nдолжна быть меньше или равна\nдате старта продукта', 'planned-date-bill');
    }

    return compareDates;
  }
}

export default ValidateBillWithoutTemplate;
