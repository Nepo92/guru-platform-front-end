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
      :select="select"
      :nested="nested"
      :activeTab="activeTab"
      @create-filter-modal="createFilterModal"
    />
    <!-- @change-filter-select="changeFilterSelect" -->
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script lang="ts">
// styles
import "./MonitorFilter.scss";

// components
import MyFilter from "../../Platform/MyFilter/MyFilter.vue";
import FilterBtn from "@/components/Platform/MyFilter/FilterBtn/FilterBtn.vue";

// utils
import ModalUtils from "@/components/Platform/MyModal/modalUtils/modalUtils";
import LoaderUtils from "@/components/UI/MyLoader/utils/LoaderUtils";

// api
import { monitorAPI } from "@/api/api";

// store
import { monitorFilter } from "./MonitorFilterStore/MonitorFilterStore";

// interfaces
import { iCreateModal } from "@/components/Platform/interfacesPlatform/interfacesPlatform";
import { iFilterPeriod } from "./interfacesMonitorFilter/interfacesMonitorFilter";

// vue
import { defineComponent } from "@vue/runtime-core";
import MyLoader from "@/components/UI/MyLoader/MyLoader.vue";
import { Ref } from "vue";

const modalUtils = new ModalUtils();
const loaderUtils = new LoaderUtils();

export default defineComponent({
  components: {
    FilterBtn,
    MyFilter,
    MyLoader,
  },
  props: {
    title: String,
    select: Object,
    nested: Boolean,
    activeTab: String,
  },
  setup(props) {
    let openFilterSettings: iCreateModal;
    let loader: Ref<HTMLElement>;

    const store = monitorFilter();

    const { period, filterProps } = store;
    const { filter, columns } = filterProps;

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

      const apply = monitorAPI.applyFilter(formData);

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

    return {
      openFilter,
      createFilterModal,
      period,
      filter,
      changePeriod,
      createLoader,
      columns,
    };
  },
});
</script>
