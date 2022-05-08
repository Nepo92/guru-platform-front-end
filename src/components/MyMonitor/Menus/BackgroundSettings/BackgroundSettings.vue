<template>
  <div
    ref="backgroundSettings"
    class="modal"
  >
    <div
      ref="backgroundSettingsWrapper"
      class="modal__wrapper"
    >
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">
          Изменить фон
        </h2>
        <span
          class="modal-header__close"
          @click="closeMenu"
        />
      </div>
      <ul class="modal__content modal-content__list custom-scroll">
        <li class="modal-content__item">
          <p class="modal-content__name">
            Фон рабочего стола
          </p>
          <input
            ref="backgroundMonitor"
            type="color"
            class="modal-content__input modal-content__input--color"
          >
        </li>
      </ul>
      <div class="modal__footer modal-footer">
        <button
          type="button"
          class="modal-footer__btn"
          @click="(e) => saveBackground(e)"
        >
          Сохранить фон
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close-background-settings', 'save-background', 'create-settings-menu'],
  mounted() {
    this.$emit('create-settings-menu', {
      menuBackgroundSettings: {
        menu: this.$refs.backgroundSettings,
        wrapper: this.$refs.backgroundSettingsWrapper,
        backgroundInput: this.$refs.backgroundMonitor,
      },
    });
  },
  methods: {
    closeMenu() {
      this.$emit('close-background-settings');
    },
    saveBackground(e) {
      this.$emit('save-background', e);
    }
  },
}
</script>
