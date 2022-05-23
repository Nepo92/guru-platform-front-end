import { defineStore } from "pinia";

export const analyticStore = defineStore("analyticStore", {
  state() {
    return {
      // eslint-disable-next-line
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
            link: "/funnel/traffic/",
            nameClass: "analytic",
          },
          {
            name: "База",
            settings: true,
            link: "/funnel/additional/",
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
});
