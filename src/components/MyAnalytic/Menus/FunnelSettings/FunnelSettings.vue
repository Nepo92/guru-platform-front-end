<template>
  <div ref="funnelSettings" class="modal">
    <div ref="funnelSettingsWrapper" class="modal__wrapper">
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">Настройки воронки</h2>
        <span class="modal-header__close" @click="closeMenu" />
      </div>
      <form ref="colorFunnel">
        <ul class="modal__content modal-content__list custom-scroll funnel-colors">
          <li class="modal-content__item">
            <p class="modal-content__name funnel-colors__title">Цвет показателей</p>
          </li>
          <li class="modal-content__item funnel-colors__name">
            <p class="modal-content__name pl_0">Рейтинг</p>
          </li>
          <li class="modal-content__item">
            <ul class="funnel-colors__list">
              <li class="funnel-colors__item">
                <p class="modal-content__name">Зеленый</p>
                <input
                  type="text"
                  :value="ratingColors.green"
                  name="lineColors[0].green"
                  autocomplete="off"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Желтый</p>
                <input
                  name="lineColors[0].yellow"
                  :value="ratingColors.yellow"
                  type="text"
                  autocomplete="off"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Красный</p>
                <input
                  name="lineColors[0].red"
                  :value="ratingColors.red"
                  type="text"
                  autocomplete="off"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
            </ul>
          </li>
          <li class="modal-content__item funnel-colors__name">
            <p class="modal-content__name pl_0">Кпд</p>
          </li>
          <li class="modal-content__item">
            <ul class="funnel-colors__list">
              <li class="funnel-colors__item">
                <p class="modal-content__name">Зеленый</p>
                <input
                  name="lineColors[1].green"
                  :value="kpdColors.green"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Желтый</p>
                <input
                  name="lineColors[1].yellow"
                  :value="kpdColors.yellow"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Красный</p>
                <input
                  name="lineColors[1].red"
                  :value="kpdColors.red"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
            </ul>
          </li>
          <li class="modal-content__item funnel-colors__name">
            <p class="modal-content__name pl_0">% чистой выручки</p>
          </li>
          <li class="modal-content__item">
            <ul class="funnel-colors__list">
              <li class="funnel-colors__item">
                <p class="modal-content__name">Зеленый</p>
                <input
                  name="lineColors[2].green"
                  :value="proceedsColors.green"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Желтый</p>
                <input
                  name="lineColors[2].yellow"
                  :value="proceedsColors.yellow"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Красный</p>
                <input
                  name="lineColors[2].red"
                  :value="proceedsColors.red"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
            </ul>
          </li>
          <li class="modal-content__item funnel-colors__name">
            <p class="modal-content__name pl_0">% продаж с рассылки</p>
          </li>
          <li class="modal-content__item">
            <ul class="funnel-colors__list">
              <li class="funnel-colors__item">
                <p class="modal-content__name">Зеленый</p>
                <input
                  name="lineColors[3].green"
                  :value="mailingColors.green"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Желтый</p>
                <input
                  name="lineColors[3].yellow"
                  :value="mailingColors.yellow"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
              <li class="funnel-colors__item">
                <p class="modal-content__name">Красный</p>
                <input
                  name="lineColors[3].red"
                  :value="mailingColors.red"
                  autocomplete="off"
                  type="text"
                  class="modal-content__input funnel-colors__input"
                />
              </li>
            </ul>
          </li>
        </ul>
      </form>
      <div class="modal__footer modal-footer">
        <button @click="(e) => changeFunnelColor(e)" type="button" class="modal-footer__btn">
          Применить изменения
        </button>
      </div>
    </div>
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script>
import "@/assets/scss/modal.scss";
import "./FunnelSettings.scss";
import MenuUtils from "../../../../utils/MenuUtils/MenuUtils.js";
import { analyticAPI } from "@/api/api.js";
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import MyLoader from "../../../Platform/MyLoader/MyLoader.vue";
import { funnelSettingsStore } from "./FunnelStore/FunnelStore";

const menuUtils = new MenuUtils();
const loaderUtils = new LoaderUtils();
const store = funnelSettingsStore();

const { filter } = store;

export default {
  components: {
    MyLoader,
  },
  setup() {
    return {
      filter,
    };
  },
  created() {
    const [ratingColors, kpdColors, proceedsColors, mailingColors] = this.filter.lineColors;

    this.ratingColors = ratingColors;
    this.kpdColors = kpdColors;
    this.proceedsColors = proceedsColors;
    this.mailingColors = mailingColors;
  },
  mounted() {
    this.$emit("create-funnel-settings-menu", {
      menuFunnelSettings: {
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
