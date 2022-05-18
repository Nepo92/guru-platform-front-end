<template>
  <div class="filter monitor__filter">
    <FilterBtn @open-filter="openFilter" />
    <ul class="monitor-filter__list">
      <li class="monitor-filter__item period">
        <ul class="period__list">
          <li
            v-for="(item, index) of period"
            :key="index"
            class="monitor-filter__item period__item"
            :class="filter.period === item.value ? 'active' : ''"
            @click="(e) => changePeriod(e, item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </li>
    </ul>
    <MyFilter
      :props="{
        ...filterProps,
        ...props,
        changeSelectValue,
      }"
      @create-filter-modal="createFilterModal"
      @change-filter-select="changeFilterSelect"
    />
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script>
import "./MonitorFilter.scss";
import "../../Platform/MyFilter/MyFilter.scss";
import "@/assets/scss/modal.scss";
import MyFilter from "../../Platform/MyFilter/MyFilter.vue";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";
import { filterAPI } from "@/api/api.js";
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import MyLoader from "@/components/Platform/MyLoader/MyLoader.vue";

const menuUtils = new MenuUtils();
const loaderUtils = new LoaderUtils();

import { monitorFilter } from "./MonitorFilterStore/MonitorFilterStore";
import { storeToRefs, mapActions } from "pinia";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";

const store = monitorFilter();

const {
  filter,
  period,
  monitorDeals,
  filterProps,
  getSortedFilterItems,
  getFilterPropsAfterChange,
} = storeToRefs(store);
const { setPage, changeSelectValue } = mapActions(monitorFilter, ["setPage", "changeSelectValue"]);

export default {
  components: {
    MyFilter,
    MyLoader,
    FilterBtn,
  },
  props: ["props"],
  setup() {
    return {
      filter,
      period,
      monitorDeals,
      filterProps,
      setPage,
      getSortedFilterItems,
      changeSelectValue,
      getFilterPropsAfterChange,
    };
  },
  created() {
    const { path } = this.$route;

    this.setPage(path);

    this.filterProps.columns = this.getSortedFilterItems;
  },
  methods: {
    openFilter() {
      const openFilterProps = {
        menu: this.filterModal,
        wrapper: this.filterModalWrapper,
        isOverflowed: true,
      };

      menuUtils.openMenu(openFilterProps);
    },
    createFilterModal(props) {
      const { modal, wrapper } = props;
      this.filterModal = modal;
      this.filterModalWrapper = wrapper;
    },
    changePeriod(e, item) {
      const t = e.target;

      const { path } = this.$route;

      const formData = new FormData();
      formData.set("period", item.value);

      const apply = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
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
    changeDealsUtensils(e, item) {
      const t = e.target;
      const { path } = this.$route;

      const formData = new FormData();
      formData.set("showType", item.value);

      const apply = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
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
    createLoader(props) {
      const { loader } = props;

      this.loader = loader;
    },
    changeFilterSelect() {
      this.filterProps = this.getFilterPropsAfterChange;
    },
  },
};
</script>
