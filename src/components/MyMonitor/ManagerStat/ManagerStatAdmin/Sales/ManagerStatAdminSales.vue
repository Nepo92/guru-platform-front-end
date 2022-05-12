<template>
  <div v-for="(item, index) of props.data" :key="index" class="monitor-stat__row">
    <div class="monitor-stat__count count">
      {{ ++index }}
    </div>
    <div class="monitor-stat__manager manager">
      <div class="manager__avatar" :class="{ tooltip: item.manager.avatar }">
        <div v-if="item.manager.avatar" class="manager-avatar__tooltip tooltip__wrapper">
          <img ref="avatarBig" :src="'/' + item.manager.avatar" />
        </div>
        <div class="manager-avatar__wrapper">
          <img
            ref="avatarSmall"
            :class="!item.manager.avatar ? 'manager-avatar__default' : ''"
            :src="item.manager.avatar ? '/' + item.manager.avatar : ' '"
          />
        </div>
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
      <div class="rewards-tooltip" :class="{ tooltip: item.bonuses?.length > 0 }">
        <ul v-if="item.bonuses?.length" class="reward__list tooltip__wrapper">
          <li
            v-for="(elem, count) of item.bonuses"
            :key="count"
            class="reward__item"
            :class="elem.bonusType"
          >
            {{ elem.name }}
          </li>
        </ul>
        {{ item.bonuses?.length }}
      </div>
    </div>
    <div class="monitor-stat__order order">
      <div
        class="order-wrapper"
        :class="[item.bill?.type, { tooltip: item.bill?.value > 1000 || item.bill?.plan > 1000 }]"
      >
        <div v-if="item.bill?.value > 1000 || item.bill?.plan > 1000" class="tooltip__wrapper">
          {{ item.bill?.value?.toLocaleString("ru-RU") || "0" }} /
          {{ item.bill?.plan?.toLocaleString("ru-RU") || "0" }}
        </div>

        <span ref="orderValue" class="order-wrapper__value">
          {{ item.bill?.value?.toLocaleString("ru-RU") || "0" }}
        </span>
        <span
          ref="orderValuePlan"
          class="order-wrapper__plan"
          :class="item.bill?.plan !== null ? 'active' : ''"
        >
          {{ item.bill?.plan?.toLocaleString("ru-RU") || "0" }}
        </span>
      </div>
      {{ item.bill?.percent + " %" }}
    </div>
    <div class="monitor-stat__payment payment">
      <div
        class="payment-wrapper"
        :class="[item.sale?.type, { tooltip: item.sale?.value > 1000 || item.sale?.plan > 1000 }]"
      >
        <div v-if="item.sale?.value > 1000 || item.sale?.plan > 1000" class="tooltip__wrapper">
          {{ item.sale?.value?.toLocaleString("ru-RU") || "0" }} /
          {{ item.sale?.plan?.toLocaleString("ru-RU") || "0" }}
        </div>

        <span class="payment-wrapper__value">
          {{ item.sale?.value?.toLocaleString("ru-RU") || "0" }}
        </span>
        <span class="payment-wrapper__plan" :class="item.sale?.plan !== null ? 'active' : ''">
          {{ item.sale?.plan?.toLocaleString("ru-RU") || "0" }}
        </span>
      </div>
      {{ item.sale?.percent + " %" }}
    </div>
    <div class="monitor-stat__revenue revenue">
      <div class="revenue-wrapper" :class="item.proceed?.type">
        <span class="revenue-wrapper__value">
          {{ (item.proceed?.value?.toLocaleString("ru-RU") || 0) + " ₽" || "0 ₽" }}
        </span>
        <span
          v-if="item.proceed?.message !== '—'"
          class="revenue-wrapper__plan"
          :class="item.proceed?.value ? 'active' : ''"
        >
          {{ (item.proceed?.plan?.toLocaleString("ru-RU") || 0) + " ₽" || "0 ₽" }}
        </span>
      </div>
      {{ item.proceed?.percent + " %" || "0 %" }}
    </div>
    <div class="monitor-stat__left left-wrapper left">
      <span class="left-wrapper__text">{{
        (item.proceedLeft?.plan?.toLocaleString("ru-RU") || 0) + " ₽" || "0 ₽"
      }}</span>
    </div>
    <div class="monitor-stat__prediction prediction">
      <div v-if="item.prediction?.message.match('[-+]?[0-9]*') && props.filter.period === 4">
        {{ (item.prediction?.plan?.toLocaleString("ru-RU") || 0) + " ₽" || "0 ₽" }}
      </div>
      <div v-else>Нет</div>
    </div>
    <div class="monitor-stat__deviation deviation">
      <div class="deviation-wrapper" :class="item.deviation?.type">
        <div v-if="item.deviation?.message.match('[-+]?[0-9]*')">
          {{ (item.deviation.plan?.toLocaleString("ru-RU") || 0) + " ₽" || "0 ₽" }}
        </div>
        <div v-else>
          <span v-if="item.deviation?.message !== '—'">
            {{ (item.deviation?.plan?.toLocaleString("ru-RU") || 0) + " ₽" || "O ₽" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./ManagerStatAdminSales.scss";
import ImageUtils from "@/utils/ImageUtils/ImageUtils.js";

const imageUtils = new ImageUtils();

export default {
  props: ["props"],
  mounted() {
    const { avatarBig, avatarSmall } = this.$refs;

    if (avatarBig?.length) {
      imageUtils.adaptivePhotos(avatarBig);
    }

    if (avatarSmall?.length) {
      imageUtils.adaptivePhotos(avatarSmall);
    }
  },
};
</script>
