<template>
  <div class="validate-error">
    {{ props.validateErrorMessage }}
  </div>
</template>

<script lang="ts">
import "./ValidateError.scss";

export default {
  props: ["props"],
};
</script>