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
import { ref } from "vue";

// interfaces
import { iMyAlert } from "./interfacesMyAlert/interfacesMyAlert";

export default {
  props: {
    title: String,
    description: String,
    popup: ref,
  },
  setup(props: any) {
    const closePopup = (e: MouseEvent) => {
      (props.popup as Element).classList.remove("open");
    };

    return {
      closePopup,
    };
  },
};
</script>