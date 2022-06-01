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
      :title="title"
      :columns="columns"
      :selectsArray="selectsArray"
      :nested="nested"
      :activeTab="activeTab"
      @create-filter-modal="createFilterModal"
      @side-effect-after-change="selectSideEffect"
    />
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script lang="ts">
import "./MonitorFilter.scss";
import MyFilter from "../../Platform/MyFilter/MyFilter.vue";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";
import ModalUtils from "@/components/Platform/MyModal/ModalUtils/ModalUtils";
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";
import SelectUtils from "@/components/UI/MySelect/SelectUtils/SelectUtils";
import { filterAPI } from "@/api/api";
import { monitorFilter } from "./monitorFilterStore/monitorFilterStore";
import { iCreateModal } from "@/components/Platform/MyModal/interfacesMyModal/interfacesMyModal";
import { iFilterPeriod } from "./interfacesMonitorFilter/interfacesMonitorFilter";
import { defineComponent } from "@vue/runtime-core";
import MyLoader from "@/components/UI/MyLoader/MyLoader.vue";
import { Ref, reactive } from "vue";
import { useRoute } from "vue-router";

const modalUtils = new ModalUtils();
const loaderUtils = new LoaderUtils();
const selectUtils = new SelectUtils();

export default defineComponent({
  components: {
    FilterBtn,
    MyFilter,
    MyLoader,
  },
  props: {
    title: {
      type: String,
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
  setup(props) {
    const activeTab = props.activeTab as string;
    let openFilterSettings: iCreateModal;
    let loader: Ref<HTMLElement>;

    const route = useRoute();
    const { path } = route;

    const store = monitorFilter();

    const { filterProps, period } = store;
    const { filter } = filterProps;

    const columns = reactive(
      filterProps.columns.map((item) => {
        item.items = [
          ...item.items
            .filter((el) => el.tabs.includes(activeTab))
            .map((el) => reactive(el)),
        ];

        return item;
      })
    );

    const createLoader = (t: Ref<HTMLElement>) => {
      loader = t;
    };

    const createFilterModal = (props: iCreateModal) => {
      openFilterSettings = props;
    };

    const openFilter = () => {
      const openFilterProps = {
        modal: openFilterSettings.modal,
        wrapper: openFilterSettings.wrapper,
        isOverflowed: !props.nested,
      };

      modalUtils.openMenu(openFilterProps);
    };

    const changePeriod = (e: MouseEvent, item: iFilterPeriod) => {
      const t = e.target;

      const formData = new FormData();
      formData.set("period", `${item.value}`);

      const apply = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(loader);
      }, 400);

      (t as Element).classList.add("no-active");

      apply.then(
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

    const selectSideEffect = (
      selectName: string,
      value: null | number | string | boolean
    ) => {
      const propsSelectSideEffect = {
        columns,
        selectName,
        value,
      };

      selectUtils.updateValueSideEffect(propsSelectSideEffect);
    };

    return {
      openFilter,
      createFilterModal,
      period,
      changePeriod,
      createLoader,
      selectSideEffect,
      columns,
      filter,
    };
  },
});
</script>
