<template>
  <div class="monitor-stat">
    <div class="monitor-stat__header stat-header">
      <div class="state-header__left">
        <p class="stat-header__sort" />
        <select class="monitor-select__stat" />
      </div>
      <span class="stat-header__tooltip tooltip">
        <span class="tooltip__wrapper" />
      </span>
    </div>
    <div class="monitor-stat__wrapper">
      <div class="monitor-stat__header">
        <div class="monitor-stat__count" />
        <div class="monitor-stat__manager">
          Менеджер
        </div>
        <div class="monitor-stat__reward">
          Награды
        </div>
        <div class="monitor-stat__application">
          Заказы
        </div>
        <div class="monitor-stat__payment">
          Продажи
        </div>
        <div class="monitor-stat__revenue">
          Выручка
        </div>
        <div class="monitor-stat__left">
          Осталось
        </div>
        <div class="monitor-stat__prediction">
          Прогнозы
        </div>
        <div class="monitor-stat__deviation">
          Отклонение
        </div>
      </div>
      <div
        v-for="(item, index) of data"
        :key="index"
        class="monitor-stat__row"
      >
        <div class="monitor-stat__count">
          {{ ++index }}
        </div>
        <div class="monitor-stat__manager manager">
          <div
            v-if="item.manager.avatar"
            class="manager__avatar"
          >
            <div class="manager-avatar__tooltip">
              <img
                :src="'/' + item.manager.avatar"
                alt="managers-avatar"
              >
            </div>
            <img
              :src="'/' + item.manager.avatar"
              alt="managers-avatar"
            >
          </div>
          <div v-else>
            <img
              src="/"
              alt="managers-avatar"
            >
          </div>
          <div class="manager__info manager-info">
            <p class="manager-info__name">
              {{ item.manager.name }}
            </p>
            <p class="manager-info__rating">
              {{ item.manager.currentScore }}
            </p>
          </div>
        </div>
        <div class="monitor-stat__reward reward">
          <div class="rewards-tooltip tooltip">
            <ul
              v-if="item.bonuses.length"
              class="reward__list tooltip__wrapper"
            >
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
          <div
            class="order-wrapper"
            :class="[item.bill.type, { 'active': item.bill.plan !== null }]"
          >
            <span class="order-wrapper__value">
              {{ item.bill.value }}
            </span>
            <span class="order-wrapper__value">
              {{ item.bill.plan }}
            </span>
          </div>
          {{ item.bill.percent + ' %' }}
        </div>
        <div class="monitor-stat__payment payment">
          <div
            class="payment-wrapper"
            :class="[item.sale.type, { 'active': item.sale.plan !== null }]"
          >
            <span class="payment-wrapper__value">
              {{ item.sale.value + ' ₽' || '0 ₽' }}
            </span>
            <span class="payment-wrapper__value">
              {{ item.sale.plan + ' ₽' || '0 ₽' }}
            </span>
          </div>
          {{ item.sale.percent + ' %' }}
        </div>
        <div class="monitor-stat__revenue">
          <div
            class="revenue-wrapper"
            :class="[item.proceed.type, { 'active': item.proceed.value }]"
          >
            <span class="revenue-wrapper__value">
              {{ item.proceed.value + ' ₽' || '0 ₽' }}
            </span>
            <span
              v-if="item.proceed.message !== '—'"
              class="revenue-wrapper__value"
            >
              {{ item.proceed.plan + ' ₽' || '0 ₽' }}
            </span>
          </div>
          {{ item.proceed.percent + ' %' || '0 %' }}
        </div>
        <div class="monitor-stat__left left-wrapper">
          <span class="left-wrapper__text">{{ (item.proceedLeft.plan || 0) + ' ₽' || '0 ₽' }}</span>
        </div>
        <div class="monitor-stat__prediction">
          <div v-if="item.prediction.message.match('[-+]?[0-9]*') && filter.period === 4">
            {{ item.prediction.plan + ' ₽' || '0 ₽' }}
          </div>
          <div else>
            Нет
          </div>
        </div>
        <div class="monitor-stat__deviation deviation">
          <div
            class="deviation-wrapper"
            :class="item.deviation.type"
          >
            <div v-if="item.deviation.message.match('[-+]?[0-9]*')">
              {{ (item.deviation.plan || 0) + ' ₽' || '0 ₽' }}
            </div>
            <div v-else>
              <span v-if="item.deviation.message !== '—'">
                {{ (item.deviation.plan || 0) + ' ₽' || 'O ₽' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './ManagerStat.scss';

import { statMonitor } from '@/store/store';

const store = statMonitor();

const { filter, data } = store;

export default {
  setup() {
    return {
      filter,
      data,
    };
  }
}
</script>
