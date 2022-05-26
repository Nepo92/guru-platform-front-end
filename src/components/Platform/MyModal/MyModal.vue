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
          @click="(e: MouseEvent) => apply(e)"
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
import ModalUtils from "./modalUtils/modalUtils";

// styles
import "./MyModal.scss";

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
    cancelText: String,
    applyText: String,
    apply: {
      type: Function,
      required: true,
    },
    hasCancel: Boolean,
    nested: Boolean,
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