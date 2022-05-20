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
        <li class="analytic-filter__item period-delimeter angle-icon">
          <MySelect
            :props="{
              ...filterProps.filterPeriod.select,
              ...props.selectsProps,
            }"
            @change-select-value="applyFilterSort"
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
          changePlatform,
          changeSourceTrafficValue,
        }"
        @create-filter-modal="createFilterModal"
        @change-filter-deal-type="changeFilterDealType"
        @change-filter-select="changeFilterSelect"
        @change-platform-filter="getSourceTraffic"
        @change-source-traffic-filter="changeSource"
        @open-communities-menu="openCommunitiesMenu"
      />
      <MyLoader @create-loader="createLoader" />
      <AudienceList :props="communities" @create-tab-settings-menu="createAudienceList" />
    </form>
  </div>
</template>

<script>
// styles
import "./AnalyticFilter.scss";
import "air-datepicker/air-datepicker.css";

// utils
import LoaderUtils from "@/utils/LoaderUtils/LoaderUtils.js";
import DateUtils from "@/utils/DateUtils/DateUtils.js";
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

//plugins
import AirDatepicker from "air-datepicker";

// api
import { filterAPI } from "@/api/api.js";

// store
import { analyticFilterStore } from "../AnalyticStore/AnalyticFilterStore/AnalyticFilterStore.js";
import { mapActions, storeToRefs } from "pinia";

// components
import MyLoader from "../../Platform/MyLoader/MyLoader.vue";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";
import MyFilter from "@/components/Platform/MyFilter/MyFilter.vue";
import MySelect from "../../Platform/MySelect/MySelect.vue";
import AudienceList from "../Menus/AudienceList/AudienceList.vue";

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
    AudienceList,
  },
  props: ["props"],
  emits: ['set-communities'],
  async setup() {
    const { filterProps, initialFunnels, getCurrentFunnels, getFilterPropsAfterChange, getCommunities, } =
      storeToRefs(store);
    const {
      setPage,
      changeDealType,
      setFilterPropsColumns,
      changeSelectValue,
      changeSelectFilter,
      setPeriodProps,
      changePlatform,
      setSourceTraffic,
      changeSourceTrafficValue,
      setCommunities,
    } = mapActions(analyticFilterStore, [
      "changeDealType",
      "changeSelectValue",
      "changeSelectFilter",
      "setPeriodProps",
      "setFilterPropsColumns",
      "setPage",
      "changePlatform",
      "setSourceTraffic",
      'changeSourceTrafficValue',
      'setCommunities',
    ]);

    await store.fetchFunnels();

    return {
      filterProps,
      initialFunnels,
      changeDealType,
      getCurrentFunnels,
      changeSelectValue,
      changeSelectFilter,
      getFilterPropsAfterChange,
      setPeriodProps,
      setPage,
      setFilterPropsColumns,
      changePlatform,
      setSourceTraffic,
      changeSourceTrafficValue,
      setCommunities,
      getCommunities,
    };
  },
  data() {
    return {
      communities: null,
    };
  },
  created() {
    const startDate = dateUtils.toTimestamp(this.filterProps.filter.startDate);
    const endDate = dateUtils.toTimestamp(this.filterProps.filter.endDate);

    this.startDate = dateUtils.formatDDMMYYYY(startDate);
    this.endDate = dateUtils.formatDDMMYYYY(endDate);

    const { path } = this.$route;

    this.setPage(path);

    this.setPeriodProps([startDate, endDate, this.filterProps.filter.idSort]);

    this.setFilterPropsColumns();

    this.filterProps = this.getFilterPropsAfterChange;
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

      this.changeFilterSort(formData, t);
    },
    applyFilterSort(props) {
      this.changeSelectFilter(props);

      this.filterProps = this.getFilterPropsAfterChange;

      const formData = new FormData();

      formData.set("idSort", props.selectedOption.value);

      this.changeFilterSort(formData, props.target);
    },
    changeFilterSort(formData, t) {
      const { path } = this.$route;

      const applyFilterDate = filterAPI.applyFilter(path, formData);

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
    async getSourceTraffic(props) {
      const formData = new FormData();

      formData.set("platform", props.selectedOption.value);

      const sources = await filterAPI.getSourceTraffic(formData);

      this.setSourceTraffic(sources);

      this.filterProps = this.getFilterPropsAfterChange;
    },
    createAudienceList(props) {
      this.audienceMenu = props.menuSettings;
    },
    changeSource(props) {
      this.fitlerProps = this.getFilterPropsAfterChange;
    },
    async openCommunitiesMenu(props) {
      const { filter } = this.filterProps;
      const { platform, channel, communites, community } = filter;

      const exception = ["all", "unknown"];

      if (!exception.includes(platform)) {
        const formData = new FormData();

        formData.set("platform", platform);
        formData.set("channel", channel);

        const communities = await filterAPI.getCommunities(formData);

        this.communities = communities;

        const openAudienceProps = {
          menu: this.audienceMenu.menu,
          wrapper: this.audienceMenu.wrapper,
        };

        menuUtils.openMenu(openAudienceProps);
      }
    },
  },
};
</script>
