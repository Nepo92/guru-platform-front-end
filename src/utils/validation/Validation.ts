class Validation {
  validateTimer: number | null;
  timers: Array<number>;

  constructor() {
    this.timers = [];
  }

  init(form: any) {
    const formEntries = Object.entries(form);

    const fields = formEntries.filter((el) => typeof el[1] === 'object' && el[1] !== null);

    const required = this.#required(fields);

    const validate = required;

    form.validate = validate;
  }

  #required(fields: any) {
    const required = fields.filter((el: any) => Object.entries(el[1]).find((item) => item[0] === 'required'));

    required.map((el: any) => {
      if (!el[1].value) {
        el[1].validateError = true;
        el[1].validateErrorMessage = 'Заполните поле';

        setTimeout(() => {
          el[1].validateError = false;
          el[1].validateErrorMessage = '';
        }, 1800);
      } else {
        el[1].validateError = false;
        el[1].validateErrorMessage = '';
      }

      return el;
    });

    return required.every((el: any) => !el[1].validateError);
  }

  minLength() {

  }

  maxLength() {

  }

  uniqNames() {

  }
}

export default Validation;
