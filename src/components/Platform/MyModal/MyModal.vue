<template>
  <div ref="modal" class="modal">
    <div ref="wrapper" class="modal__wrapper">
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">{{ title }}</h2>
        <span
          class="modal-header__close"
          @click="(e: MouseEvent) => closeMenu(e)"
        />
      </div>
      <slot></slot>
      <div class="modal__footer modal-footer">
        <button
          type="button"
          class="modal-footer__btn"
          @click="(e: MouseEvent) => apply ? apply(e) : settingsOject?.apply(e)"
        >
          {{ applyText }}
        </button>
        <button
          type="button"
          v-if="hasCancel"
          class="modal-footer__btn"
          @click="(e: MouseEvent) => cancel(e)"
        >
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "@vue/runtime-core";
import { ref, onMounted, Ref } from "vue";

// utils
import ModalUtils from "./ModalUtils/ModalUtils";

// styles
import "./MyModal.scss";
import "@/assets/scss/grid.scss";

const modalUtils = new ModalUtils();

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    cancel: {
      type: Function,
      required: true,
    },
    cancelText: {
      type: String,
      required: true,
    },
    applyText: {
      type: String,
      required: true,
    },
    apply: {
      type: Function,
    },
    hasCancel: {
      type: Boolean,
      required: true,
    },
    nested: {
      type: Boolean,
      required: true,
    },
    settingsOject: Object,
  },
  setup(props, { emit }) {
    const modal = ref({} as Ref<HTMLElement>);
    const wrapper = ref({} as Ref<HTMLElement>);

    const closeMenu = (e: MouseEvent) => {
      const closeModalProps = {
        modal: modal,
        wrapper: wrapper,
        isOverflowed: props.nested,
      };

      modalUtils.closeMenu(closeModalProps);
    };

    onMounted(() => {
      emit("create-modal", {
        modal: modal,
        wrapper: wrapper,
      });
    });

    return {
      modal,
      wrapper,
      closeMenu,
    };
  },
});
</script>