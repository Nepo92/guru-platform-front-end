<template>
  <div class="analytic">
    <MyMenu />
    <div class="analytic-content custom-scroll">
      <MyHeader
        :props="headerProps"
        @set-active-tab="(tab: string) => setActiveTab(tab)"
        @open-tab-settings-menu="(e) => openTabSettingsMenu(e)"
      />
      <div v-if="activeTab" class="analytic-content__wrapper">
        <Suspense>
          <AnalyticFilter
            :title="'Фильтровать аналитику'"
            :select="selectPeriod"
            :nested="false"
            :selectsArray="selectsArray"
            :activeTab="activeTab"
          />
        </Suspense>
        <!-- <AnalyticTable
          v-if="filterPeriodProps"
          :props="{ ...filterPeriodProps }"
        />
        <FunnelTrafficSettings
          v-if="$route.path === '/funnel/traffic/'"
          :props="selectProps"
          @create-tab-settings-menu="createMenu"
        /> -->
        <MyModal
          @create-modal="createTabSettingsMenu"
          :title="funnelColors.title"
          :hasCancel="funnelColors.hasCancel"
          :cancelText="funnelColors.cancelText"
          :applyText="funnelColors.applyText"
          :cancel="funnelColors.cancel"
          :nested="funnelColors.nested"
          :settingsOject="funnelColors"
        >
          <FunnelColorSettings
            @create-funnel-color-settings="createFunnelColorSettings"
          />
        </MyModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// styles
import "./MyAnalytic.scss";
import "@/assets/scss/grid.scss";

// utils
import ModalUtils from "@/components/Platform/MyModal/ModalUtils/ModalUtils";

// store
import { analyticStore } from "./analyticStore/analyticStore";

// components
import MyMenu from "@/components/Platform/MyMenu/MyMenu.vue";
import MyHeader from "@/components/Platform/MyHeader/MyHeader.vue";
import FunnelColorSettings from "./Menus/FunnelColorSettings/FunnelColorSettings.vue";
import AnalyticFilter from "./AnalyticFilter/AnalyticFilter.vue";

// vue
import { defineComponent, ref, Ref, reactive } from "vue";
import MyModal from "../Platform/MyModal/MyModal.vue";
import { useRoute } from "vue-router";

// interfaces
import {
  iCreateModal,
  iModalWrapper,
} from "../Platform/MyModal/interfacesMyModal/interfacesMyModal";

// api
import { filterAPI } from "@/api/api";

const modalUtils = new ModalUtils();

export default defineComponent({
  components: {
    MyMenu,
    MyHeader,
    MyModal,
    FunnelColorSettings,
    AnalyticFilter,
  },
  setup() {
    let activeTab = ref("");
    let modal = ref({} as Ref<HTMLElement>);
    let wrapper = ref({} as Ref<HTMLElement>);
    let form = ref({} as Ref<HTMLFormElement>);
    let funnelColors = reactive({} as iModalWrapper);

    const route = useRoute();
    const { path } = route;

    const store: any = analyticStore();
    const { headerProps, selectsArray, selectPeriod } = store;

    funnelColors = {
      applyText: "Применить изменения",
      apply() {
        const formData = new FormData(form.value);
        const apply = filterAPI.applyFilter(path, formData);

        apply.then(() => {
          location.reload();
        });
      },
      title: "Настройки воронки",
      hasCancel: false,
      cancel() {},
      cancelText: "",
      nested: false,
    };

    const setActiveTab = (tab: string) => {
      activeTab.value = tab;
    };

    const createTabSettingsMenu = (props: iCreateModal) => {
      modal = props.modal;
      wrapper = props.wrapper;
    };

    const openTabSettingsMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const openModalProps = {
        modal,
        wrapper,
        isOverflowed: !funnelColors.nested,
      };
      modalUtils.openMenu(openModalProps);
    };

    const createFunnelColorSettings = (props: HTMLFormElement) => {
      form.value = props;
    };

    return {
      headerProps,
      setActiveTab,
      createTabSettingsMenu,
      openTabSettingsMenu,
      createFunnelColorSettings,
      funnelColors,
      activeTab,
      selectsArray,
      selectPeriod,
    };
  },
});
</script>
