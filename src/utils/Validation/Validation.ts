import { interfaceLoginForm } from "@/components/MyLogin/interfacesMyLogin/interfacesMyLogin";
import { requiredItem } from "./interfacesValidation/interfacesValidation";
import { Entries } from "@/components/Platform/interfacesPlatform/interfacesPlatform";

class Validation {
  init(form: interfaceLoginForm) {
    const formEntries = Object.entries(form);

    const fields: Entries<interfaceLoginForm> = <Entries<interfaceLoginForm>>(
      formEntries.filter((el) => typeof el[1] === "object" && el[1] !== null)
    );

    const required = this.#required(fields);

    form.validate = required;
  }

  #required(fields: Entries<interfaceLoginForm>) {
    const required = fields.filter((el) =>
      Object.entries(el[1]).find((item) => item[0] === "required")
    );

    required.map((el) => {
      const hasValue = !!(el[1] as requiredItem).value;

      if (!hasValue) {
        (el[1] as requiredItem).validateError = true;
        (el[1] as requiredItem).validateErrorMessage = "Заполните поле";

        setTimeout(() => {
          (el[1] as requiredItem).validateError = false;
          (el[1] as requiredItem).validateErrorMessage = "";
        }, 1800);
      } else {
        (el[1] as requiredItem).validateError = false;
        (el[1] as requiredItem).validateErrorMessage = "";
      }

      return el;
    });

    return required.every((el) => !(el[1] as requiredItem).validateError);
  }

  minLength() {}

  maxLength() {}

  uniqName() {}
}

export default Validation;
