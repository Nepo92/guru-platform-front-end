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
          <select class="analytic-filter__select" name="idSort" @change="changeFilterDate">
            <option
              v-for="(item, index) of filterOptions"
              :key="index"
              :selected="+filter.idSort === +item.value"
              :value="item.value"
            >
              {{ item.name }}
            </option>
          </select>
        </li>
      </ul>
      <MyFilter :props="filterProps" @create-filter-modal="createFilterModal" />
      <MyLoader @create-loader="createLoader" />
    </form>
  </div>
</template>

<script>
import "./AnalyticFilter.scss";
import "air-datepicker/air-datepicker.css";
import AirDatepicker from "air-datepicker";
import { analyticFilterStore } from "./analyticFilterStore/analyticFilterStore";
import { analyticAPI } from "@/api/api.js";
import MyLoader from "../../Platform/MyLoader/MyLoader.vue";
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import DateUtils from "@/utils/DateUtils/DateUtils.js";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";
import MyFilter from "@/components/Platform/MyFilter/MyFilter.vue";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

const store = analyticFilterStore();
const loaderUtils = new LoaderUtils();
const dateUtils = new DateUtils();
const menuUtils = new MenuUtils();

const { filterOptions, filter, filterProps, datepickerMonth } = store;

export default {
  components: {
    MyLoader,
    FilterBtn,
    MyFilter,
  },
  setup() {
    return {
      filter,
      filterOptions,
      filterProps,
      datepickerMonth,
    };
  },
  created() {
    const startDate = dateUtils.toTimestamp(this.filter.startDate);
    const endDate = dateUtils.toTimestamp(this.filter.endDate);

    this.startDate = dateUtils.formatDDMMYYYY(startDate);
    this.endDate = dateUtils.formatDDMMYYYY(endDate);
  },
  mounted() {
    this.datepickerMonth.forEach((item) => {
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
      this.datepickerMonth.push(el);
    },
    applyFilterDate(t) {
      const { filterDateForm } = this.$refs;

      const formData = new FormData(filterDateForm);

      formData.set("startDate", dateUtils.dateToServer(this.datepickerMonth[0].value));
      formData.set("endDate", dateUtils.dateToServer(this.datepickerMonth[1].value));

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
  },
};
</script>
