<template>
  <input
    @change="props.onChange"
    :id="props.id"
    type="checkbox"
    class="checkbox"
  />
  <label :for="props.id" class="checkbox__label">
    <span class="checkbox__fake" />
    <span class="checkbox__text remember__text">{{ props.text }}</span>
  </label>
</template>

<script lang="ts">
import "./MyCheckbox.scss";

export default {
  props: ["props"],
};
</script>
