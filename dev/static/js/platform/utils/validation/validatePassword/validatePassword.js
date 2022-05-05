import ValidationWrapper from '../../validation.js';

class ValidatePassword extends ValidationWrapper {
  init(form) {
    const pwds = Array.from(form.querySelectorAll('.client-password__input'));

    const notEmty = pwds.every((el) => el.value);

    let validate;

    if (!notEmty) {
      pwds.forEach((item) => {
        if (!item.value) {
          this.setError(item, 'Заполните поле', 'check-password');
        }
      });

      validate = false;
    } else {
      const coincedence = pwds[0].value === pwds[1].value;

      if (!coincedence) {
        this.setError(pwds[1], 'Пароли должны совпадать', 'check-password');
        validate = coincedence;

        return validate;
      }

      const lengthСonstraint = pwds[0].value.length > 16;

      if (lengthСonstraint) {
        validate = !lengthСonstraint;
        this.setError(pwds[1], 'Максимальная длина пароля - 16 символов', 'check-password');
      } else {
        validate = !lengthСonstraint;
      }
    }

    return validate;
  }
}

export default ValidatePassword;
