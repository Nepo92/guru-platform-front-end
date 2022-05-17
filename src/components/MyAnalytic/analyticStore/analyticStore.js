import { defineStore } from "pinia";

export const analyticStore = defineStore("analyticStore", {
  state() {
    return {
      managers: managers || null,
      headerProps: {
        title: "Аналитика",
        settings: null,
        tabs: [
          {
            name: "Общая",
            settings: true,
            link: "/funnel/",
            nameClass: "analytic",
          },
          {
            name: "Трафик",
            settings: true,
            link: "/traffic/",
            nameClass: "analytic",
          },
          {
            name: "База",
            settings: true,
            link: "/additional/",
            nameClass: "analytic",
          },
        ],
        color: true,
        border: false,
      },
      selectProps: {
        selectsOnPage: [],
      },
    };
  },
  actions: {
    setPath(path) {
      this.currentPage = path;
    },
  },
});
