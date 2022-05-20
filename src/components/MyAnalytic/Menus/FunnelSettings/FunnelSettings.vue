<template>
  <div ref="funnelSettings" class="modal">
    <div ref="funnelSettingsWrapper" class="modal__wrapper">
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">
          Настройки воронки
        </h2>
        <span class="modal-header__close" @click="closeMenu" />
      </div>
      <form ref="colorFunnel">
        <ul class="modal__content modal-content__list custom-scroll funnel-colors">
          <FunnelColorSettings />
        </ul>
      </form>
      <div class="modal__footer modal-footer">
        <button 
          class="modal-footer__btn"
          type="button" 
          @click="(e) => changeFunnelColor(e)" 
        >
          Применить изменения
        </button>
      </div>
    </div>
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script>
// styles
import "@/assets/scss/modal.scss";

// api
import { analyticAPI } from "@/api/api.js";

// utils
import MenuUtils from "../../../../utils/MenuUtils/MenuUtils.js";
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";

// components
import MyLoader from "../../../Platform/MyLoader/MyLoader.vue";
import FunnelColorSettings from "../FunnelColorSettings/FunnelColorSettings.vue";

const menuUtils = new MenuUtils();
const loaderUtils = new LoaderUtils();

export default {
  components: {
    MyLoader,
    FunnelColorSettings,
  },
  emits: ['create-tab-settings-menu'],
  mounted() {
    this.$emit("create-tab-settings-menu", {
      menuSettings: {
        menu: this.$refs.funnelSettings,
        wrapper: this.$refs.funnelSettingsWrapper,
      },
    });
  },
  methods: {
    createLoader(props) {
      this.loader = props.loader;
    },
    closeMenu() {
      const closeMenuProps = {
        menu: this.$refs.funnelSettings,
        wrapper: this.$refs.funnelSettingsWrapper,
        isOverflowed: false,
      };

      menuUtils.closeMenu(closeMenuProps);
    },
    changeFunnelColor(e) {
      const t = e.target;
      const form = this.$refs.colorFunnel;

      const formData = new FormData(form);
      const change = analyticAPI.changeColors(formData);

      const loader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      });

      t.classList.add("disabled");

      change.then(
        () => {
          clearTimeout(loader);
          t.classList.remove("disabled");

          location.reload();
        },
        () => {
          clearTimeout(loader);
          t.classList.remove("disabled");
        }
      );
    },
  },
};
</script>
