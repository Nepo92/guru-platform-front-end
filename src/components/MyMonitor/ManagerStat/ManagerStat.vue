<template>
  <div class="monitor-stat">
    <div class="monitor-stat__header stat-header">
      <div class="stat-header__left">
        <p class="stat-header__sort stat-header__icon">Рейтинг</p>
        <select @change="changeFilterManager" class="monitor-select__stat">
          <option
            v-for="(item, index) of managerSort"
            :key="index"
            :selected="+filter.rowSortType === +item.value"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <span class="stat-header__tooltip tooltip">
        <span class="stat-tooltip__wrapper tooltip__wrapper"> {{ description }} </span>
        ?
      </span>
    </div>
    <div class="monitor-stat__wrapper">
      <div
        class="monitor-stat__header-row"
        :class="$route.path === '/monitor-control/' ? 'control' : ''"
      >
        <div v-for="(item, index) of stats" :key="index" :class="`monitor-stat__${item.nameEng}`">
          {{ item.name }}
        </div>
      </div>
      <div v-if="$route.path === '/monitor/'">
        <ManagerStatAdminSales :props="{ data, filter }" />
      </div>
      <div v-else-if="$route.path === '/monitor-control/'">
        <ManagerStatAdminControl :props="{ data }" />
      </div>
    </div>
    <Loader @create-loader="createLoader" />
  </div>
</template>

<script>
import "./ManagerStat.scss";
import { filterAPI } from "../../../api/api";
import { statMonitor } from "@/store/store";
import LoaderUtils from "../../../utils/LoaderUtils/LoaderUtils";
import Loader from "../../Platform/MyLoader/MyLoader.vue";
import ManagerStatAdminSales from "./ManagerStatAdmin/Sales/ManagerStatAdminSales.vue";
import ManagerStatAdminControl from "./ManagerStatAdmin/Control/ManagerStatAdminControl.vue";

const store = statMonitor();
const loaderUtils = new LoaderUtils();

const { filter, data, managerStat, imageSize, statDescription, statsName } = store;

export default {
  components: {
    Loader,
    ManagerStatAdminSales,
    ManagerStatAdminControl,
  },
  setup() {
    return {
      filter,
      data,
      managerStat,
      imageSize,
      statDescription,
      statsName,
    };
  },
  created() {
    const { path } = this.$route;
    this.managerSort = this.managerStat.filter((el) => el.pages.includes(path));
    this.description = this.statDescription.find((el) => el.pages.includes(path))?.value || "";
    this.stats = this.statsName.filter((el) => el.pages.includes(path));
  },
  methods: {
    changeFilterManager(e) {
      console.log(this.filter);
      const t = e.target;
      const formData = new FormData();

      formData.set("rowSortType", e.target.value);

      const loader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      }, 400);

      t.classList.add("disabled");

      const apply = filterAPI.applyFilter("/monitor/", formData);

      apply.then(
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
    createLoader(props) {
      this.loader = props.loader;
    },
  },
};
</script>
