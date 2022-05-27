<template>
  <div class="monitor-stat">
    <div class="monitor-stat__header stat-header">
      <div class="stat-header__left">
        <p class="stat-header__sort stat-header__icon">Рейтинг</p>
        <MySelect
          :selectItem="select"
          :activeTab="activeTab"
          :selectsArray="selectsArray"
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
      <!-- <div v-if="$route.path === '/monitor/'"> -->
      <!-- <ManagerStatAdminSales :props="{ data, filter }" /> -->
      <!-- </div> -->
      <!-- <div v-else-if="$route.path === '/monitor-control/'"> -->
      <!-- <ManagerStatAdminControl :props="{ data }" /> -->
      <!-- </div> -->
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
import LoaderUtils from "@/components/UI/MyLoader/utils/LoaderUtils";

// components
import MyLoader from "@/components/UI/MyLoader/MyLoader.vue";
// import ManagerStatAdminSales from "./ManagerStatAdmin/Sales/ManagerStatAdminSales.vue";
// import ManagerStatAdminControl from "./ManagerStatAdmin/Control/ManagerStatAdminControl.vue";
import MySelect from "@/components/UI/MySelect/MySelect.vue";

// vue
import { defineComponent } from "@vue/runtime-core";
import { Ref } from "vue";

// interfaces
import { iSelectOption } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";

const store = statMonitor();
const loaderUtils = new LoaderUtils();

export default defineComponent({
  components: {
    MyLoader,
    // ManagerStatAdminSales,
    // ManagerStatAdminControl,
    MySelect,
  },
  props: {
    activeTab: String,
    selectsArray: Array,
  },
  setup(props) {
    const activeTab = props.activeTab as string;
    console.log(props.selectsArray);
    let loader: Ref<HTMLElement>;

    const { managerStatSelect, filter, statDescription, statsName } = store;

    const managerStatOptions = () =>
      managerStatSelect()
        .options()
        .filter((el: iSelectOption) => el.tabs?.includes(activeTab));

    const select = managerStatSelect();

    console.log(select);

    const description =
      statDescription.find((el) => el.tabs.includes(activeTab))?.value || "";

    const stats = statsName.filter((el) => el.tabs.includes(activeTab));

    const createLoader = (e: Ref<HTMLElement>) => {
      loader = e;
    };

    // const changeFilterManager = (e) => {
    //   const t = e.target;
    //   const formData = new FormData();

    //   formData.set("rowSortType", e.target.value);

    //   const loader = setTimeout(() => {
    //     loaderUtils.showLoader(loader);
    //   }, 400);

    //   t.classList.add("disabled");

    //   const apply = filterAPI.applyFilter("/monitor/", formData);

    //   apply.then(
    //     () => {
    //       clearTimeout(loader);
    //       t.classList.remove("disabled");

    //       location.reload();
    //     },
    //     () => {
    //       clearTimeout(loader);
    //       t.classList.remove("disabled");
    //     }
    //   );
    // };

    return {
      select,
      filter,
      description,
      stats,
      createLoader,
      // changeFilterManager,
    };
  },
});
</script>
