<template>
  <div class="analytic-content__container">
    <div class="analytic-content__table">
      <div class="analytic-table__left">
        <div class="analytic-left__header">
          <div ref="searchColumn" class="analytic-table__search search-icon">
            <input
              v-model="searchRow"
              class="analytic-table__input"
              placeholder="Метрики"
              type="text"
            />
          </div>
          <div class="analytic-table__column">Итого</div>
        </div>
        <div class="analytic-metric">
          <div
            v-for="(metric, index) of currentRows"
            :key="index"
            ref="metricRow"
            class="analytic-metric__row"
          >
            <div class="analytic-metric__nav">
              <span
                class="analytic-table__toggle toggle-icon"
                :data-index="index"
                @click="(e) => toggleRow(e)"
              ></span>
              <div class="analytic-metric__info">
                <div class="analytic-metric__title metric-icon">
                  {{ metric.name }}
                </div>
                <div
                  class="analytic-metric__value"
                  :class="
                    metric.colors && metric.main?.sum !== null
                      ? metric.main?.sum >
                        (metric.colors.green || metric.colors.yellow)
                        ? 'green'
                        : metric.main?.sum > metric.colors.red
                        ? 'yellow'
                        : 'red'
                      : ''
                  "
                >
                  {{
                    metric.main?.sum
                      ? metric.main?.sum.toLocaleString("ru-RU") +
                        ` ${metric?.units || ""}`
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
              <div class="managers-list__wrapper">
                <h2 class="analytic-main__title">Список менеджеров</h2>
                <div
                  v-for="(manager, count) of managers"
                  :key="count"
                  class="analytic-main__manager"
                >
                  <div class="analytic-manager__name metric-icon">
                    {{ manager.name }}
                  </div>
                  <div class="analytic-manager__value">
                    {{
                      metric.managers
                        ? `${
                            metric.managers[count]?.sum?.toLocaleString(
                              "ru-RU"
                            ) || "0"
                          } ${metric.units || ""}` || `0 ${metric.units || ""}`
                        : `0 ${metric.units || ""}`
                    }}
                  </div>
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
            v-for="(item, index) of currentRows"
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
              <div v-if="!item.main?.sums" class="analytic-period__main">
                <div
                  v-for="(elem, count) of periodLength"
                  :key="count"
                  class="analytic-period__column"
                ></div>
              </div>
            </div>
            <div
              ref="managersPeriod"
              :data-index="index"
              class="analytic-period__managers"
            >
              <div class="analytic-period__wrapper">
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
                    {{
                      el
                        ? el.toLocaleString("ru-RU") + " " + (item.units || "")
                        : ""
                    }}
                  </div>
                </div>
                <div v-if="!item.managers">
                  <div
                    v-for="(elem, count) of managersCounter"
                    :key="count"
                    class="analytic-period__manager"
                  >
                    <div
                      v-for="(el, counter) of periodLength"
                      :key="counter"
                      class="analytic-period__column"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "./AnalyticTable.scss";
import { analyticStore } from "../analyticStore/analyticStore";
import { defineComponent, InputHTMLAttributes, ref } from "vue";
import AnalyticTableUtils from "./AnalyticTableUtils/AnalyticTableUtils";
import {
  iAnalyticRow,
  iCurrentAnalytic,
} from "./interfacesAnalyticTable/interfacesAnalyticTable";

const analyticTableUtils = new AnalyticTableUtils();

export default defineComponent({
  props: {
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
    periodSeparate: {
      type: Number,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let searchColumn = ref({} as HTMLElement);
    let searchRow = ref("");
    let currentRows = ref([] as Array<iAnalyticRow>);
    let periodItems = ref([] as Array<unknown>);
    let managerList = ref([] as Array<HTMLElement>);
    let managersPeriod = ref([] as Array<HTMLElement>);
    let periodLength = ref(1);
    let start = ref(props.start);
    let periodSeparate = ref(props.periodSeparate);

    const store = analyticStore();

    const { analyticData, months, filter } = store;
    const { rows, colors } = analyticData;

    const managersCounter = analyticData.managers.length;

    const currentRowsProps = {
      searchRow,
      rows: rows as Array<iCurrentAnalytic>,
      activeTab: props.activeTab,
      colors,
      visibleSettings: filter.visibleSettings,
    };

    currentRows.value = <Array<iAnalyticRow>>(
      analyticTableUtils.getCurrentRows(currentRowsProps)
    );

    const periodItemsProps = {
      start: start.value,
      periodSeparate: periodSeparate.value,
      currentRows,
      months,
    };

    periodItems.value = <Array<string>>(
      analyticTableUtils.getPeriodItems(periodItemsProps)
    );

    const managers = analyticData.managers;

    const toggleRow = (e: MouseEvent) => {
      const t = <HTMLInputElement>e.target;
      (t as HTMLElement).classList.toggle("open");

      const index = t.getAttribute("data-index");
      const currentIndex = index !== null ? +index : undefined;

      const currentList = managerList.value.find((el) => {
        if (currentIndex !== undefined) {
          const currentList = el.getAttribute("data-index");

          const rowIndex = currentList !== null ? +currentList : undefined;

          if (rowIndex !== undefined && rowIndex === currentIndex) {
            return el;
          }
        }
      });
      const currentPeriod = managersPeriod.value.find((el) => {
        if (currentIndex !== undefined) {
          const currentPeriod = el.getAttribute("data-index");

          const periodIndex =
            currentPeriod !== null ? +currentPeriod : undefined;

          if (periodIndex !== undefined && periodIndex === currentIndex) {
            return el;
          }
        }
      });

      currentList?.classList.toggle("open");
      currentPeriod?.classList.toggle("open");

      if (currentList?.classList.contains("open")) {
        if (currentList) {
          currentList.style.height = (managers.length + 1) * 40 + 20 + "px";
          currentList.style.maxHeight = (managers.length + 1) * 40 + 20 + "px";
        }

        if (currentPeriod) {
          currentPeriod.style.height = managers.length * 40 + 60 + "px";
          currentPeriod.style.maxHeight = managers.length * 40 + 60 + "px";
        }
      } else {
        if (currentList) {
          currentList.style.maxHeight = "0";
        }

        if (currentPeriod) {
          currentPeriod.style.maxHeight = "0";
        }
      }
    };

    const metricksSearch = (e: MouseEvent) => {
      const t = e.target;
      const value = (t as InputHTMLAttributes).value;

      if (value) {
        searchColumn.value.classList.add("active");
      } else {
        searchColumn.value.classList.remove("active");
      }
    };

    periodLength.value = analyticTableUtils.getPeriodLength;

    return {
      searchRow,
      currentRows,
      periodItems,
      toggleRow,
      managers,
      metricksSearch,
      managerList,
      managersPeriod,
      periodLength,
      managersCounter,
    };
  },
});
</script>
