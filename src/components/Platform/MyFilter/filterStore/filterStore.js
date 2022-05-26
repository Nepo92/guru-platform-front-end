import { defineStore } from "pinia";

export const filterStore = defineStore("fitlerStore", {
  state() {
    return {
      // eslint-disable-next-line
      filter: filter || null,
      selectsProps: { selectsArray: [], selectsBody: [] },
    };
  },
});
