<template>
  <div ref="funnelTrafficSettings" class="modal">
    <div ref="funnelTrafficSettingsWrapper" class="modal__wrapper">
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">Настройки воронки</h2>
        <span class="modal-header__close" @click="closeMenu" />
      </div>
      <form ref="filterSettings">
        <ul class="modal__content modal-content__list custom-scroll">
          <li class="modal-content__item">
            <p class="modal-content__name">Тип</p>
            <div class="mt_5">
              <MySelect
                :props="{ ...selectTypeProps, ...props }"
                @change-select-value="changeTypeFunnel"
              />
            </div>
          </li>
          <li class="modal-content__item mt_25">
            <ul>
              <FunnelColorSettings />
            </ul>
          </li>
          <li class="modal-content__item mt_25">
            <p class="modal-content__name funnel-colors__title">Этапы воронки</p>
          </li>
          <li v-for="(collapse, index) of collapseItems" :key="index">
            <ul class="mt_25">
              <li @click.self="(e) => openCollapse(e)" class="modal-content__item collapse">
                <p @click.self="(e) => closeCollapse(e)" class="modal-content__name collapse-icon">
                  {{ collapse.name }}
                </p>
                <ul class="collapse__body">
                  <li
                    class="collapse__item"
                    v-for="(checkbox, count) of collapse.items"
                    :key="count"
                  >
                    <input
                      ref="visibleCheck"
                      @change="changeCheckbox"
                      :id="'collapse-' + `${count}-${checkbox.name}`"
                      :name="checkbox.nameEng"
                      type="checkbox"
                      :checked="checkbox.value"
                      :value="checkbox.value"
                      class="checkbox"
                    />
                    <label :for="'collapse-' + `${count}-${checkbox.name}`" class="checkbox__label">
                      <span class="checkbox__fake"></span>
                      <span class="checkbox__text">{{ checkbox.name }}</span>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </form>
      <div class="modal__footer modal-footer">
        <button @click="(e) => applyFilterSettings(e)" type="button" class="modal-footer__btn">
          Применить изменения
        </button>
      </div>
    </div>
    <MyLoader @create-loader="createLoader"></MyLoader>
  </div>
</template>

<script>
// style
import "./FunnelTrafficSettings.scss";
import "@/assets/scss/checkbox.scss";

// store
import { funnelTrafficStore } from "./FunnelTrafficStore/FunnelTrafficStore.js";
import { storeToRefs, mapActions } from "pinia";

// api
import { filterAPI } from "@/api/api";

// utils
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

// components
import MySelect from "@/components/Platform/MySelect/MySelect.vue";
import FunnelColorSettings from "../FunnelColorSettings/FunnelColorSettings.vue";
import MyLoader from "@/components/Platform/MyLoader/MyLoader.vue";

const store = funnelTrafficStore();

const { filterProps, menu, getSelectProps, getCollapseProps } = storeToRefs(store);
const { changeType, changeCheckboxValue } = mapActions(funnelTrafficStore, [
  "changeType",
  "changeCheckboxValue",
]);

const { filter } = filterProps;
const loaderUtils = new LoaderUtils();
const menuUtils = new MenuUtils();

export default {
  components: {
    MySelect,
    FunnelColorSettings,
    MyLoader,
  },
  props: ["props"],
  setup() {
    return {
      filter,
      menu,
      getSelectProps,
      getCollapseProps,
      changeType,
      changeCheckboxValue,
    };
  },
  created() {
    this.selectTypeProps = this.getSelectProps;
    this.collapseItems = this.getCollapseProps;
  },
  mounted() {
    this.$emit("create-tab-settings-menu", {
      menuSettings: {
        menu: this.$refs.funnelTrafficSettings,
        wrapper: this.$refs.funnelTrafficSettingsWrapper,
      },
    });
  },
  methods: {
    changeTypeFunnel(props) {
      this.changeType(props);

      this.selectTypeProps = this.getSelectProps;
    },
    openCollapse(e) {
      const t = e.target;

      t.classList.toggle("open");
    },
    closeCollapse(e) {
      const t = e.target;

      t.parentNode.classList.toggle("open");
    },
    applyFilterSettings(e) {
      const { filterSettings, visibleCheck } = this.$refs;
      const { path } = this.$route;

      const formData = new FormData(filterSettings);

      visibleCheck.forEach((item) => {
        formData.set(item.getAttribute("name"), item.getAttribute("value"));
      });

      for (let item of formData) {
        console.log(item);
      }

      const applySettings = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      }, 400);

      const t = e.target;

      t.classList.add("disabled");

      applySettings.then(
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(this.loader);

          t.classList.remove("disabled");

          location.reload();
        },
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(this.loader);

          t.classList.remove("disabled");
        }
      );
    },
    createLoader(props) {
      this.loader = props.loader;
    },
    changeCheckbox(e) {
      const t = e.target;

      const checkboxProps = {
        name: t.getAttribute("name"),
        value: t.checked,
      };

      this.changeCheckboxValue(checkboxProps);

      this.collapseItems = this.getCollapseProps;

      console.log(this.collapseItems);
    },
  },
};
</script>
