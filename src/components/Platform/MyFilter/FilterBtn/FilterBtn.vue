<template>
  <div class="filter__open" :class="filter.canClear ? 'active' : ''" @click="openFilter">
    Фильтр
  </div>
</template>

<script>
import "./FilterBtn.scss";

export default {
  data() {
    return {
      //eslint-disable-next-line
      filter: filter || null,
    };
  },
  methods: {
    openFilter(e) {
      this.$emit("open-filter", e);
    },
  },
};
</script>
