<template>
  <div class="analytic">
    <MyMenu />
    <div class="analytic-content custom-scroll">
      <MyHeader
        :props="headerProps"
        @open-tab-settings-menu.prevent="openFunnelSettingsMenu"
        @active-tab="getTabsRef"
      />
      <FunnelSettings v-if="$route.path === '/funnel/'" @create-tab-settings-menu="createMenu" />
      <FunnelTrafficSettings
        v-if="$route.path === '/funnel/traffic/'"
        :props="selectProps"
        @create-tab-settings-menu="createMenu"
      />
      <div class="analytic-content__wrapper">
        <Suspense>
          <AnalyticFilter :props="{ selectsProps: selectProps }" />
        </Suspense>
        <Suspense>
          <AnalyticTable />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
// styles
import "./MyAnalytic.scss";
import "@/assets/scss/grid.scss";

// utils
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

// store
import { analyticStore } from "./AnalyticStore/AnalyticStore.js";

// components
import MyMenu from "@/components/Platform/MyMenu/MyMenu.vue";
import MyHeader from "@/components/Platform/MyHeader/MyHeader.vue";
import AnalyticFilter from "./AnalyticFilter/AnalyticFilter.vue";
import FunnelSettings from "./Menus/FunnelSettings/FunnelSettings.vue";
import AnalyticTable from "./AnalyticTable/AnalyticTable.vue";
import FunnelTrafficSettings from "./Menus/FunnelTrafficSettings/FunnelTrafficSettings.vue";

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
    FunnelTrafficSettings,
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
    openFunnelSettingsMenu() {
      const funnelMenuProps = {
        menu: this.funnelSettings.menuSettings.menu,
        wrapper: this.funnelSettings.menuSettings.wrapper,
        isOverflowed: true,
      };

      menuUtils.openMenu(funnelMenuProps);
    },
    createMenu(props) {
      this.funnelSettings = props;
    },
  },
};
</script>
