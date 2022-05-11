<template>
  <div class="analytic">
    <MyMenu />
    <div class="analytic-content custom-scroll">
      <MyHeader
        :props="headerProps"
        @open-tab-settings-menu.prevent="openFunnelSettingsMenu"
        @create-funnel-settings-menu="createFunnelSettingsMenu"
      />
      <FunnelSettings @create-funnel-settings-menu="createFunnelSettingsMenu" />
      <div class="analytic-content__wrapper">
        <AnalyticFilter />
      </div>
    </div>
  </div>
</template>

<script>
import "./MyAnalytic.scss";
import MyMenu from "../Platform/MyMenu/MyMenu.vue";
import MyHeader from "../Platform/MyHeader/MyHeader.vue";
import { analyticStore } from "@/store/store.js";
import AnalyticFilter from "./AnalyticFilter/AnalyticFilter.vue";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";
import FunnelSettings from "./Menus/FunnelSettings/FunnelSettings.vue";
import "@/assets/scss/grid.scss";

const store = analyticStore();
const menuUtils = new MenuUtils();

const { managers, analytic, headerProps } = store;

export default {
  components: {
    MyMenu,
    MyHeader,
    AnalyticFilter,
    FunnelSettings,
  },
  setup() {
    return {
      managers,
      analytic,
      headerProps,
    };
  },
  methods: {
    openFunnelSettingsMenu(props) {
      const funnelMenuProps = {
        menu: this.funnelSettings.menu,
        wrapper: this.funnelSettings.wrapper,
        isOverflowed: true,
      };

      menuUtils.openMenu(funnelMenuProps);
    },
    createFunnelSettingsMenu(props) {
      this.funnelSettings = {
        menu: props.menuFunnelSettings.menu,
        wrapper: props.menuFunnelSettings.wrapper,
      };
    },
  },
};
</script>
