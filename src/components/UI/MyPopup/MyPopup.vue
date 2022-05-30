<template>
  <div ref="popup" class="popup">
    <div v-if="popup.value" class="popup__wrapper">
      <MyAlert
        v-if="type === 'alert'"
        :title="title"
        :description="description"
        :popup="popup"
      />
    </div>
  </div>
</template>

<script lang="ts">
// styles
import "./MyPopup.scss";

// components
import MyAlert from "./MyAlert/MyAlert.vue";

// vue
import { ref, Ref } from "vue";

export default {
  components: { MyAlert },
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  setup() {
    const popup = ref({} as Ref<HTMLElement>);

    return {
      popup,
    };
  },
};
</script>