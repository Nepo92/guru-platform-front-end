<template>
  <div class="analytic-content__container">
    <div class="analytic-content__table">
      <div class="analytic-table__left">
        <div class="analytic-left__header">
          <div ref="searchColumn" class="analytic-table__search search-icon">
            <input
              class="analytic-table__input"
              placeholder="Метрики"
              type="text"
              @input="(e) => metricksSearch(e)"
            />
          </div>
          <div 
            class="analytic-table__column"
          >
            Итого
          </div>
        </div>
        <div class="analytic-metric">
          <div
            v-for="(metric, index) of rows"
            :key="index"
            ref="metricRow"
            class="analytic-metric__row"
          >
            <div class="analytic-metric__nav">
              <span
                class="analytic-table__toggle toggle-icon"
                :data-index="index"
                @click="toggleRow"
              ></span>
              <div class="analytic-metric__info">
                <div class="analytic-metric__title metric-icon">
                  {{ metric.name }}
                </div>
                <div
                  class="analytic-metric__value"
                  :class="
                    metric.colors && metric.main?.sum !== null
                      ? metric.main?.sum > (metric.colors.green || metric.colors.yellow)
                        ? 'green'
                        : metric.main?.sum > metric.colors.red
                          ? 'yellow'
                          : 'red'
                      : ''
                  "
                >
                  {{
                    metric.main?.sum
                      ? metric.main?.sum.toLocaleString("ru-RU") + ` ${metric?.units || ""}`
                      : `0 ${metric?.units || ""}`
                  }}
                </div>
              </div>
            </div>
            <div 
              ref="managerList" 
              :data-index="index" 
              class="analytic__managers-list"
            >
              <h2 class="analytic-main__title">
                Список менеджеров
              </h2>
              <div 
                v-for="(manager, count) of managers" 
                :key="count"
                class="analytic-main__manager"
              >
                <div class="analytic-manager__name metric-icon">
                  {{ manager.name }}
                </div>
                <div
                  class="analytic-manager__value"
                  :class="
                    metric.colors && metric.managers[count]?.sum
                      ? metric.managers[count]?.sum > metric.colors.green || item.colors.yellow
                        ? 'green'
                        : metric.managers[count]?.sum > metric.colors.red
                          ? 'yellow'
                          : 'red'
                      : ''
                  "
                >
                  {{
                    metric.managers
                      ? `${metric.managers[count]?.sum?.toLocaleString("ru-RU") || "0"} ${
                        metric.units || ""
                      }` || `0 ${metric.units || ""}`
                      : `0 ${metric.units || ""}`
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="analytic-table__right">
        <div class="analytic-right__header">
          <div 
            v-for="(item, index) of periodItems" 
            :key="index"
            class="analytic-table__column"
          > 
            {{ item }}
          </div>
        </div>
        <div class="analytic-period">
          <div 
            v-for="(item, index) of rows" 
            :key="index"
            class="analytic-period__row" 
          >
            <div class="analytic-period__main">
              <div
                v-for="(elem, count) of item.main?.sums"
                :key="count"
                class="analytic-period__column"
                :class="
                  item.colors && elem
                    ? elem > item.colors.green || item.colors.yellow
                      ? 'green'
                      : elem > item.colors.red
                        ? 'yellow'
                        : 'red'
                    : ''
                "
              >
                {{
                  elem
                    ? elem === 0
                      ? ""
                      : `${elem.toLocaleString("ru-RU")} ${item.units || ""}`
                    : ""
                }}
              </div>
            </div>
            <div ref="managersPeriod" :data-index="index" class="analytic-period__managers">
              <div
                v-for="(elem, count) of item.managers"
                :key="count"
                class="analytic-period__manager"
              >
                <div
                  v-for="(el, counter) of elem.sums"
                  :key="counter"
                  class="analytic-period__column"
                  :class="
                    item.colors && el
                      ? el > item.colors.green || item.colors.yellow
                        ? 'green'
                        : el > item.colors.red
                          ? 'yellow'
                          : 'red'
                      : ''
                  "
                >
                  {{ el ? el.toLocaleString("ru-RU") + " " + (item.units || "") : "" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// styles
import "./AnalyticTable.scss";

// store
import { analyticFilterStore } from "../AnalyticStore/AnalyticFilterStore/AnalyticFilterStore.js";
import { storeToRefs, mapActions } from "pinia";

const store = analyticFilterStore();

const { getRows, getPeriodProps, analyticData } = storeToRefs(store);
const { setInitialValues, setSearchValue } = mapActions(analyticFilterStore, [
  "setInitialValues",
  "setSearchValue",
]);

export default {
  async setup() {
    const timer = await new Promise((res) => {
      setTimeout(() => {
        res();
      }, 400);
    });

    return {
      getRows,
      analyticData,
      getPeriodProps,
      setInitialValues,
      setSearchValue,
    };
  },
  data() {
    return {
      rows: null,
    };
  },
  created() {
    const { path } = this.$route;

    this.setInitialValues(path);

    this.rows = this.getRows;

    this.periodItems = this.getPeriodProps;
    this.managers = this.analyticData.managers;
    this.currentIndex = this.analyticData.currentIndex;
  },
  methods: {
    toggleRow(e) {
      const t = e.target;
      t.classList.toggle("open");

      const currentIndex = +t.getAttribute("data-index");

      const { managerList, managersPeriod } = this.$refs;

      const currentList = managerList.find((el) => +el.getAttribute("data-index") === currentIndex);
      const currentPeriod = managersPeriod.find(
        (el) => +el.getAttribute("data-index") === currentIndex
      );

      currentList.classList.toggle("open");
      currentPeriod.classList.toggle("open");

      if (currentList.classList.contains("open")) {
        currentList.style.height = (this.analyticData.managers.length + 1) * 40 + 20 + "px";
        currentList.style.maxHeight = (this.analyticData.managers.length + 1) * 40 + 20 + "px";
        currentPeriod.style.height = this.analyticData.managers.length * 40 + 30 + "px";
        currentPeriod.style.maxHeight = this.analyticData.managers.length * 40 + 30 + "px";
      } else {
        currentList.style.height = "0px";
        currentList.style.maxHeight = "0px";
        currentPeriod.style.height = "0px";
        currentPeriod.style.maxHeight = "0px";
      }
    },
    metricksSearch(e) {
      const { searchColumn } = this.$refs;
      const t = e.target;
      const value = t.value;

      if (value) {
        searchColumn.classList.add("active");
      } else {
        searchColumn.classList.remove("active");
      }

      this.setSearchValue(value);
      this.rows = this.getRows;
    },
  },
};
</script>
