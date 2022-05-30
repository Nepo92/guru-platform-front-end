<template>
  <div ref="loader" class="loader">
    <div class="loader__inner">
      <label class="loader__label" />
      <label class="loader__label" />
      <label class="loader__label" />
      <label class="loader__label" />
      <label class="loader__label" />
    </div>
  </div>
</template>

<script lang="ts">
// styles
import "./MyLoader.scss";

// vue
import { defineComponent, ref, onMounted, Ref } from "vue";

export default defineComponent({
  emits: ["create-loader"],
  setup(props, { emit }) {
    const loader = ref({} as Ref<HTMLElement>);

    onMounted(() => {
      emit("create-loader", loader);
    });

    return {
      loader,
    };
  },
});
</script>
