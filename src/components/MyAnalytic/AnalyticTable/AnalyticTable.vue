<template>
  <div class="analytic-content__table custom-scroll">
    <div class="analytic-table__header">
      <div class="analytic-header__metric">
        <div class="analytic-table__search search-icon">
          <input class="analytic-table__input" placeholder="Метрики" type="text" />
        </div>
        <div class="analytic-table__column">Итого</div>
      </div>
      <div class="analytic-header__period">
        <div class="analytic-table__column" v-for="(item, index) of periodItems" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="analytic-table__wrapper">
      <div class="analytic-metric">
        <div class="analytic-metric__row" v-for="(metric, index) of rows" :key="index">
          <div class="analytic-metric__info">
            <div class="analytic-metric__title metric-icon">
              {{ metric.name }}
            </div>
            <div class="analytic-metric__value">
              {{
                metric.main?.sum
                  ? metric.main?.sum.toLocaleString("ru-RU") + ` ${metric?.units || ""}`
                  : `0 ${metric?.units || ""}`
              }}
            </div>
          </div>
          <div class="analytic__managers-list">
            <div class="analytic-main__manager" v-for="(manager, count) of managers" :key="count">
              <div class="analytic-manager__name">{{ manager.name }}</div>
              <div class="analytic-manager__value">
                {{
                  manager.managers
                    ? `${manager?.managers[count]?.sum || "0"} ${manager.units || ""}` ||
                      `0 ${manager.units || ""}`
                    : `0 ${manager.units || ""}`
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="analytic-period"></div>
    </div>
  </div>
</template>

<script>
// styles
import "./AnalyticTable.scss";

// store
import { analyticFilterStore } from "../AnalyticFilterStore/AnalyticFilterStore.js";
import { storeToRefs, mapActions } from "pinia";

const store = analyticFilterStore();

const { colors, getCurrentRows, managers, getPeriodProps } = storeToRefs(store);
const { setInitialValues } = mapActions(analyticFilterStore, ["setInitialValues"]);

export default {
  async setup() {
    const timer = await new Promise((res) => {
      setTimeout(() => {
        res();
      }, 400);
    });

    return {
      colors,
      getCurrentRows,
      managers,
      getPeriodProps,
      setInitialValues,
    };
  },
  created() {
    const { path } = this.$route;

    this.setInitialValues(path);

    this.rows = this.getCurrentRows[0]?.items;
    this.periodItems = this.getPeriodProps;

    console.log(this.periodItems);
  },
};
</script>
