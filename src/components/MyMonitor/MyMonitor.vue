<template>
  <div class="monitor" :style="{ backgroundColor: backgroundColor }">
    <MyMenu />
    <div class="monitor-content custom-scroll">
      <MyHeader
        :props="headerProps"
        @open-settings-menu="(e: MouseEvent) => openSettingsMenu(e)"
        @set-active-tab="(tab: string) => setActiveTab(tab)"
      />
      <div v-if="activeTab" class="monitor-content__wrapper">
        <MonitorFilter
          :title="'Фильтровать монитор'"
          :nested="false"
          :selectsArray="selectsArray"
          :activeTab="activeTab"
        />
        <MonitorWidgets :activeTab="activeTab" />
        <ManagerStat :activeTab="activeTab" :selectsArray="selectsArray" />
        <MyModal
          @create-modal="createSettingsMenu"
          :title="monitorBackgroundProps.title"
          :hasCancel="monitorBackgroundProps.hasCancel"
          :apply="monitorBackgroundProps.apply"
          :cancelText="monitorBackgroundProps.cancelText"
          :applyText="monitorBackgroundProps.applyText"
          :cancel="monitorBackgroundProps.cancel"
          :nested="monitorBackgroundProps.nested"
        >
          <BackgroundSettings
            @create-background-settings="(e) => createBackgroundSettings(e)"
          />
        </MyModal>
        <MyLoader @create-loader="createLoader" />
        <MyPopup
          :class="backgroundColor === true ? 'open' : ''"
          :type="'alert'"
          :title="'Ошибка!'"
          :description="'Попробуйте заново или обратитесь в техническую поддержку'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// styles
import "./MyMonitor.scss";

// vue
import { defineComponent } from "@vue/runtime-core";
import { InputHTMLAttributes, ref, Ref } from "vue";

// store
import { monitorStore } from "./monitorStore/monitorStore";

// components
import MyMenu from "../Platform/MyMenu/MyMenu.vue";
import MyHeader from "../Platform/MyHeader/MyHeader.vue";
import MyModal from "../Platform/MyModal/MyModal.vue";
import BackgroundSettings from "./Menus/BackgroundSettings/BackgroundSettings.vue";
import MyLoader from "../UI/MyLoader/MyLoader.vue";
import MonitorFilter from "./MonitorFilter/MonitorFilter.vue";
import MyPopup from "../UI/MyPopup/MyPopup.vue";
import MonitorWidgets from "./MonitorWidgets/MonitorWidgets.vue";
import ManagerStat from "./ManagerStat/ManagerStat.vue";

// utils
import ChangeBackgroundColor from "./Menus/BackgroundSettings/ChangeBackgroundColor/ChangeBackgroundColor";

// interfaces
import { iCreateModal } from "../Platform/MyModal/interfacesMyModal/interfacesMyModal";
import { iModal } from "../Platform/MyModal/interfacesMyModal/interfacesMyModal";

const changeBackgroundColor = new ChangeBackgroundColor();

export default defineComponent({
  components: {
    MyMenu,
    MyHeader,
    MyModal,
    BackgroundSettings,
    MyLoader,
    MyPopup,
    MonitorFilter,
    MonitorWidgets,
    ManagerStat,
  },
  setup() {
    let loader: Ref<HTMLElement>;
    let backgroundSettings: iModal;
    let inputColor: InputHTMLAttributes;
    let activeTab = ref("");

    const store = monitorStore();
    const {
      company,
      background,
      selectsArray,
      headerProps,
      monitorBackgroundProps,
    } = store;

    let backgroundColor = ref(background);

    monitorBackgroundProps.apply = (e) => {
      const saveChangesBackground = {
        inputColor,
        company,
        loader,
        backgroundSettings,
      };

      const saveChanges = changeBackgroundColor.saveChanges(
        saveChangesBackground,
        e
      );

      saveChanges.then((color) => {
        backgroundColor.value = color;
      });
    };

    const createLoader = (t: Ref<HTMLElement>) => {
      loader = t;
    };

    const createSettingsMenu = (props: iCreateModal) => {
      backgroundSettings = {
        modal: props.modal,
        wrapper: props.wrapper,
        isOverflowed: !monitorBackgroundProps.nested,
      };
    };

    const openSettingsMenu = (e: MouseEvent) => {
      const openProps = {
        company,
        loader,
        e,
        inputColor,
        backgroundSettings,
      };

      changeBackgroundColor.openMenu(openProps);
    };

    const createBackgroundSettings = (t: InputHTMLAttributes) => {
      inputColor = t;
    };

    const setActiveTab = (tab: string) => {
      activeTab.value = tab;
    };

    return {
      backgroundColor,
      openSettingsMenu,
      headerProps,
      company,
      createLoader,
      createSettingsMenu,
      monitorBackgroundProps,
      createBackgroundSettings,
      selectsArray,
      setActiveTab,
      activeTab,
    };
  },
});
</script>
