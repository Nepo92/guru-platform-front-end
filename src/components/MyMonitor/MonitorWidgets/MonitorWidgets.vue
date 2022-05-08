<template>
  <ul class="widgets">
    <li
      v-for="(item, index) of widgetsData"
      :key="index"
      class="widgets__item"
      :class="setItemClass(item)"
    >
      <span class="widgets__tooltip tooltip">
        <span class="widgets-tooltip__wrapper tooltip__wrapper">{{ item.description }}</span>
        ?
      </span>
      <p
        class="widgets__name"
        :title="item.name"
        :class="item.nameEng"
      >
        <span class="widgets-name__text">
          {{ item.name }}
        </span>
      </p>
      <p class="widgets__count">
        {{ item.value }}
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
            :class="item.percent > item.metric.green ? 'green' : item.metric.yellow > 69 ? 'yellow' : 'red'"
            :style="{ width: item.percent + '%' }"
          />
          <p class="widgets-progress__value">
            {{ item.percent + ' %' }}
          </p>
        </div>
        <div class="widgets-progress__plan">
          План
          <span class="widgets-progress__plan--value">{{ item.plan || 0 }} {{ setItemName(item) }}</span>
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

<script>
import './MonitorWidgets.scss';
import '@/assets/scss/tooltip.scss';
import { monitorWidgets } from '@/store/store';

const store = monitorWidgets();

const { tiles, widgetsData, filter } = store;

export default {
  setup() {
    return {
      tiles,
      widgetsData,
      filter,
    };
  },
  methods: {
    setItemName(item) {
      const isOrder = item.nameEng === 'order' ? 'заказов' : false;
      const isApplication = item.nameEng === 'application' ? 'заявок' : false;
      const isSale = item.nameEng === 'sales' ? 'оплат' : false;
      const isRevenue = item.nameEng === 'revenue' ? '₽' : false;
      const isPrediction = item.nameEng === 'prediction' ? '₽' : false;

      return isOrder || isApplication || isSale || isRevenue || isPrediction;
    },
    setItemClass(item) {
      const isPrediction = item.nameEng === 'prediction' ? item.value > 100 ? 'green' : 'red' : false;
      const worst = item.value > 120 ? 'black' : false;
      const complete = item.value >= 100 ? 'green' : false;

      return isPrediction || worst || complete;
    },
  },
}
</script>
