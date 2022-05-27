import {
  iLoginProps,
  interfaceLoginForm,
} from "../interfaces/interfacesMyLogin";
import { loginAPI } from "@/api/api";
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";
import Validation from "@/utils/Validation/Validation";

const loaderUtils = new LoaderUtils();
const validation = new Validation();

class LoginUser {
  init(props: iLoginProps, e: any) {
    validation.init(props.form);

    if (props.form.validate) {
      this.#tryLogin(props, e);
    }
  }

  async #tryLogin(props: iLoginProps, e: any) {
    const t = e.target;
    const { loader } = props;

    t.classList.add("no-active");

    const showLoader = setTimeout(() => {
      loaderUtils.showLoader(loader);
    }, 400);

    const send = this.#getSendData(props.form);

    const response = await loginAPI.login(send as FormData);

    clearTimeout(showLoader);
    loaderUtils.hideLoader(loader);
    t.classList.remove("no-active");

    const hasError = response.includes("error=true");

    if (hasError) {
      props.form.errorMessage = "Неверный логин или пароль";
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
