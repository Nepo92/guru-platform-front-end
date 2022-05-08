<template>
  <router-view :props="props" />
</template>

<script>
import "./assets/scss/settings.scss";
import "./assets/scss/custom-scroll.scss";

export default {
  name: 'App',
  data() {
    return {
      props: this.$refs.app,
    };
  },
}
</script>

<style lang="scss">
</style>
