import { interfaceLoginForm } from "../interfaces/interfacesMyLogin";
import { loginAPI } from "@/api/api";
import LoaderUtils from "@/components/UI/MyLoader/utils/LoaderUtils";
import Validation from "@/utils/validation/Validation";

const loaderUtils = new LoaderUtils();
const validation = new Validation();

class LoginUser {
  init(form: interfaceLoginForm, e: any) {
    validation.init(form);

    if (form.validate) {
      this.#tryLogin(form, e);
    }
  }

  async #tryLogin(form: interfaceLoginForm, e: any) {
    const t = e.target;
    const { loader } = form;

    t.classList.add("no-active");

    const showLoader = setTimeout(() => {
      loaderUtils.showLoader(loader);
    }, 400);

    const send = this.#getSendData(form);

    const response = await loginAPI.login(send as FormData);

    clearTimeout(showLoader);
    loaderUtils.hideLoader(loader);
    t.classList.remove("no-active");

    const hasError = response.includes("error=true");

    if (hasError) {
      form.errorMessage = "Неверный логин или пароль";
    } else {
      location.reload();
    }
  }

  #getSendData(form: interfaceLoginForm) {
    const send = new FormData();
    send.set("username", form.username.value);
    send.set("password", form.password.value);

    if (form["remember-me"]) {
      send.set("remember-me", `${form["remember-me"]}`);
    }

    return send;
  }
}

export default LoginUser;
