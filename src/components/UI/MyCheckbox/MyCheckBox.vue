<template>
  <input
    :id="id"
    type="checkbox"
    class="checkbox"
    @change="(e) => onChange(e)"
  />
  <label :for="id" class="checkbox__label">
    <span class="checkbox__fake" />
    <span class="checkbox__text remember__text">{{ text }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import "./MyCheckbox.scss";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  setup(props) {},
});
</script>
