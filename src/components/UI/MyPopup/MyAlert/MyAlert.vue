<template>
  <h3 class="popup__title">
    {{ title }}
  </h3>
  <p class="popup__description">{{ description }}</p>
  <div v-if="popup" class="popup__nav alert">
    <button type="button" class="popup__btn" @click="closePopup">Ок</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    popup: {
      type: Object,
      required: true,
    },
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