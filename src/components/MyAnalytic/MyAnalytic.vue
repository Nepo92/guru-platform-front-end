<template>
  <div class="analytic">
    <MyMenu />
    <div class="analytic-content custom-scroll">
      <MyHeader
        :props="headerProps"
        @open-tab-settings-menu.prevent="openFunnelSettingsMenu"
        @create-funnel-settings-menu="createFunnelSettingsMenu"
        @active-tab="getTabsRef"
      />
      <FunnelSettings @create-funnel-settings-menu="createFunnelSettingsMenu" />
      <div class="analytic-content__wrapper">
        <Suspense>
          <AnalyticFilter :props="{ selectsProps: selectProps }" />
        </Suspense>
        <AnalyticTable />
      </div>
    </div>
  </div>
</template>

<script>
// styles
import "./MyAnalytic.scss";
import "@/assets/scss/grid.scss";

// components
import MyMenu from "../Platform/MyMenu/MyMenu.vue";
import MyHeader from "../Platform/MyHeader/MyHeader.vue";
import AnalyticFilter from "./AnalyticFilter/AnalyticFilter.vue";
import FunnelSettings from "./Menus/FunnelSettings/FunnelSettings.vue";
import AnalyticTable from "./AnalyticTable/AnalyticTable.vue";

// utils
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

// store
import { analyticStore } from "./AnalyticStore/AnalyticStore.js";

const menuUtils = new MenuUtils();
const store = analyticStore();

const { managers, analytic, headerProps, selectProps } = store;

export default {
  components: {
    MyMenu,
    MyHeader,
    AnalyticFilter,
    FunnelSettings,
    AnalyticTable,
  },
  setup() {
    return {
      managers,
      analytic,
      headerProps,
      selectProps,
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
