<template>
  <h3 class="popup__title">
    {{ title }}
  </h3>
  <p class="popup__description">{{ description }}</p>
  <div v-if="popup" class="popup__nav alert">
    <button type="button" @click="closePopup" class="popup__btn">Ок</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    title: String,
    description: String,
    popup: Object,
  },
  setup(props) {
    const closePopup = (e: MouseEvent) => {
      props.popup?.value.classList.remove("open");
    };

    return {
      closePopup,
    };
  },
});
</script>