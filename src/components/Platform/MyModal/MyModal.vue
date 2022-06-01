<template>
  <div ref="modal" class="modal">
    <div
      ref="wrapper"
      class="modal__wrapper"
      :class="size === 'large' ? 'large' : ''"
    >
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">{{ title }}</h2>
        <span class="modal-header__close" @click="(e) => closeMenu(e)" />
      </div>
      <ul class="modal__content modal-content__list custom-scroll">
        <slot
          :activeTab="activeTab"
          :selectsArray="selectsArray"
          :slotData="slotData"
        ></slot>
      </ul>
      <div class="modal__footer modal-footer">
        <button
          v-if="hasApply"
          type="button"
          class="modal-footer__btn"
          @click="() => apply()"
        >
          {{ applyText }}
        </button>
        <button
          v-if="hasCancel"
          type="button"
          class="modal-footer__btn"
          @click="(e) => cancel(e)"
        >
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref, Ref, onMounted } from "vue";
import ModalUtils from "./ModalUtils/ModalUtils";
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
      required: true,
    },
    hasCancel: {
      type: Boolean,
      required: true,
    },
    nested: {
      type: Boolean,
      required: true,
    },
    hasApply: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    modalSideEffect: {
      type: Function,
    },
    hasSideEffect: {
      type: Boolean,
      required: false,
    },
    selectsArray: Array,
    activeTab: String,
    slotData: Object,
  },
  emits: ["create-modal"],
  setup(props, { emit }) {
    const modal = ref({} as Ref<HTMLElement>);
    const wrapper = ref({} as Ref<HTMLElement>);

    const closeMenu = (e: MouseEvent) => {
      const closeModalProps = {
        modal,
        wrapper,
        isOverflowed: props.nested,
      };

      modalUtils.closeMenu(closeModalProps);

      if (props.hasSideEffect) {
        if (props.modalSideEffect) {
          props.modalSideEffect();
        }
      }
    };

    onMounted(() => {
      emit("create-modal", {
        modal: modal,
        wrapper: wrapper,
        slotData: props.slotData,
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