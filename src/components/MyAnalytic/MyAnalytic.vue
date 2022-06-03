<template>
  <div class="page">
    <MyMenu />
    <div class="page-content custom-scroll">
      <MyHeader
        :props="headerProps"
        @set-active-tab="(tab) => setActiveTab(tab)"
        @open-tab-settings-menu="(e) => openTabSettingsMenu(e)"
      />
      <div v-if="activeTab.value" class="page-content__wrapper">
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
          v-if="activeTab.value === 'Общая'"
          v-slot="slotProps"
          :title="funnelColors.title"
          :hasCancel="funnelColors.hasCancel"
          :hasApply="funnelColors.hasApply"
          :cancelText="funnelColors.cancelText"
          :applyText="funnelColors.applyText"
          :apply="funnelColors.apply"
          :cancel="funnelColors.cancel"
          :nested="funnelColors.nested"
          :size="funnelColors.size"
          @create-modal="createTabSettingsMenu"
        >
          <form ref="formColorSettings">
            <FunnelColorSettings :props="slotProps" />
          </form>
        </MyModal>
        <MyModal
          v-if="activeTab.value === 'Трафик'"
          v-slot="slotProps"
          :title="funnelTrafficSettings.title"
          :hasCancel="funnelTrafficSettings.hasCancel"
          :cancelText="funnelTrafficSettings.cancelText"
          :applyText="funnelTrafficSettings.applyText"
          :cancel="() => false"
          :nested="false"
          :apply="funnelTrafficSettings.apply"
          :activeTab="activeTab"
          :selectsArray="selectsArray"
          :slotData="slotData"
          :hasApply="funnelTrafficSettings.hasApply"
          :size="funnelTrafficSettings.size"
          @create-modal="createFunnelTrafficSettings"
        >
          <form ref="formTrafficSettings">
            <FunnelTrafficSettings
              :activeTab="slotProps.activeTab"
              :selectsArray="slotProps.selectsArray"
              @create-slot="createSlot"
            />
          </form>
        </MyModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ModalUtils from "@/components/Platform/MyModal/ModalUtils/ModalUtils";
import { analyticStore } from "./analyticStore/analyticStore";
import MyMenu from "@/components/Platform/MyMenu/MyMenu.vue";
import MyHeader from "@/components/Platform/MyHeader/MyHeader.vue";
import FunnelColorSettings from "./Menus/FunnelColorSettings/FunnelColorSettings.vue";
import AnalyticFilter from "./AnalyticFilter/AnalyticFilter.vue";
import AnalyticTable from "./AnalyticTable/AnalyticTable.vue";
import FunnelTrafficSettings from "./Menus/FunnelTrafficSettings/FunnelTrafficSettings.vue";
import { defineComponent, ref, Ref, reactive } from "vue";
import MyModal from "../Platform/MyModal/MyModal.vue";
import { useRoute } from "vue-router";
import { iCreateModal } from "../Platform/MyModal/interfacesMyModal/interfacesMyModal";
import { iAnalyticFilterProps } from "@/components/MyAnalytic/AnalyticFilter/interfacesAnalyticFilter/interfacesAnalyticFilter";
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
  setup(props, { emit }) {
    let activeTab = reactive({ value: "" });
    let modal = ref({} as Ref<HTMLElement>);
    let wrapper = ref({} as Ref<HTMLElement>);
    let formColorSettings = ref({} as Ref<HTMLFormElement>);
    let filterProps = ref({} as Ref<iAnalyticFilterProps>);
    let formTrafficSettings = ref({} as Ref<HTMLFormElement>);
    let slotData = reactive({} as Ref<Array<HTMLElement>>);
    let fromSlot = reactive({} as Ref<Array<HTMLElement>>);

    const route = useRoute();
    const { path } = route;

    const store = analyticStore();

    const {
      headerProps,
      selectsArray,
      selectPeriod,
      funnelColors,
      funnelTrafficSettings,
      audienceList,
    } = store;

    const applyFunnelSettings = (
      form: Ref<HTMLFormElement>,
      fromSlot: Ref<Array<HTMLElement>> | null = null
    ) => {
      const formData = new FormData(form.value);

      if (fromSlot?.value) {
        fromSlot.value.forEach((item) => {
          formData.set(
            `${item.getAttribute("name")}`,
            `${(item as HTMLInputElement).checked}`
          );
          formData.set(
            `_${item.getAttribute("name")}`,
            `${(item as HTMLInputElement).checked ? "on" : "off"}`
          );
        });
      }

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

    funnelColors.apply = () => {
      applyFunnelSettings(formColorSettings);
    };

    funnelTrafficSettings.apply = () => {
      applyFunnelSettings(formTrafficSettings, fromSlot);
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
      fromSlot = <Ref<Array<HTMLElement>>>createTrafficModal.slotData;
    };

    const createSlot = (props: Ref<Array<HTMLElement>>) => {
      slotData.value = props.value;
    };

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
      formTrafficSettings,
      funnelTrafficSettings,
      createSlot,
      slotData,
      audienceList,
    };
  },
});
</script>
