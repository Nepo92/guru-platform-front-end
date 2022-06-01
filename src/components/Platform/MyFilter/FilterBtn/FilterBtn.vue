<template>
  <div
    class="filter__open"
    :class="filter.canClear ? 'active' : ''"
    @click="(e: MouseEvent) => openFilter(e)"
  >
    Фильтр
  </div>
</template>

<script lang="ts">
import "./FilterBtn.scss";
import { filterStore } from "../filterStore/filterStore";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  emits: ["open-filter"],
  setup(props, { emit }) {
    const store = filterStore();

    const { filter } = store;

    const openFilter = (e: MouseEvent) => {
      emit("open-filter", e);
    };

    return {
      filter,
      openFilter,
    };
  },
});
</script>
