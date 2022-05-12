<template>
  <div ref="filterModal" class="filter-modal">
    <div ref="filterModalWrapper" class="filter-modal__wrapper">
      <div class="filter-modal__head">
        <h2 class="filter-modal__title">
          {{ props.title }}
        </h2>
        <span class="modal-header__close" @click="closeFilter" />
      </div>
      <div class="filter-modal__content custom-scroll">
        <form
          ref="filterForm"
          class="filter-modal__form"
          action="#"
          th:action="@{/monitor/}"
          th:method="post"
        >
          <ul class="filter-modal__column">
            <li class="filter-modal__item width_100">
              <h3 class="filter-modal__subtitle">Параметры</h3>
            </li>
            <li v-for="(item, index) of filterItems" :key="index" class="filter-modal__item">
              <p class="filter-modal__name">
                {{ item.name }}
              </p>
              <div class="filter-modal__select-wrapper">
                <MySelect
                  :ref="(el) => setRef(el, item)"
                  :props="setProps(item)"
                  @change="changeDealType"
                />
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div class="filter-modal__footer">
        <div class="filter-modal__apply" @click="(e) => applyFilter(e)">Применить фильтры</div>
        <button
          v-if="props.filter?.canClear"
          type="button"
          class="filter-modal__reset"
          @click="(e) => clearFilter(e)"
        >
          <span class="filter-modal__reset--icon" />
          Сбросить фильтры
        </button>
      </div>
    </div>
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script>
import "./MyFilter.scss";
import { filterAPI } from "@/api/api.js";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import MyLoader from "../MyLoader/MyLoader.vue";
import "@/assets/scss/grid.scss";

import MySelect from "../MySelect/MySelect.vue";

const menuUtils = new MenuUtils();
const loader = new LoaderUtils();

export default {
  components: {
    MyLoader,
    MySelect,
  },
  props: ["props"],
  emits: ["create-filter-modal"],
  mounted() {
    this.$emit("create-filter-modal", {
      modal: this.$refs.filterModal,
      wrapper: this.$refs.filterModalWrapper,
    });
  },
  methods: {
    applyFilter(e) {
      const t = e.target;
      const { path } = this.$route;

      const filterForm = this.$refs.filterForm;
      const formData = new FormData(filterForm);

      const apply = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loader.showLoader(this.loader);
      }, 400);

      t.classList.add("disabled");

      apply.then(
        () => {
          clearTimeout(showLoader);
          t.classList.remove("disabled");

          location.reload();
        },
        () => {
          clearTimeout(showLoader);
          t.classList.remove("disabled");
        }
      );
    },
    clearFilter(e) {
      const t = e.target;

      const { path } = this.$route;
      const clear = filterAPI.clearFilter(path);

      const showLoader = setTimeout(() => {
        loader.showLoader(this.loader);
      }, 400);

      t.classList.add("disabled");

      clear.then(
        () => {
          clearTimeout(showLoader);
          t.classList.remove("disabled");

          location.reload();
        },
        () => {
          clearTimeout(showLoader);
          t.classList.remove("disabled");
        }
      );
    },
    closeFilter() {
      const closeFilterProps = {
        menu: this.$refs.filterModal,
        wrapper: this.$refs.filterModalWrapper,
        isOverflowed: false,
      };

      menuUtils.closeMenu(closeFilterProps);
    },
    createLoader(props) {
      const { loader } = props;
      this.loader = loader;
    },
  },
};
</script>
