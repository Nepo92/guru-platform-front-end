<template>
  <div class="analytic-content__filter analytic-filter">
    <FilterBtn @open-filter="openFilter" />
    <form class="analytic-filter__form">
      <ul class="analytic-filter__list">
        <li class="analytic-filter__item calendar-icon">
          <input
            :ref="setDatepicker"
            class="analytic-filter__input"
            type="text"
            :value="startFilter"
            placeholder="Укажите дату от"
            name="startDate"
          />
        </li>
        <li class="analytic-filter__item calendar-icon">
          <input
            :ref="setDatepicker"
            class="analytic-filter__input"
            type="text"
            :value="endFilter"
            placeholder="Укажите дату до"
            name="endDate"
          />
        </li>
        <li class="analytic-filter__item period-delimeter angle-icon">
          <MySelect
            :selectItem="select"
            :selectsArray="selectsArray"
            :activeTab="activeTab"
            @on-change="(e) => applyFilterSort(e)"
          />
        </li>
      </ul>
      <MyFilter
        :title="title"
        :columns="currentColumns"
        :selectsArray="selectsArray"
        :nested="nested"
        :activeTab="activeTab"
        @create-filter-modal="createFilterModal"
      />
      <MyLoader @create-loader="createLoader" />
      <!-- <AudienceList
        v-if="communities"
        :props="communities"
        @create-tab-settings-menu="createAudienceList"
      /> -->
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

//plugins
import AirDatepicker from "air-datepicker";

// api
import { filterAPI } from "@/api/api";

// components
import MyLoader from "@/components/UI/MyLoader/MyLoader.vue";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";
import MyFilter from "@/components/Platform/MyFilter/MyFilter.vue";
import MySelect from "@/components/UI/MySelect/MySelect.vue";
// import AudienceList from "../Menus/AudienceList/AudienceList.vue";
import { defineComponent } from "@vue/runtime-core";

// vue
import { Ref, onMounted, ref, InputHTMLAttributes } from "vue";
import { iCreateModal } from "@/components/Platform/MyModal/interfacesMyModal/interfacesMyModal";
import { useRoute } from "vue-router";

// store
import { analyticStore } from "@/components/MyAnalytic/analyticStore/analyticStore";

// interfaces
import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import { iMyInput } from "@/components/UI/MyInput/interfacesMyInput/interfacesMyInput";

const loaderUtils = new LoaderUtils();
const dateUtils = new DateUtils();
const modalUtils = new ModalUtils();

export default defineComponent({
  components: {
    MyLoader,
    FilterBtn,
    MyFilter,
    MySelect,
    // AudienceList,
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
  async setup(props) {
    let loader = ref({} as Ref<HTMLElement>);
    let modal = ref({} as Ref<HTMLElement>);
    let wrapper = ref({} as Ref<HTMLElement>);
    const route = useRoute();

    const store: any = analyticStore();
    const { filter, datepickers, columns } = store;
    const { startDate, endDate } = filter;

    const startFilter = dateUtils.formatDDMMYYYY(
      dateUtils.toTimestamp(startDate)
    );

    const endFilter = dateUtils.formatDDMMYYYY(dateUtils.toTimestamp(endDate));

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

    const setDatepicker = (el: any) => {
      datepickers.push(el);
    };

    const applyFilterDate = (t: EventTarget | null) => {
      const formData = new FormData();

      formData.set("startDate", dateUtils.dateToServer(datepickers[0].value));

      formData.set("endDate", dateUtils.dateToServer(datepickers[1].value));

      changeFilterSort(formData, t);
    };

    const changeFilterSort = (formData: FormData, t: EventTarget | null) => {
      const { path } = route;

      const applyFilterDate = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(loader);
      }, 400);

      (t as Element).classList.add("no-active");

      applyFilterDate.then(
        () => {
          clearTimeout(showLoader);
          (t as Element).classList.remove("no-active");

          location.reload();
        },
        () => {
          clearTimeout(showLoader);
          (t as Element).classList.remove("no-active");
        }
      );
    };

    const applyFilterSort = (props: EventTarget) => {
      const formData = new FormData();

      formData.set("idSort", (props as InputHTMLAttributes).value);

      changeFilterSort(formData, props);
    };

    const currentColumns = columns.filter((item: iFilterColumnItem) =>
      item.tabs.includes(props.activeTab)
    );

    currentColumns.forEach((item: iFilterColumnItem) => {
      item.items = [
        ...item.items.filter((el: iMySelect | iMyInput) => {
          if (el.tabs?.includes(props.activeTab)) {
            return el;
          }
        }),
      ];
    });

    onMounted(() => {
      datepickers.forEach((item: HTMLElement) => {
        new AirDatepicker(item, {
          view: "months",
        });
      });

      document.body.addEventListener("click", (e: MouseEvent) => {
        const t = e.target;

        const isCalendar = (t as Element).classList.contains("-day-");

        if (isCalendar) {
          setTimeout(() => {
            applyFilterDate(t);
          }, 100);
        }
      });
    });

    return {
      createLoader,
      openFilter,
      createFilterModal,
      startFilter,
      endFilter,
      datepickers,
      setDatepicker,
      modal,
      wrapper,
      applyFilterSort,
      currentColumns,
    };
  },

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
});

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

