<template>
  <div class="monitor-stat">
    <div class="monitor-stat__header stat-header">
      <div class="stat-header__left">
        <p class="stat-header__sort stat-header__icon">Рейтинг</p>
        <MySelect
          :selectItem="select"
          :selectsArray="selectsArray"
          :activeTab="activeTab"
          @on-change="changeFilterManager"
        />
      </div>
      <span class="stat-header__tooltip tooltip">
        <span class="stat-tooltip__wrapper tooltip__wrapper">
          {{ description }}
        </span>
        ?
      </span>
    </div>
    <div class="monitor-stat__wrapper">
      <div
        class="monitor-stat__header-row"
        :class="activeTab === 'Контроль' ? 'control' : ''"
      >
        <div
          v-for="(item, index) of stats"
          :key="index"
          :class="`monitor-stat__${item.nameEng}`"
        >
          {{ item.name }}
        </div>
      </div>
      <ManagerStatTable :props="{ managerStatistic, filter }" />
    </div>
  </div>
</template>

<script lang="ts">
// styles
import "./ManagerStat.scss";

// store
import { statMonitor } from "./managerStatStore/managerStatStore";

// utils
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";

// components
import ManagerStatTable from "./ManagerStatTable/ManagerStatTable.vue";
import MySelect from "@/components/UI/MySelect/MySelect.vue";

// vue
import { defineComponent } from "@vue/runtime-core";
import { InputHTMLAttributes, Ref, reactive } from "vue";
import { useRoute } from "vue-router";

// interfaces
import {
  iMySelect,
  iSelectOption,
} from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";

// api
import { filterAPI } from "@/api/api";

const store = statMonitor();
const loaderUtils = new LoaderUtils();

export default defineComponent({
  components: {
    ManagerStatTable,
    MySelect,
  },
  props: {
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
    let loader: Ref<HTMLElement>;
    let select = reactive({} as iMySelect);

    const route = useRoute();
    const { path } = route;

    const {
      managerStatSelect,
      filter,
      statDescription,
      statsName,
      managerStatistic,
    } = store;

    const managerStatOptions = managerStatSelect
      .options()
      .filter((el: iSelectOption) => el.tabs?.includes(activeTab));

    select = <iMySelect>managerStatSelect;

    select.options = (): Array<iSelectOption> => managerStatOptions;

    const description =
      statDescription.find((el) => el.tabs.includes(activeTab))?.value || "";

    const stats = statsName.filter((el) => el.tabs.includes(activeTab));

    const createLoader = (e: Ref<HTMLElement>) => {
      loader = e;
    };

    const changeFilterManager = (t: HTMLElement) => {
      const formData = new FormData();

      formData.set("rowSortType", (t as HTMLInputElement).value);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(loader);
      }, 400);

      const apply = filterAPI.applyFilter(path, formData);

      apply.then(
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

    return {
      select,
      filter,
      description,
      stats,
      createLoader,
      managerStatistic,
      changeFilterManager,
    };
  },
});
</script>
