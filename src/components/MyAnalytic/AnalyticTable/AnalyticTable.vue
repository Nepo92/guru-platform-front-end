<template>
  <div class="analytic-content__table">
    <div class="analytic-table__header">
      <div class="analytic-table__search searc-icon">
        <input class="analytic-table__input" placeholder="Метрики" type="text" />
      </div>
      <div class="analytic-table__column">Итого</div>
    </div>
    <div class="analytic-table__wrapper">
      <div class="analytic-metric">
        <div v-for="(metric, index) of rows" :key="index">
          <div class="analytic-metric__info">
            <div class="analytic-metric__title">
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
import { analyticTableStore } from "./AnalyticTableStore/AnalyticTableStore.js";
import { mapActions, storeToRefs } from "pinia";

const store = analyticTableStore();

const { colors, getCurrentRows, managers, getPeriod } = storeToRefs(store);
const { setInitialValues } = mapActions(analyticTableStore, ["setInitialValues"]);

export default {
  setup() {
    return {
      colors,
      getCurrentRows,
      setInitialValues,
      managers,
      getPeriod,
    };
  },
  created() {
    const { path } = this.$route;

    this.setInitialValues(path);

    this.rows = this.getCurrentRows.items;
    this.period = this.getPeriod;
  },
};
</script>
