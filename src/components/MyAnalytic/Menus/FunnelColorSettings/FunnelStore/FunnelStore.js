import {defineStore} from 'pinia';

export const funnelSettingsStore = defineStore('funnelSettingsStore', {
  state() {
    return {
      filter: filter || null,
    }
  }
});
