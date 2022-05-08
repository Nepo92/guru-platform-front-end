<template>
  <header class="header">
    <div class="header__title header-title">
      <h1 class="header-title__text">
        {{ props.title }}
      </h1>
      <span v-if="props.settings" class="header-title__settings" @click="(e) => openSettingsMenu(e)" />
    </div>
    <ul v-if="props.tabs" class="header__tabs">
      <li v-for="(tab, index) of props.tabs" :key="index" class="header-tabs__item" :class="classActiveTab(tab)">
        <a :href="tab.link">{{ tab.name }}</a>
      </li>
    </ul>
  </header>
</template>

<script>
import './MyHeader.scss';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    color: Boolean,
    settings: Boolean,
  },
  emits: ['open-settings-menu'],
  methods: {
    classActiveTab(tab) {
      const { path } = this.$route;

      const isActive = path === tab.link;

      return isActive ? 'active' : '';
    },
    openSettingsMenu(e) {
      this.$emit('open-settings-menu', e);
    },
  },
}
</script>
