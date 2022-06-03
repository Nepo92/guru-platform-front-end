<template>
  <header
    class="header"
    :style="{ backgroundColor: props.color ? 'white' : 'transparent' }"
  >
    <div class="header__wrapper">
      <div class="header__title header-title">
        <h1 class="header-title__text">
          {{ props.title }}
        </h1>
        <span
          v-if="props.settings"
          class="header-title__settings"
          @click="(e) => openSettingsMenu(e)"
        />
      </div>
      <ul
        v-if="props.tabs"
        class="header__tabs"
        :class="props.border ? 'border' : ''"
      >
        <li
          v-for="(tab, index) of props.tabs"
          :key="index"
          ref="tabs"
          :data-name="tab.name"
          class="header-tabs__item"
          :class="[classActiveTab(tab), tab.nameClass || '']"
        >
          <a :href="tab.link" class="header-tabs__link">
            {{ tab.name }}
            <span
              v-if="tab.settings"
              class="header-tabs__settings"
              @click="(e) => openTabSettingsMenu(e)"
            ></span>
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
// vue
import { defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

// styles
import "./MyHeader.scss";

// interfaces
import { iHeaderTab } from "./interfacesHeader/interfacesHeader";

export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
  emits: ["open-settings-menu", "open-tab-settings-menu", "set-active-tab"],
  setup(props, { emit }) {
    const tabs = ref(null);
    const route = useRoute();
    let activeTab = ref("");

    onMounted(() => {
      if (tabs.value) {
        const tabsArray: Array<HTMLElement> = [...tabs.value];

        activeTab.value = <string>(
          tabsArray
            .find((el) => el.classList.contains("active"))
            ?.getAttribute("data-name")
        );

        if (activeTab.value) {
          emit(
            "set-active-tab",
            props.props?.activeTab?.value || activeTab.value
          );
        }
      }
    });

    const classActiveTab = (tab: iHeaderTab) => {
      const { path } = route;

      const isActive = path === tab.link || props.props.activeTab === tab.name;

      return isActive ? "active" : "";
    };

    const openSettingsMenu = (e: MouseEvent) => {
      emit("open-settings-menu", e);
    };

    const openTabSettingsMenu = (e: MouseEvent) => {
      emit("open-tab-settings-menu", e);
    };

    return {
      classActiveTab,
      openSettingsMenu,
      openTabSettingsMenu,
      route,
      tabs,
    };
  },
});
</script>
