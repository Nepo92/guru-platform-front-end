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
      headerProps: {
        title: "Рабочий стол",
        tabs: [
          {
            name: "Продажи",
            link: "/monitor/",
            settings: false,
          },
          {
            name: "Контроль",
            link: "/monitor-control/",
            settings: false,
          },
        ],
        color: false,
        settings: true,
        border: true,
      },
      monitorBackgroundProps: {
        applyText: "Сохранить изменения",
        apply(e) {},
        title: "Изменить фон рабочего стола",
        hasCancel: false,
        cancel() {},
        cancelText: "",
        nested: false,
      },
    };
  },
});
