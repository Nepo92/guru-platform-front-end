<template>
  <ul class="widgets">
    <li
      v-for="(item, index) of currentWidgets"
      :key="index"
      class="widgets__item"
      :class="setItemClass(item)"
    >
      <span class="widgets__tooltip tooltip">
        <span class="widgets-tooltip__wrapper tooltip__wrapper">{{
          item.description
        }}</span>
        ?
      </span>
      <p class="widgets__name" :title="item.name" :class="item.nameEng">
        <span class="widgets-name__text">
          {{ item.name }}
        </span>
      </p>
      <p class="widgets__count" :class="{ tooltip: item.value > 1000000 }">
        <span
          v-if="item.value > 1000000"
          class="
            widgets-tooltip__wrapper widgets-tooltip__wrapper--count
            tooltip__wrapper
          "
        >
          {{
            item.value.toLocaleString("ru-RU") +
            (item.units === "roubles" ? " ₽" : "")
          }}
        </span>
        <span
          class="widgets__count--value"
          :class="{ 'has-tooltip': typeof item.value === 'number' }"
        >
          {{
            typeof item.value === "number"
              ? item.value.toLocaleString("ru-RU") +
                (typeof item.value === "number" && item.units === "roubles"
                  ? " ₽"
                  : "")
              : item.value
          }}
        </span>
      </p>
      <div
        v-if="item.percent !== null && item.percent >= 100"
        class="widgets__complete"
      >
        План выполнен на {{ item.percent }}% !
      </div>
      <div
        v-else-if="item.percent !== null && item.percent < 100"
        class="widgets__progress"
      >
        <div class="widgets-progress">
          <div
            class="widgets-progress__bar"
            :class="
              item.metric
                ? item.percent > item.metric?.green
                  ? 'green'
                  : item.metric.yellow > 69
                  ? 'yellow'
                  : 'red'
                : ''
            "
            :style="{ width: item.percent + '%' }"
          />
          <p class="widgets-progress__value">
            {{ item.percent + " %" }}
          </p>
        </div>
        <div class="widgets-progress__plan">
          План
          <span class="widgets-progress__plan--value">
            {{ item.plan || 0 }} {{ setItemName(item) }}
          </span>
        </div>
      </div>
      <p
        v-else-if="item.percent !== null && item.plan !== null"
        class="widgets__value"
      >
        {{ item.value }}
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
// styles
import "@/assets/scss/tooltip.scss";
import { defineComponent } from "@vue/runtime-core";
import "./MonitorWidgets.scss";

// store
import { monitorWidgets } from "./monitorWidgetsStore/monitorWidgetsStore";

// interfaces
import { iMonitorWidget } from "./interfacesMonitorWidgets/interfacesMonitorWidgets";

const store = monitorWidgets();

export default defineComponent({
  props: {
    activeTab: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const activeTab = <string>props.activeTab;

    const { widgets, filter } = store;

    let currentWidgets: Array<iMonitorWidget>;

    currentWidgets = widgets.filter(
      (el) => el.period.includes(filter.period) && el.tabs?.includes(activeTab)
    );

    const setItemName = (item: iMonitorWidget) => {
      const isOrder = item.nameEng === "order" ? "заказов" : false;
      const isApplication = item.nameEng === "application" ? "заявок" : false;
      const isSale = item.nameEng === "sales" ? "оплат" : false;
      const isRevenue = item.nameEng === "revenue" ? "₽" : false;
      const isPrediction = item.nameEng === "prediction" ? "₽" : false;

      return isOrder || isApplication || isSale || isRevenue || isPrediction;
    };

    const setItemClass = (item: iMonitorWidget) => {
      const isPrediction =
        item.nameEng === "prediction"
          ? item.value > 100
            ? "green"
            : "red"
          : false;
      const worst = item.value > 120 ? "black" : false;
      const complete = item.value >= 100 ? "green" : false;

      return isPrediction || worst || complete;
    };

    return {
      currentWidgets,
      setItemName,
      setItemClass,
    };
  },
});
</script>
