import { defineStore } from "pinia";

export const monitorStore = defineStore("monitorStore", {
  state() {
    return {
      // eslint-disable-next-line
      company: company || null,
      // eslint-disable-next-line
      background: bgColor.color || null,
      // eslint-disable-next-line
      actionBanners: actionBanners || null,
      // eslint-disable-next-line
      role: role || null,
      selectsArray: [],
    };
  },
});
