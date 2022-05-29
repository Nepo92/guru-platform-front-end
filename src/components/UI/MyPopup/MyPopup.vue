<template>
  <div class="popup" ref="popup">
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
  props: {
    type: String,
    title: String,
    description: String,
  },
  components: { MyAlert },
  setup() {
    const popup = ref({} as Ref<HTMLElement>);

    return {
      popup,
    };
  },
};
</script>