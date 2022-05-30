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
        <AnalyticFilter
          :title="'Фильтровать аналитику'"
          :select="selectPeriod"
          :nested="false"
          :selectsArray="selectsArray"
          :activeTab="activeTab"
          @set-filter-period-props="setFilterProps"
        />
        <AnalyticTable
          v-if="filterProps.start"
          :start="filterProps.start"
          :end="filterProps.end"
          :periodSeparate="filterProps.periodSeparate"
          :activeTab="activeTab"
        />
        <MyModal
          v-if="activeTab === 'Общая'"
          :title="funnelColors.title"
          :hasCancel="funnelColors.hasCancel"
          :cancelText="funnelColors.cancelText"
          :applyText="funnelColors.applyText"
          :apply="funnelColors.apply"
          :cancel="funnelColors.cancel"
          :nested="funnelColors.nested"
          @create-modal="createTabSettingsMenu"
        >
          <form ref="formColorSettings">
            <FunnelColorSettings />
          </form>
        </MyModal>
        <MyModal
          v-if="activeTab === 'Трафик'"
          :title="'Настройки воронки'"
          :hasCancel="false"
          :cancelText="''"
          :applyText="'Применить изменения'"
          :cancel="() => false"
          :nested="false"
          :apply="applyFunnelTrafficSettings"
          :selectsArray="selectsArray"
          :activeTab="activeTab"
          @create-modal="createFunnelTrafficSettings"
        >
          <FunnelTrafficSettings />
        </MyModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// styles
import "./MyAnalytic.scss";

// utils
import ModalUtils from "@/components/Platform/MyModal/ModalUtils/ModalUtils";

// store
import { analyticStore } from "./analyticStore/analyticStore";

// components
import MyMenu from "@/components/Platform/MyMenu/MyMenu.vue";
import MyHeader from "@/components/Platform/MyHeader/MyHeader.vue";
import FunnelColorSettings from "./Menus/FunnelColorSettings/FunnelColorSettings.vue";
import AnalyticFilter from "./AnalyticFilter/AnalyticFilter.vue";
import AnalyticTable from "./AnalyticTable/AnalyticTable.vue";
import FunnelTrafficSettings from "./Menus/FunnelTrafficSettings/FunnelTrafficSettings.vue";

// vue
import { defineComponent, ref, Ref } from "vue";
import MyModal from "../Platform/MyModal/MyModal.vue";
import { useRoute } from "vue-router";

// interfaces
import { iCreateModal } from "../Platform/MyModal/interfacesMyModal/interfacesMyModal";
import { iAnalyticFilterProps } from "@/components/MyAnalytic/AnalyticFilter/interfacesAnalyticFilter/interfacesAnalyticFilter";

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
    AnalyticTable,
    FunnelTrafficSettings,
  },
  setup() {
    let activeTab = ref("");
    let modal = ref({} as Ref<HTMLElement>);
    let wrapper = ref({} as Ref<HTMLElement>);
    let formColorSettings = ref({} as Ref<HTMLFormElement>);
    let filterProps = ref({} as Ref<iAnalyticFilterProps>);

    const route = useRoute();
    const { path } = route;

    const store = analyticStore();
    const { headerProps, selectsArray, selectPeriod, funnelColors } = store;

    funnelColors.apply = () => {
      const formData = new FormData(formColorSettings.value as HTMLFormElement);
      const apply = filterAPI.applyFilter(path, formData);

      apply.then(() => {
        const closeModalProps = {
          modal,
          wrapper,
          isOverflowed: funnelColors.nested,
        };

        modalUtils.closeMenu(closeModalProps);

        setTimeout(() => {
          location.reload();
        }, 150);
      });
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

    const setFilterProps = (props: iAnalyticFilterProps) => {
      filterProps.value = props;
    };

    const createFunnelTrafficSettings = (createTrafficModal: iCreateModal) => {
      modal = createTrafficModal.modal;
      wrapper = createTrafficModal.wrapper;
    };

    const applyFunnelTrafficSettings = () => {};

    return {
      headerProps,
      setActiveTab,
      createTabSettingsMenu,
      openTabSettingsMenu,
      formColorSettings,
      funnelColors,
      activeTab,
      selectsArray,
      selectPeriod,
      setFilterProps,
      filterProps,
      createFunnelTrafficSettings,
      applyFunnelTrafficSettings,
    };
  },
});
</script>
