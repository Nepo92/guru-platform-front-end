import {
  iLoginProps,
  interfaceLoginForm,
} from "../interfacesMyLogin/interfacesMyLogin";
import { loginAPI } from "@/api/api";
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";
import Validation from "@/utils/Validation/Validation";

const loaderUtils = new LoaderUtils();
const validation = new Validation();

class LoginUser {
  init(props: iLoginProps, e: MouseEvent) {
    validation.init(props.form);

    if (props.form.validate) {
      this.#tryLogin(props, e);
    }
  }

  async #tryLogin(props: iLoginProps, e: MouseEvent) {
    const t = e.target;
    const { loader } = props;

    (t as Element).classList.add("no-active");

    const showLoader = setTimeout(() => {
      loaderUtils.showLoader(loader);
    }, 400);

    const send = this.#getSendData(props.form);

    const response = await loginAPI.login(send as FormData);

    const hasError = response.includes("error=true");

    if (hasError) {
      clearTimeout(showLoader);
      loaderUtils.hideLoader(loader);
      (t as Element).classList.remove("no-active");

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
