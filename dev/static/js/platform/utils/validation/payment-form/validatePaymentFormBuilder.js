import ValidationWrapper from '../../validationWrapper.js';

class ValidationPaymentFormBuilder extends ValidationWrapper {
  init(form, isNew) {
    const name = form.querySelector('[payment-form-name]');
    const dealType = form.querySelector('[data-select-type="select-deal-type"] [id-selected]');
    const funnel = form.querySelector('[data-select-type="select-funnel"] [id-selected]');
    const product = form.querySelector('[data-select-type="select-product"] [id-selected]');
    const tariff = form.querySelector('[data-select-type="select-tariff"]');
    const paymentFormLink = form.querySelector('.payment-form__links-wrapper');
    const conf = form.querySelector('[payment-form-private]');
    const offer = form.querySelector('[payment-form-offer]');
    const paymentMethod = form.querySelector('[data-select-type="select-payment-method"] [id-selected]');

    const items = [
      name,
      funnel,
      product,
      paymentFormLink,
      dealType,
      conf,
      offer,
      paymentMethod,
    ];

    if (!tariff.classList.contains('hide')) {
      const idTariff = tariff.querySelector('[id-selected]');
      items.push(idTariff);
    }

    const startDateRadio = Array.from(document.querySelectorAll('[name="startDate"]'));

    const selected = startDateRadio.find((el) => el.checked)?.getAttribute('data-type');

    if (selected === 'one-date') {
      const oneDateSelect = Array.from(form.querySelectorAll('[one-date-select]'));

      items.push(oneDateSelect);
    } else {
      const multiplyDate = form.querySelector('[multiply-date-select] [id-selected]');
      items.push(multiplyDate);
    }

    const errors = [];
    errors.length = 0;

    const namesValues = [];

    const names = document.querySelectorAll('.payment-form__name');

    if (names.length && isNew) {
      names.forEach((item) => {
        namesValues.push(item.innerText.trim().toLowerCase());
      });

      this.checkUniqName(names, name);
    }

    items.forEach((item) => {
      if (Array.isArray(item) && item.length) {
        const nochecked = item.every((el) => !el.checked);

        if (nochecked) {
          errors.push(item[item.length - 1]);
          this.setError(item[item.length - 1]);
        }
      } else if (!Array.isArray(item) && item && !item.classList.contains('payment-form__links-wrapper') && !item.value) {
        this.setError(item);
        errors.push(item);
      } else if (!Array.isArray(item) && item && item.classList.contains('payment-form__links-wrapper')) {
        const links = Array.from(item.children);

        const validateLink = links.every((el) => !el.classList.contains('active'));

        if (validateLink) {
          errors.push(item);
          this.setError(item);
        }
      }
    });

    const dates = document.querySelector('.payment-form__date-wrapper');

    if (dates.children.length === 0) {
      this.setError(dates, 'Дата старта отсутсвует');
      errors.push(dates);
    }

    return !errors.length;
  }
}

export default ValidationPaymentFormBuilder;
