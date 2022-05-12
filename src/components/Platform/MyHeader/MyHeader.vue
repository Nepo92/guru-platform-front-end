
<template>
  <header class="header" :style="{ backgroundColor: props.color ? 'white' : 'transparent' }">
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
      <ul v-if="props.tabs" class="header__tabs" :class="props.border ? 'border' : ''">
        <li
          v-for="(tab, index) of props.tabs"
          :key="index"
          class="header-tabs__item"
          :class="[classActiveTab(tab), tab.nameClass || '']"
        >
          <a :href="tab.link" class="header-tabs__link">
            {{ tab.name }}
            <span
              @click="(e) => openTabSettingsMenu(e)"
              v-if="tab.settings"
              class="header-tabs__settings"
            ></span>
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import "./MyHeader.scss";

export default {
  props: ["props"],
  emits: ["open-settings-menu"],
  methods: {
    classActiveTab(tab) {
      const { path } = this.$route;

      const isActive = path === tab.link;

      return isActive ? "active" : "";
    },
    openSettingsMenu(e) {
      this.$emit("open-settings-menu", e);
    },
    openTabSettingsMenu(e) {
      this.$emit("open-tab-settings-menu", e);
    },
  },
};
</script>
