<template>
  <div class="monitor-stat">
    <div class="monitor-stat__header stat-header">
      <div class="stat-header__left">
        <p class="stat-header__sort stat-header__icon">Рейтинг</p>
        <select class="monitor-select__stat">
          <option
            v-for="(item, index) of managerStat"
            :selected="filter.rowSortType === item.value"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <span class="stat-header__tooltip tooltip">
        <span class="stat-tooltip__wrapper tooltip__wrapper"
          >Общий монитор продаж с ранжированием по выбранному критерию
        </span>
        ?
      </span>
    </div>
    <div class="monitor-stat__wrapper">
      <div class="monitor-stat__header-row">
        <div class="monitor-stat__count" />
        <div class="monitor-stat__manager">Менеджер</div>
        <div class="monitor-stat__reward">Награды</div>
        <div class="monitor-stat__application">Заказы</div>
        <div class="monitor-stat__payment">Продажи</div>
        <div class="monitor-stat__revenue">Выручка</div>
        <div class="monitor-stat__left">Осталось</div>
        <div class="monitor-stat__prediction">Прогнозы</div>
        <div class="monitor-stat__deviation">Отклонение</div>
      </div>
      <div v-for="(item, index) of data" :key="index" class="monitor-stat__row">
        <div class="monitor-stat__count count">
          {{ ++index }}
        </div>
        <div class="monitor-stat__manager manager">
          <div class="manager__avatar tooltip">
            <div v-if="item.manager.avatar" class="manager-avatar__tooltip tooltip__wrapper">
              <img ref="avatarBig" :src="'/' + item.manager.avatar" />
            </div>
            <img
              ref="avatarSmall"
              :class="!item.manager.avatar ? 'manager-avatar__default' : ''"
              :src="'/' + item.manager.avatar"
            />
          </div>
          <div class="manager__info manager-info">
            <p class="manager-info__name">
              {{ item.manager.name }}
            </p>
            <p class="manager-info__rating manager-rating__icon">
              <span class="manager-rating__text">{{ item.manager.currentScore }}</span>
            </p>
          </div>
        </div>
        <div class="monitor-stat__reward reward">
          <div class="rewards-tooltip tooltip">
            <ul v-if="item.bonuses.length" class="reward__list tooltip__wrapper">
              <li
                v-for="(elem, count) of item.bonuses"
                :key="count"
                class="reward__item"
                :class="elem.bonusType"
              >
                {{ elem.name }}
              </li>
            </ul>
            {{ item.bonuses.length }}
          </div>
        </div>
        <div class="monitor-stat__order">
          <div class="order-wrapper" :class="[item.bill.type, { active: item.bill.plan !== null }]">
            <span class="order-wrapper__value">
              {{ item.bill.value }}
            </span>
            <span class="order-wrapper__value">
              {{ item.bill.plan }}
            </span>
          </div>
          {{ item.bill.percent + " %" }}
        </div>
        <div class="monitor-stat__payment payment">
          <div
            class="payment-wrapper"
            :class="[item.sale.type, { active: item.sale.plan !== null }]"
          >
            <span class="payment-wrapper__value">
              {{ item.sale.value + " ₽" || "0 ₽" }}
            </span>
            <span class="payment-wrapper__value">
              {{ item.sale.plan + " ₽" || "0 ₽" }}
            </span>
          </div>
          {{ item.sale.percent + " %" }}
        </div>
        <div class="monitor-stat__revenue">
          <div class="revenue-wrapper" :class="[item.proceed.type, { active: item.proceed.value }]">
            <span class="revenue-wrapper__value">
              {{ item.proceed.value + " ₽" || "0 ₽" }}
            </span>
            <span v-if="item.proceed.message !== '—'" class="revenue-wrapper__value">
              {{ item.proceed.plan + " ₽" || "0 ₽" }}
            </span>
          </div>
          {{ item.proceed.percent + " %" || "0 %" }}
        </div>
        <div class="monitor-stat__left left-wrapper">
          <span class="left-wrapper__text">{{ (item.proceedLeft.plan || 0) + " ₽" || "0 ₽" }}</span>
        </div>
        <div class="monitor-stat__prediction">
          <div v-if="item.prediction.message.match('[-+]?[0-9]*') && filter.period === 4">
            {{ item.prediction.plan + " ₽" || "0 ₽" }}
          </div>
          <div else>Нет</div>
        </div>
        <div class="monitor-stat__deviation deviation">
          <div class="deviation-wrapper" :class="item.deviation.type">
            <div v-if="item.deviation.message.match('[-+]?[0-9]*')">
              {{ (item.deviation.plan || 0) + " ₽" || "0 ₽" }}
            </div>
            <div v-else>
              <span v-if="item.deviation.message !== '—'">
                {{ (item.deviation.plan || 0) + " ₽" || "O ₽" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./ManagerStat.scss";

import { statMonitor } from "@/store/store";

const store = statMonitor();

const { filter, data, managerStat } = store;

export default {
  setup() {
    return {
      filter,
      data,
      managerStat,
    };
  },
  mounted() {
    const { avatarBig, avatarSmall } = this.$refs;

    avatarBig.forEach((element) => {
      element.style.width = "auto";
      element.style.height = "auto";

      const figure = element.style.width / element.style.height;
      const rectangle = figure > 1 ? "rectangle" : false;
      const square = figure === 1 ? "square" : false;
      const verticalRectangle = figure < 1 ? "vertical-rectangle" : false;

      const figureItem = rectangle || square || verticalRectangle;
      const imageSize = this.getImageSize();

      const current = imageSize.find((el) => el.figure === figureItem);
    });
  },
  methods: {
    get getImageSize() {
      return [
        {
          figure: "rectangle",
          size: "width: 100%; height: auto",
        },
        {
          figure: "square",
          size: "width: 100%, height: 100%",
        },
        {
          figure: "vertical-rectangle",
          size: "width: auto, height: 100%",
        },
      ];
    },
  },
};
</script>
