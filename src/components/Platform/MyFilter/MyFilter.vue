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
          <ul v-for="(item, index) of props.columns" :key="index" class="filter-modal__column">
            <li class="filter-modal__item width_100">
              <h3 class="filter-modal__subtitle">
                {{ item.name }}
              </h3>
            </li>
            <li v-for="(elem, count) of item.items" :key="count" class="filter-modal__item">
              <p class="filter-modal__name">
                {{ elem.name }}
              </p>
              <div class="filter-modal__select-wrapper">
                <MySelect
                  v-if="elem.type === 'select'"
                  :props="{
                    ...elem,
                    ...props.selectsProps,
                  }"
                  @change-select-value="changeFilterSelectValue"
                  @change-deal-type="changeDealType"
                  @change-platform-filter="changePlatform"
                  @change-source-traffic-filter="changeSource"
                />
                <MyInput
                  v-else-if="elem.type === 'input'"
                  :props="{ ...elem }"
                  @open-communities-menu="openCommunities"
                />
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div class="filter-modal__footer">
        <div class="filter-modal__apply" @click="(e) => applyFilter(e)">
          Применить фильтры
        </div>
        <button
          v-if="props.filter.canClear"
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
// api
import { filterAPI } from "@/api/api.js";

// components
import MyLoader from "../MyLoader/MyLoader.vue";
import MySelect from "../MySelect/MySelect.vue";
import MyInput from "../../Platform/MyInput/MyInput.vue";

// utils
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";

// styles
import "./MyFilter.scss";
import "@/assets/scss/grid.scss";

const menuUtils = new MenuUtils();
const loader = new LoaderUtils();

export default {
  components: {
    MyLoader,
    MySelect,
    MyInput,
  },
  props: ['props'],
  emits: [
    'create-filter-modal', 
    'change-filter-select', 
    'change-filter-deal-type', 
    'change-platform-filter', 
    'open-communities-menu',
    'change-source-traffic-filter',
  ],
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
    changeFilterSelectValue(props) {
      this.props.changeSelectValue(props);

      this.$emit("change-filter-select");
    },
    changeDealType(props) {
      this.props.changeDealType(props.selectedOption.value);
      this.$emit("change-filter-deal-type");
    },
    async changePlatform(props) {
      this.props.changePlatform(props.selectedOption.value);
      this.$emit("change-platform-filter", props);
    },
    openCommunities(props) {
      this.$emit("open-communities-menu", props);
    },
    changeSource(props) {
      this.props.changeSourceTrafficValue(props.selectedOption.value);
      this.$emit("change-source-traffic-filter", props);
    }
  },
};
</script>
