<template>
  <input type="text" :name="nameEng" @click="(e) => inputClick(e)" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    props: Object,
  },
  emits: ["open-communities-menu"],
  setup(props, { emit }) {
    // const nameEng = props.nameEng.find((el) => el.tabs.includes(path))?.name;

    const nameEng = "";

    const inputClick = (e: MouseEvent) => {
      // if (props.name === "Аудитории") {
      // emit("open-communities-menu", e);
      // }
    };

    return {
      nameEng,
      inputClick,
    };
  },
});
</script>
