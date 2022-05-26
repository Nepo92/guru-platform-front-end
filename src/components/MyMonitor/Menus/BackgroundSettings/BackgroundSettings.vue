<template>
  <ul class="modal__content modal-content__list custom-scroll">
    <li class="modal-content__item">
      <p class="modal-content__name">Фон рабочего стола</p>
      <input
        ref="inputColor"
        type="color"
        class="modal-content__input modal-content__input--color"
      />
    </li>
  </ul>
</template>

<script lang="ts">
// vue
import { defineComponent } from "@vue/runtime-core";
import { onMounted, ref } from "vue";

export default defineComponent({
  emit: ["create-background-settings"],
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
