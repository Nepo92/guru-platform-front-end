import { defineStore } from "pinia";

export const funnelSettingsStore = defineStore("funnelSettingsStore", {
  state() {
    return {
      // eslint-disable-next-line
      filter: filter || null,
    };
  },
});
