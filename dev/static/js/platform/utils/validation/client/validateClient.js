import ValidationWrapper from '../../validationWrapper.js';

class ValidateClient extends ValidationWrapper {
  init() {
    const required = Array.from(document.querySelectorAll('[required]'));

    if (required.length) {
      const validate = [];

      required.forEach((item) => {
        const checkProps = {
          item,
          validate,
        };

        if (item.getAttribute('name') === 'name') {
          const check = this.validateUserName(item);
          checkProps.error = this.setErrorClientName.bind(this, item);

          this.checkItem(check, checkProps);
        } else if (item.getAttribute('name') === 'phone') {
          const check = this.validTel(item);
          checkProps.error = this.setErrorTelephone.bind(this, item);

          this.checkItem(check, checkProps);
        } else if (item.getAttribute('name') === 'email') {
          const check = this.checkEmail(item);
          checkProps.error = this.setError.bind(this, item, 'Формат E-mail: name@mail.ru');

          this.checkItem(check, checkProps);
        } else if (item.getAttribute('name') === 'agree') {
          const check = item.checked;

          checkProps.error = this.setError.bind(this, item, 'Согласитесь с договорами', 'bill-payment-agreements');
          this.checkItem(check, checkProps);
        }
      });

      if (validate.length === required.length) return true;

      return false;
    }
  }

  checkItem(check, props) {
    const { item, validate, error } = props;

    if (!check) {
      error(item);
    } else {
      validate.push(check);
    }
  }

  validateAgreements() {
    const checkbox = document.querySelector('[id="agreements"]');

    if (!checkbox.checked) {
      this.setError(checkbox, 'Прочитайте условия соглашений');
    }

    return checkbox.checked;
  }
}

export default ValidateClient;
