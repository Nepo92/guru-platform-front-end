<template>
  <div class="analytic-content__filter analytic-filter">
    <FilterBtn @open-filter="openFilter" />
    <form ref="filterDateForm" class="analytic-filter__form">
      <ul class="analytic-filter__list">
        <li class="analytic-filter__item calendar-icon">
          <input
            :ref="setDatepickerRef"
            class="datepicker-here-month analytic-filter__input"
            type="text"
            :value="startDate"
            placeholder="Укажите дату от"
            name="startDate"
          />
        </li>
        <li class="analytic-filter__item calendar-icon">
          <input
            :ref="setDatepickerRef"
            class="datepicker-here-month analytic-filter__input"
            type="text"
            :value="endDate"
            placeholder="Укажите дату до"
            name="endDate"
          />
        </li>
        <li class="analytic-filter__item angle-icon">
          <MySelect
            :props="{
              ...filterProps.filterPeriod.select,
              ...props.selectsProps,
            }"
          />
        </li>
      </ul>
      <MyFilter
        :props="{
          ...filterProps,
          ...props,
          changeSelectValue,
          changeDealType,
          getCurrentFunnels,
        }"
        @create-filter-modal="createFilterModal"
        @change-filter-deal-type="changeFilterDealType"
        @change-filter-select="changeFilterSelect"
      />
      <MyLoader @create-loader="createLoader" />
    </form>
  </div>
</template>

<script>
// styles
import "./AnalyticFilter.scss";
import "air-datepicker/air-datepicker.css";

// components
import MyLoader from "../../Platform/MyLoader/MyLoader.vue";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";
import MyFilter from "@/components/Platform/MyFilter/MyFilter.vue";
import MySelect from "../../Platform/MySelect/MySelect.vue";

// utils
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import DateUtils from "@/utils/DateUtils/DateUtils.js";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

//plugins
import AirDatepicker from "air-datepicker";

// api
import { analyticAPI } from "@/api/api.js";

// store
import { analyticFilterStore } from "./analyticFilterStore/analyticFilterStore";
import { mapActions, storeToRefs } from "pinia";

const loaderUtils = new LoaderUtils();
const dateUtils = new DateUtils();
const menuUtils = new MenuUtils();
const store = analyticFilterStore();

export default {
  components: {
    MyLoader,
    FilterBtn,
    MyFilter,
    MySelect,
  },
  props: ["props"],
  async setup() {
    const { filterProps, initialFunnels, getCurrentFunnels, getFilterPropsAfterChange } =
      storeToRefs(store);
    const { changeDealType, changeSelectValue } = mapActions(analyticFilterStore, [
      "changeDealType",
      "changeSelectValue",
    ]);

    await store.fetchFunnels();

    return {
      filterProps,
      initialFunnels,
      changeDealType,
      getCurrentFunnels,
      changeSelectValue,
      getFilterPropsAfterChange,
    };
  },
  created() {
    const startDate = dateUtils.toTimestamp(this.filterProps.filter.startDate);
    const endDate = dateUtils.toTimestamp(this.filterProps.filter.endDate);

    this.startDate = dateUtils.formatDDMMYYYY(startDate);
    this.endDate = dateUtils.formatDDMMYYYY(endDate);
  },
  mounted() {
    this.filterProps.filterPeriod.datepickerMonth.forEach((item) => {
      new AirDatepicker(item, {
        view: "months",
      });
    });

    document.body.addEventListener("click", (e) => {
      const t = e.target;

      const applyFilterDate = this.applyFilterDate.bind(this, t);

      const isCalendar = t.classList.contains("-day-");

      if (isCalendar) {
        setTimeout(applyFilterDate, 100);
      }
    });
  },
  methods: {
    createLoader(props) {
      this.loader = props.loader;
    },
    setDatepickerRef(el) {
      this.filterProps.filterPeriod.datepickerMonth.push(el);
    },
    applyFilterDate(t) {
      const { filterDateForm } = this.$refs;

      const formData = new FormData(filterDateForm);

      formData.set(
        "startDate",
        dateUtils.dateToServer(this.filterProps.filterPeriod.datepickerMonth[0].value)
      );
      formData.set(
        "endDate",
        dateUtils.dateToServer(this.filterProps.filterPeriod.datepickerMonth[1].value)
      );

      const applyFilterDate = analyticAPI.changeAnalyticDate(formData);

      const loader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      }, 400);

      t.classList.add("disabled");

      applyFilterDate.then(
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
    changeFilterDealType() {
      this.filterProps = this.getCurrentFunnels;
    },
    changeFilterSelect() {
      this.filterProps = this.getFilterPropsAfterChange;
    },
  },
};
</script>
