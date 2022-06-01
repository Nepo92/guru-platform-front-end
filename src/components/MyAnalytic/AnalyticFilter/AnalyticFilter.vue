<template>
  <div class="analytic-content__filter analytic-filter">
    <FilterBtn @open-filter="openFilter" />
    <form class="analytic-filter__form">
      <ul class="analytic-filter__list">
        <li
          v-for="(item, index) of filterPeriod"
          :key="index"
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
            :select-item="select"
            :selects-array="selectsArray"
            :active-tab="activeTab"
            @side-effect-after-change="(e) => applyFilterSort(e)"
          />
        </li>
      </ul>
      <MyFilter
        :title="title"
        :columns="columns"
        :selects-array="selectsArray"
        :nested="nested"
        :active-tab="activeTab"
        @create-filter-modal="createFilterModal"
        @side-effect-after-change="selectSideEffect"
        @input-side-effect="inputSideEffect"
      />
      <MyLoader @create-loader="createLoader" />
      <MyModal
        v-slot="slotProps"
        :title="audienceList.title"
        :hasCancel="audienceList.hasCancel"
        :cancelText="audienceList.cancelText"
        :hasApply="audienceList.hasApply"
        :applyText="audienceList.applyText"
        :cancel="() => false"
        :nested="false"
        :apply="audienceList.apply"
        :activeTab="activeTab"
        :selectsArray="selectsArray"
        :size="audienceList.size"
        :slotData="slotData"
        :hasSideEffect="audienceList.hasSideEffect"
        :modalSideEffect="modalSideEffect"
        @create-modal="createAudienceList"
      >
        <AudienceList
          :activeTab="slotProps.activeTab"
          :selectsArray="slotProps.selectsArray"
          :slotData="slotProps.slotData"
          @slot-side-effect="slotSideEffect"
        />
      </MyModal>
    </form>
  </div>
</template>

<script lang="ts">
import "./AnalyticFilter.scss";
import "air-datepicker/air-datepicker.css";
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";
import DateUtils from "@/utils/DateUtils/DateUtils";
import ModalUtils from "@/components/Platform/MyModal/ModalUtils/ModalUtils";
import SelectUtils from "@/components/UI/MySelect/SelectUtils/SelectUtils";
import AirDatepicker from "air-datepicker";
import { filterAPI, dealAPI } from "@/api/api";
import MyLoader from "@/components/UI/MyLoader/MyLoader.vue";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";
import MyFilter from "@/components/Platform/MyFilter/MyFilter.vue";
import MySelect from "@/components/UI/MySelect/MySelect.vue";
import { defineComponent, watch } from "@vue/runtime-core";
import { Ref, onMounted, ref, InputHTMLAttributes, reactive } from "vue";
import { iCreateModal } from "@/components/Platform/MyModal/interfacesMyModal/interfacesMyModal";
import { useRoute } from "vue-router";
import { analyticStore } from "@/components/MyAnalytic/analyticStore/analyticStore";
import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";
import { iEmitSideEffectProps } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import ChangeDealType from "./AnalyticFilterUtils/ChangeDealType/ChangeDealType";
import ChangePlatform from "./AnalyticFilterUtils/ChangePlatform/ChangePlatform";
import ChangeAdvertiserCabinet from "./AnalyticFilterUtils/ChangeAdvertiserCabinet/ChangeAdvertiserCabinet";
import AudienceList from "../Menus/AudienceList/AudienceList.vue";
import MyModal from "@/components/Platform/MyModal/MyModal.vue";
import ChangeSource from "./AnalyticFilterUtils/ChangeSource/ChangeSource";
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import { monitorAPI } from "@/api/api";
import { iMyInput } from "@/components/UI/MyInput/interfacesMyInput/interfacesMyInput";

const loaderUtils = new LoaderUtils();
const dateUtils = new DateUtils();
const modalUtils = new ModalUtils();
const selectUtils = new SelectUtils();
const changeDealType = new ChangeDealType();
const changePlatform = new ChangePlatform();
const changeAdvertiserCabinet = new ChangeAdvertiserCabinet();
const changeSource = new ChangeSource();

export default defineComponent({
  components: {
    MyLoader,
    FilterBtn,
    MyFilter,
    MySelect,
    AudienceList,
    MyModal,
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

    let slotData = ref({});
    let loader = ref({} as Ref<HTMLElement>);
    let modal = ref({} as Ref<HTMLElement>);
    let wrapper = ref({} as Ref<HTMLElement>);
    let datepicker = ref([] as Array<HTMLElement>);
    let activeTab = ref("" as string);
    let modalAudience = ref({} as Ref<HTMLElement>);
    let modalAudienceWrapper = ref({} as Ref<HTMLElement>);
    let audiencesCheckboxs = ref({} as Ref<Array<Ref<HTMLElement>>>);

    const route = useRoute();

    const store = analyticStore();
    const { filter, filterProps, audienceList } = store;
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

      const changeFilterSortProps = {
        target: t,
        selectName: "",
        value: "",
        activeTab: props.activeTab,
      };

      changeFilterSort(formData, changeFilterSortProps);
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
            activeTab: "",
          };

          changeDealType.changeDealType(changeDealTypeProps);
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
          activeTab: props.activeTab,
        };

        changeDealType.changeDealType(changeDealTypeProps);
      } else if (selectName === "Площадка") {
        const changePlatformProps = {
          columns: <Array<iFilterColumnItem>>columns,
          value,
          selectName,
          activeTab,
          loader,
        };

        changePlatform.changePlatform(changePlatformProps);
      } else if (selectName === "Рекламный кабинет") {
        const changeAdvCabinetProps = {
          columns,
          value,
          activeTab,
        };

        changeAdvertiserCabinet.changeAdvertisingСabinet(changeAdvCabinetProps);
      } else if (selectName === "Источники трафика") {
        const changeSourceProps = {
          columns,
          value,
          activeTab,
        };

        changeSource.changeSource(changeSourceProps);
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

      activeTab.value = props.activeTab;
    });

    selectUtils.initSelectAfterComponentLoad(columns, filter);

    const createAudienceList = (props: iCreateModal) => {
      modalAudience = props.modal;
      modalAudienceWrapper = props.wrapper;
    };

    const inputSideEffect = (props: Ref<HTMLElement>) => {
      let platformItem, channelItem, communityItem;

      columns.forEach((item) => {
        const advCabinet = item.items.find(
          (el) => el.name === "Рекламный кабинет"
        );
        const platform = item.items.find((el) => el.name === "Площадка");
        const channel = item.items.find(
          (el) => el.name === "Источники трафика"
        );
        const community = item.items.find((el) => el.name === "Аудитории");

        if (platform) {
          platformItem = platform;
        }

        if (channel) {
          channelItem = channel;
        }

        if (community) {
          communityItem = community;
        }
      });

      if (channelItem) {
        const exception = ["all", "unknown"];

        const isException = exception.includes(
          (channelItem as iMySelect).selected as string
        );

        if (!isException && platformItem && channelItem && communityItem) {
          const formData = new FormData();

          const communityValue = `${(communityItem as iMyInput).value}`;

          formData.set(
            "platform",
            (platformItem as iMySelect).selected as string
          );
          formData.set(
            "channel",
            (channelItem as iMySelect).selected as string
          );
          formData.set("community", `${(communityItem as iMyInput).value}`);

          const getCommunities = monitorAPI.getCommunities(formData);

          const showUtils = setTimeout(() => {
            loaderUtils.showLoader(loader);
          }, 400);

          (props.value as Element).classList.add("no-active");

          getCommunities.then(
            (communitesData) => {
              clearTimeout(showUtils);
              loaderUtils.hideLoader(loader);

              (props.value as Element).classList.remove("no-active");

              slotData.value = {
                communitesData,
                value: communityValue,
              };

              const openAudienceProps = {
                modal: modalAudience,
                wrapper: modalAudienceWrapper,
                isOverflowed: audienceList.nested,
              };

              modalUtils.openMenu(openAudienceProps);
            },
            () => {
              clearTimeout(showUtils);
              loaderUtils.hideLoader(loader);

              (props.value as Element).classList.remove("no-active");
            }
          );
        }
      }
    };

    const slotSideEffect = (props: Ref<Array<Ref<HTMLElement>>>) => {
      audiencesCheckboxs.value = props.value;
    };

    const modalSideEffect = () => {
      let communityItem;

      columns.forEach((item) => {
        const community = item.items.find((el) => el.name === "Аудитории");

        if (community) {
          communityItem = community;
        }
      });

      if (communityItem) {
        if ((audiencesCheckboxs.value[0].value as HTMLInputElement).checked) {
          (communityItem as iMyInput).value = (
            audiencesCheckboxs.value[0].value as HTMLInputElement
          ).value;
        } else {
          (communityItem as iMyInput).value = <Array<string>>[
            ...audiencesCheckboxs.value
              .map((item) => {
                if ((item.value as HTMLInputElement).checked) {
                  return (item.value as HTMLInputElement).value;
                }
              })
              .filter((el) => el),
          ];
        }
      }
    };

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
      audienceList,
      createAudienceList,
      inputSideEffect,
      changeDealType,
      slotData,
      slotSideEffect,
      modalSideEffect,
    };
  },
});
</script>

