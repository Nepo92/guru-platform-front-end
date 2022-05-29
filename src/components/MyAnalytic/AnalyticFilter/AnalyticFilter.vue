<template>
  <div class="analytic-content__filter analytic-filter">
    <FilterBtn @open-filter="openFilter" />
    <form class="analytic-filter__form">
      <ul class="analytic-filter__list">
        <li
          v-for="item of filterPeriod"
          class="analytic-filter__item calendar-icon"
        >
          <input
            ref="datepicker"
            class="analytic-filter__input"
            type="text"
            :placeholder="item.placeholder"
            :name="item.name"
            :value="item.value"
          />
        </li>
        <li class="analytic-filter__item period-delimeter angle-icon">
          <MySelect
            :selectItem="select"
            :selectsArray="selectsArray"
            :activeTab="activeTab"
            @side-effect-after-change="(e) => applyFilterSort(e)"
          />
        </li>
      </ul>
      <MyFilter
        :title="title"
        :columns="columns"
        :selectsArray="selectsArray"
        :nested="nested"
        :activeTab="activeTab"
        @create-filter-modal="createFilterModal"
        @side-effect-after-change="selectSideEffect"
      />
      <MyLoader @create-loader="createLoader" />
    </form>
  </div>
</template>

<script lang="ts">
// styles
import "./AnalyticFilter.scss";
import "air-datepicker/air-datepicker.css";

// utils
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";
import DateUtils from "@/utils/DateUtils/DateUtils";
import ModalUtils from "@/components/Platform/MyModal/ModalUtils/ModalUtils";
import SelectUtils from "@/components/UI/MySelect/SelectUtils/SelectUtils";

//plugins
import AirDatepicker from "air-datepicker";

// api
import { filterAPI, dealAPI } from "@/api/api";

// components
import MyLoader from "@/components/UI/MyLoader/MyLoader.vue";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";
import MyFilter from "@/components/Platform/MyFilter/MyFilter.vue";
import MySelect from "@/components/UI/MySelect/MySelect.vue";
import { defineComponent } from "@vue/runtime-core";

// vue
import { Ref, onMounted, ref, InputHTMLAttributes, reactive, watch } from "vue";
import { iCreateModal } from "@/components/Platform/MyModal/interfacesMyModal/interfacesMyModal";
import { useRoute } from "vue-router";

// store
import { analyticStore } from "@/components/MyAnalytic/analyticStore/analyticStore";

// interfaces
import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";
import { iEmitSideEffectProps } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";

const loaderUtils = new LoaderUtils();
const dateUtils = new DateUtils();
const modalUtils = new ModalUtils();
const selectUtils = new SelectUtils();

export default defineComponent({
  components: {
    MyLoader,
    FilterBtn,
    MyFilter,
    MySelect,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    select: {
      type: Object,
      required: true,
    },
    nested: {
      type: Boolean,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
    selectsArray: {
      type: Array,
      required: true,
    },
  },
  emits: ["set-communities", "set-filter-period-props"],
  setup(props, { emit }) {
    const funnels = dealAPI.getFunnels();

    let loader = ref({} as Ref<HTMLElement>);
    let modal = ref({} as Ref<HTMLElement>);
    let wrapper = ref({} as Ref<HTMLElement>);
    let datepicker = ref([] as Array<HTMLElement>);
    const route = useRoute();

    const store = analyticStore();
    const { filter, filterProps } = store;
    let { datepickers } = store;
    const { startDate, endDate } = filter;

    const startFilter = dateUtils.formatDDMMYYYY(
      dateUtils.toTimestamp(startDate)
    );

    const endFilter = dateUtils.formatDDMMYYYY(dateUtils.toTimestamp(endDate));

    const filterPeriod = [
      {
        placeholder: "Укажите дату от",
        name: "startDate",
        value: startFilter,
      },
      {
        placeholder: "Укажите дату до",
        name: "endDate",
        value: endFilter,
      },
    ];

    const createLoader = (t: Ref<HTMLElement>) => {
      loader = t;
    };

    const openFilter = () => {
      const openFilterProps = {
        modal,
        wrapper,
        isOverflowed: !props.nested,
      };

      modalUtils.openMenu(openFilterProps);
    };

    const createFilterModal = (props: iCreateModal) => {
      modal = props.modal;
      wrapper = props.wrapper;
    };

    const setDatepicker = datepickers;

    const applyFilterDate = (t: HTMLElement | null) => {
      const formData = new FormData();

      formData.set(
        "startDate",
        dateUtils.dateToServer((datepicker.value[0] as HTMLInputElement).value)
      );

      formData.set(
        "endDate",
        dateUtils.dateToServer((datepicker.value[1] as HTMLInputElement).value)
      );

      const props = {
        target: t,
        selectName: "",
        value: "",
      };

      changeFilterSort(formData, props);
    };

    const changeFilterSort = (
      formData: FormData,
      props: iEmitSideEffectProps
    ) => {
      const { path } = route;

      const applyFilterDate = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(loader);
      }, 400);

      applyFilterDate.then(
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(loader);

          location.reload();
        },
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(loader);
        }
      );
    };

    const applyFilterSort = (props: iEmitSideEffectProps) => {
      const formData = new FormData();

      formData.set("idSort", (props as InputHTMLAttributes).value);

      changeFilterSort(formData, props);
    };

    const columns = <Array<iFilterColumnItem>>reactive([
      ...filterProps.columns.filter((el) => {
        if (el.tabs.includes(props.activeTab)) {
          el.items = [
            ...el.items.filter((el) => {
              if (el.tabs.includes(props.activeTab)) {
                return reactive(el);
              }
            }),
          ];

          return el;
        }
      }),
    ]);

    columns.forEach((item) => {
      item.items.forEach((el) => {
        if (el.name === "Тип сделки") {
          const changeDealTypeProps = {
            columns: <Array<iFilterColumnItem>>columns,
            value: <null | number | string | boolean>el.selected,
            funnels,
            selectName: "Тип сделки",
          };

          selectUtils.changeDealType(changeDealTypeProps);
        }
      });
    });

    const selectSideEffect = (props: iEmitSideEffectProps) => {
      const { selectName, value } = props;

      if (selectName === "Тип сделки") {
        const changeDealTypeProps = {
          columns: <Array<iFilterColumnItem>>columns,
          value,
          funnels,
          selectName,
        };

        selectUtils.changeDealType(changeDealTypeProps);
      }
    };

    const changeFilterDate = (e: MouseEvent) => {
      const t = e.target;

      const isCalendar = (t as Element).classList.contains("-day-");

      if (isCalendar) {
        setTimeout(() => {
          applyFilterDate(t as HTMLElement);
        }, 100);
      }
    };

    onMounted(() => {
      datepicker.value.forEach((item) => {
        new AirDatepicker(item as HTMLElement, {
          view: "months",
        });
      });

      document.body.addEventListener("click", changeFilterDate);

      const filterProps = {
        start: dateUtils.toTimestamp(startDate),
        end: dateUtils.toTimestamp(endDate),
        periodSeparate: filter.idSort,
      };

      emit("set-filter-period-props", filterProps);
    });

    selectUtils.initSelectAfetComponentLoad(columns, filter);

    return {
      createLoader,
      openFilter,
      createFilterModal,
      startFilter,
      endFilter,
      setDatepicker,
      modal,
      wrapper,
      applyFilterSort,
      selectSideEffect,
      filterPeriod,
      datepicker,
      columns,
    };
  },
});

// watch: {
//   audienceMenu() {
//     if (this.audienceMenu) {
//       const openAudienceProps = {
//         menu: this.audienceMenu.menu,
//         wrapper: this.audienceMenu.wrapper,
//       };

//       menuUtils.openMenu(openAudienceProps);
//     }
//   },
// },
// created() {
//   this.setPage(path);
//   this.setFilterPropsColumns();

//   this.filterProps = this.getFilterPropsAfterChange;
// },
// methods: {
//   createFilterModal(props) {
//     const { modal, wrapper } = props;
//     this.filterModal = modal;
//     this.filterModalWrapper = wrapper;
//   },
//   changeFilterDealType() {
//     this.filterProps = this.getCurrentFunnels;
//   },
//   changeFilterSelect() {
//     this.filterProps = this.getFilterPropsAfterChange;
//   },
//   async getSourceTraffic(props) {
//     const formData = new FormData();

//     formData.set("platform", props.selectedOption.value);

//     const sources = await filterAPI.getSourceTraffic(formData);

//     this.setSourceTraffic(sources);

//     this.filterProps = this.getFilterPropsAfterChange;
//   },
//   createAudienceList(props) {
//     this.audienceMenu = props.menuSettings;
//   },
//   changeSource() {
//     this.fitlerProps = this.getFilterPropsAfterChange;
//   },
//   async openCommunitiesMenu() {
//     const { filter } = this.filterProps;
//     const { platform, channel, communites, community } = filter;

//     const exception = ["all", "unknown"];

//     if (!exception.includes(platform)) {
//       const formData = new FormData();

//       formData.set("platform", platform);
//       formData.set("channel", channel);
//       formData.set("community", community);
//       formData.set("communites", communites);

//       const communities = await filterAPI.getCommunities(formData);

//       const audienceData = {
//         communities,
//         communitesFilter: communites,
//         communityFilter: community,
//       };

//       this.communities = audienceData;
//     }
//   },
// },

// const unknownOptions = [
//   {
//     name: "Неизвестно",
//     value: "unknown",
//     title: "Неизвестно",
//   },
// ];

// const options = [

//   ...channelsData.map((el) => {
//     return {
//       name: el,
//       value: el,
//       title: el,
//     };
//   }),
// ];
</script>

