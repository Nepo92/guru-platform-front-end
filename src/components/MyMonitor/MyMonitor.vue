<template>
  <div class="monitor" :style="{ backgroundColor: background }">
    <MyMenu />
    <div class="monitor-content custom-scroll">
      <MyHeader :props="props" @open-settings-menu="(e) => openSettingsMenu(e)" />
      <div class="monitor-content__wrapper">
        <MonitorFilter :props="{ selectsProps: selectProps }" />
        <ActionBanner v-if="showActionBanner()" />
        <MonitorWidgets />
        <ManagerStat />
      </div>
    </div>
    <BackgroundSettings
      @save-background="(e) => saveBackground(e)"
      @close-background-settings="closeBackgroundSettings"
      @create-settings-menu="createSettingsMenu"
    />
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script>
// components
import MyMenu from "../Platform/MyMenu/MyMenu.vue";
import MyHeader from "../Platform/MyHeader/MyHeader.vue";
import BackgroundSettings from "./Menus/BackgroundSettings/BackgroundSettings.vue";
import MonitorFilter from "./MonitorFilter/MonitorFilter.vue";
import MyLoader from "../Platform/MyLoader/MyLoader.vue";
import MonitorWidgets from "./MonitorWidgets/MonitorWidgets.vue";
import ManagerStat from "./ManagerStat/ManagerStat.vue";

// store
import { monitorStore } from "./monitorStore/monitorStore";
import { storeToRefs } from "pinia";

// api
import { monitorAPI } from "@/api/api.js";

// utils
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

// styles
import "./MyMonitor.scss";

const menuUtils = new MenuUtils();
const loaderUtils = new LoaderUtils();

const store = monitorStore();

const { actionBanners, role, company, background, selectProps } = storeToRefs(store);

export default {
  components: {
    MyMenu,
    MyHeader,
    BackgroundSettings,
    MonitorFilter,
    MyLoader,
    MonitorWidgets,
    ManagerStat,
  },
  setup() {
    return {
      background,
      company,
      selectProps,
    };
  },
  data() {
    return {
      props: {
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
    };
  },
  methods: {
    createSettingsMenu(props) {
      const { menuBackgroundSettings } = props;

      this.headerProps = {
        menuBackgroundSettings: menuBackgroundSettings.menu,
        menuBackgroundSettingsWrapper: menuBackgroundSettings.wrapper,
        backgroundInput: menuBackgroundSettings.backgroundInput,
      };
    },
    openSettingsMenu(e) {
      const t = e.target;

      const data = {
        id: this.company.id,
      };

      const getBackground = monitorAPI.getCompanyBg(data);

      const loader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      }, 400);

      t.classList.add("disabled");

      getBackground.then(
        (backgroundInfo) => {
          clearTimeout(loader);
          loaderUtils.hideLoader(this.loader);
          t.classList.remove("disabled");

          const { backgroundInput } = this.headerProps;

          const { color } = backgroundInfo;

          backgroundInput.value = color;

          const openModalprops = {
            menu: this.headerProps.menuBackgroundSettings,
            wrapper: this.headerProps.menuBackgroundSettingsWrapper,
            isOverflowed: true,
          };

          menuUtils.openMenu(openModalprops);
        },
        () => {
          clearTimeout(loader);
          loaderUtils.hideLoader(this.loader);
          t.classList.remove("disabled");
        }
      );
    },
    closeBackgroundSettings() {
      const closeModalprops = {
        menu: this.headerProps.menuBackgroundSettings,
        wrapper: this.headerProps.menuBackgroundSettingsWrapper,
        isOverflowed: false,
      };

      menuUtils.closeMenu(closeModalprops);
    },
    saveBackground(e) {
      const t = e.target;

      const data = {
        color: this.headerProps.backgroundInput.value,
        idCompany: this.company.id,
      };

      const saveBackground = monitorAPI.changeBackground(data);

      const loader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      }, 400);

      t.classList.add("disabled");

      saveBackground.then(
        () => {
          clearTimeout(loader);
          loaderUtils.hideLoader(this.loader);
          t.classList.remove("disabled");

          this.background = data.color;

          this.closeBackgroundSettings();
        },
        () => {
          clearTimeout(loader);
          loaderUtils.hideLoader(this.loader);
          t.classList.remove("disabled");
        }
      );
    },
    createLoader(props) {
      this.loader = props.loader;
    },
    showActionBanner() {
      return (role == "ROLE_MANAGER" || role == "ROLE_HEAD_MANAGER") && actionBanners.size() != 0;
    },
  },
};
</script>
