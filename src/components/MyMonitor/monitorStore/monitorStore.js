import { defineStore } from 'pinia';

export const monitorStore = defineStore("monitorStore", {
  state() {
    return {
      company: company || null,
      background: bgColor.color || null,
      actionBanners: actionBanners || null,
      role: role || null,
      selectProps: {
        selectsOnPage: [],
      },
    };
  },
});
