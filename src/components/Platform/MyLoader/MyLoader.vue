<template>
  <div
    ref="loader"
    class="loader"
  >
    <div class="loader__inner">
      <label class="loader__label" />
      <label class="loader__label" />
      <label class="loader__label" />
      <label class="loader__label" />
      <label class="loader__label" />
    </div>
  </div>
</template>

<script>
import "./MyLoader.scss";

export default {
  emits: ['create-loader'],
  mounted() {
    this.$emit('create-loader', {
      loader: this.$refs.loader,
    });
  }
}
</script>
