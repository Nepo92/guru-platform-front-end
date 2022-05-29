import { defineStore } from "pinia";

export const loginStore = defineStore("loginStore", {
  state() {
    const backgroundData = background.companyBackground;

    return {
      background:
        backgroundData ||
        "-webkit-linear-gradient(180deg, rgb(143, 149, 194) 0%, rgb(167, 137, 185) 100%)",
      hidePassword: true,
      form: {
        username: {
          required: true,
          value: "",
          validateError: false,
          validateErrorMessage: "",
        },
        password: {
          required: true,
          value: "",
          validateError: false,
          validateErrorMessage: "",
        },
        errorMessage: "",
        loader: null,
        "remember-me": false,
        validate: false,
      },
    };
  },
  actions: {
    сhangeDisplayPassword() {
      this.hidePassword = !this.hidePassword;
    },
  },
});
