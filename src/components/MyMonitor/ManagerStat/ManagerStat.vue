<template>
  <div class="monitor-stat">
    <div class="monitor-stat__header stat-header">
      <div class="stat-header__left">
        <p class="stat-header__sort stat-header__icon">Рейтинг</p>
        <MySelect
          :selectItem="select"
          :activeTab="activeTab"
          :selectsArray="selectsArray"
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
    <Loader @create-loader="createLoader" />
  </div>
</template>

<script lang="ts">
// styles
import "./ManagerStat.scss";

// store
import { statMonitor } from "./ManagerStatStore/ManagerStatStore";

// utils
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";

// components
import MyLoader from "@/components/UI/MyLoader/MyLoader.vue";
import ManagerStatTable from "./ManagerStatTable/ManagerStatTable.vue";
import MySelect from "@/components/UI/MySelect/MySelect.vue";

// vue
import { defineComponent } from "@vue/runtime-core";
import { InputHTMLAttributes, Ref } from "vue";
import { useRoute } from "vue-router";

// interfaces
import { iSelectOption } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";

// api
import { filterAPI } from "@/api/api";

const store = statMonitor();
const loaderUtils = new LoaderUtils();

export default defineComponent({
  components: {
    MyLoader,
    ManagerStatTable,
    MySelect,
  },
  props: {
    activeTab: String,
    selectsArray: Array,
  },
  setup(props) {
    const activeTab = props.activeTab as string;
    let loader: Ref<HTMLElement>;

    const route = useRoute();
    const { path } = route;

    const {
      managerStatSelect,
      filter,
      statDescription,
      statsName,
      managerStatistic,
    } = store;

    const managerStatOptions = managerStatSelect()
      .options()
      .filter((el: iSelectOption) => el.tabs?.includes(activeTab));

    const select = managerStatSelect();
    select.options = () => managerStatOptions;

    const description =
      statDescription.find((el) => el.tabs.includes(activeTab))?.value || "";

    const stats = statsName.filter((el) => el.tabs.includes(activeTab));

    const createLoader = (e: Ref<HTMLElement>) => {
      loader = e;
    };

    const changeFilterManager = (t: InputHTMLAttributes) => {
      const formData = new FormData();

      formData.set("rowSortType", t.value);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(loader);
      }, 400);

      (t as Element).classList.add("disabled");

      const apply = filterAPI.applyFilter(path, formData);

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
