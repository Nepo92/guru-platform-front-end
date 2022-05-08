<script>
import "./MonitorFilter.scss";
import "../../Platform/MyFilter/MyFilter.scss";
import "@/assets/scss/modal.scss";
import MyFilter from '../../Platform/MyFilter/MyFilter.vue';
import MenuUtils from '@/utils/MenuUtils/MenuUtils.js';
import { filterAPI } from '@/api/api.js';
import LoaderUtils from '@/utils/LoaderUtils/LoaderUtils.js';
import MyLoader from '@/components/Platform/MyLoader/MyLoader.vue';

const menuUtils = new MenuUtils();
const loaderUtils = new LoaderUtils();

import { filterStore } from '@/store/store';
import { storeToRefs } from 'pinia';

const store = filterStore();

const { filter, period, monitorDeals, filterProps } = storeToRefs(store);

export default {
  components: {
    MyFilter,
    MyLoader,
  },
  setup() {
    return {
      filter,
      period,
      monitorDeals,
      filterProps,
    };
  },
  methods: {
    openFilter() {
      const openFilterProps = {
        menu: this.filterModal,
        wrapper: this.filterModalWrapper,
        isOverflowed: true,
      }

      menuUtils.openMenu(openFilterProps);
    },
    createFilterModal(props) {
      const { modal, wrapper } = props;
      this.filterModal = modal;
      this.filterModalWrapper = wrapper;

      console.log(modal);
    },
    changePeriod(e, item) {
      const t = e.target;

      const { path } = this.$route;

      const formData = new FormData();
      formData.set('period', item.value);

      const apply = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      }, 400);

      t.classList.add('disabled');

      apply.then(() => {
        clearTimeout(showLoader);
        t.classList.remove('disabled');

        location.reload();
      }, () => {
        clearTimeout(showLoader);
        t.classList.remove('disabled');
      });
    },
    changeDealsUtensils(e, item) {
      const t = e.target;
      const { path } = this.$route;

      const formData = new FormData();
      formData.set('showType', item.value);

      const apply = filterAPI.applyFilter(path, formData);

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(this.loader);
      }, 400);

      t.classList.add('disabled');

      apply.then(() => {
        clearTimeout(showLoader);
        t.classList.remove('disabled');

        location.reload();
      }, () => {
        clearTimeout(showLoader);
        t.classList.remove('disabled');
      });
    },
    createLoader(props) {
      const { loader } = props;

      this.loader = loader;
    },
  },
}
</script>

<template>
  <div class="filter monitor__filter">
    <div
      class="filter__open monitor-filter__open"
      :class="filter.canClear ? 'active' : ''"
      @click="openFilter"
    >
      Фильтр
    </div>
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
      <li class="monitor-filter__item deals">
        <ul class="deals__list">
          <li
            v-for="(item, index) of monitorDeals"
            :key="index"
            :class="filter.showType === item.value ? 'active' : ''"
            class="monitor-filter__item deals__item"
            @click="(e) => changeDealsUtensils(e, item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </li>
    </ul>
    <MyFilter
      :props="filterProps"
      @create-filter-modal="createFilterModal"
    />
    <MyLoader @create-loader="createLoader" />
  </div>
</template>
