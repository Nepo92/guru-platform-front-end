import ValidationWrapper from "../../validationWrapper.js";

class ValidateFunnel extends ValidationWrapper {
  init(form) {
    const inputName = form.querySelector("[js-funnel-name]");
    const name = inputName.value.trim();

    const inputTilda = form.querySelector("[id-tilda]");
    const idTilda = inputTilda.value;

    const funnels = document.querySelectorAll(".funnels-funnel__item");

    const uniqName = this.#checkUniqName(funnels, name);
    const idTildaValidate = this.#checkIdTilda(idTilda);

    const validate = uniqName && idTildaValidate;

    if (!uniqName) {
      this.setError(inputName, "Имя должно быть уникальным");
    }

    if (!idTildaValidate) {
      this.setError(inputTilda, "Id Тильда - только цифры");
    }

    return validate;
  }

  #checkUniqName(funnels, name) {
    const names = Array.from(funnels).map((item) => {
      return item
        .querySelector(".funnels-funnel__title")
        .innerText.trim()
        .toLowerCase();
    });

    return !names.includes(name.toLowerCase());
  }

  #checkIdTilda(idTilda) {
    const idLength = idTilda.length;
    // eslint-disable-next-line
    const checkedLength = idTilda.split("").filter((el) => !isNaN(+el)).length;

    return idLength === checkedLength;
  }
}

export default ValidateFunnel;
