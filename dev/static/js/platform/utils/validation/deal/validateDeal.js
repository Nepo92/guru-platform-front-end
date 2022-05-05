import ValodationWrapper from '../../validationWrapper.js';

class ValidateDeal extends ValodationWrapper {
  init(form) {
    this.removeRequired(form);

    const required = Array.from(form.querySelectorAll('[required]'));

    const validate = required.every((el) => el.value);

    const priceItem = form.querySelector('[name="price"]');
    const billsPrice = this.getBillsPrice(form);
    const checkPrice = priceItem.value >= billsPrice;

    if (validate && checkPrice) return true;

    if (!validate) {
      required.forEach((item) => {
        if (!item.value) {
          this.setError(item);
        }
      });
    }

    if (!checkPrice) {
      this.setError(priceItem, 'Стоимость продукта меньше суммы\nвыставленных счетов');
      priceItem.value = billsPrice;
    }

    return false;
  }

  getBillsPrice() {
    const billsItems = document.querySelectorAll('.bill__item');

    const bills = Array.from(billsItems).filter((el) => !el.classList.contains('bill__create'));

    const getSumBills = this.getSumBills.bind(this);

    const billsPrice = bills.length ? bills.reduce(getSumBills, 0) : 0;

    return billsPrice;
  }

  getSumBills(prev, current) {
    const prevItem = typeof (prev) !== 'number' ? parseInt(prev.querySelector('.price__value').innerText, 10) : prev;
    const currentItem = current ? parseInt(current.querySelector('.price__value')?.innerText, 10) : 0;

    return prevItem + currentItem;
  }

  removeRequired(form) {
    const productItem = form.querySelector('[data-select-type="select-product"]');
    const productValue = productItem.querySelector('[id-selected]');

    const tariffItem = form.querySelector('[data-select-type="select-tariff"]');
    const tariffValue = tariffItem.querySelector('[id-selected]');

    const streamItem = form.querySelector('[data-select-type="select-stream"]');
    const streamValue = streamItem.querySelector('[id-selected]');

    const priceItem = form.querySelector('[price-item]');
    const priceValue = priceItem.querySelector('[price]');

    const items = [productValue, tariffValue, streamValue, priceValue];

    const status = +form.querySelector('[data-select-type="select-status"] [id-selected]').value;

    if (status === 1) {
      items.forEach((el) => el.removeAttribute('required'));
    }

    if (status !== 1) {
      const itemsInput = [productValue, tariffValue, streamValue, priceValue];

      itemsInput.forEach((el) => el.setAttribute('required', ''));

      if (tariffItem.classList.contains('hide')) {
        tariffValue.removeAttribute('required');
      }
    }
  }
}

export default ValidateDeal;
