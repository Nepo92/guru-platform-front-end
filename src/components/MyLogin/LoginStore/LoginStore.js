import { defineStore } from "pinia";

export const loginStore = defineStore("loginStore", {
  state() {
    // eslint-disable-next-line
    const backgroundData = background.companyBackground;

    return {
      background:
        backgroundData ||
        "-webkit-linear-gradient(180deg, rgb(143, 149, 194) 0%, rgb(167, 137, 185) 100%)",
      hidePassword: true,
    };
  },
  actions: {
    сhangeDisplayPassword() {
      this.hidePassword = !this.hidePassword;
    },
  },
});
