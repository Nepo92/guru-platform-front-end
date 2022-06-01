<template>
  <input
    :id="id"
    ref="checkbox"
    type="checkbox"
    class="checkbox"
    :name="name"
    :value="value || ''"
    @change="(e) => onChange(e)"
  />
  <label :for="id" class="checkbox__label" :class="addClass || ''">
    <span class="checkbox__fake" />
    <span class="checkbox__text remember__text">{{ text }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import "./MyCheckbox.scss";
import { onMounted, Ref, ref } from "vue";

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
    value: {
      type: String,
    },
    name: String,
    addClass: {
      type: String,
    },
  },
  emits: ["create-checkbox"],
  setup(props, { emit }) {
    let checkbox = ref({} as Ref<HTMLElement>);

    onMounted(() => {
      emit("create-checkbox", checkbox);
    });

    return {
      checkbox,
    };
  },
});
</script>
