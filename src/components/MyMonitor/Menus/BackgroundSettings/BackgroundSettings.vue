<template>
  <li class="modal-content__item">
    <p class="modal-content__name">Фон рабочего стола</p>
    <input
      ref="inputColor"
      type="color"
      class="modal-content__input modal-content__input--color"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { onMounted, ref } from "vue";

export default defineComponent({
  emits: ["create-background-settings"],
  setup(props, { emit }) {
    const inputColor = ref(null);

    onMounted(() => {
      emit("create-background-settings", inputColor.value);
    });

    return {
      inputColor,
    };
  },
});
</script>
