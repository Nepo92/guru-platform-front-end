<template>
  <input
    ref="inputRef"
    :type="inputItem.hidden ? 'hidden' : 'text'"
    placeholder="Аудитории"
    class="input"
    :value="inputItem.value"
    :name="nameEng"
    :title="inputItem.value.toString()"
    @click="(e) => inputClick(e)"
  />
</template>

<script lang="ts">
import "./MyInput.scss";
import { defineComponent } from "@vue/runtime-core";
import { Ref, ref } from "vue";
import { iNameFilterItem } from "../MySelect/interfacesMySelect/interfacesMySelect";

export default defineComponent({
  props: {
    inputItem: {
      type: Object,
      required: true,
    },
    activeTab: {
      type: Object,
      required: true,
    },
  },
  emits: ["input-side-effect"],
  setup(props, { emit }) {
    let inputRef = ref({} as Ref<HTMLElement>);

    const inputClick = (e: MouseEvent) => {
      if (props.inputItem.hasSideEffect) {
        emit("input-side-effect", inputRef);
      }
    };

    const nameEng = (props.inputItem.nameEng as Array<iNameFilterItem>).find(
      (el) => el.tabs.includes(props.activeTab.value)
    )?.name;

    return {
      inputClick,
      inputRef,
      nameEng,
    };
  },
});
</script>
