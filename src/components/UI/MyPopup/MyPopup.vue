<template>
  <div class="popup" ref="popup">
    <div class="popup__wrapper">
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
import { ref } from "vue";

export default {
  props: {
    type: String,
    title: String,
    description: String,
  },
  components: { MyAlert },
  setup() {
    const popup = ref(null);

    return {
      popup,
    };
  },
};
</script>