<template>
  <li class="modal-content__item">
    <p class="modal-content__name funnel-colors__title">
      Цвет показателей
    </p>
  </li>
  <li class="modal-content__item funnel-colors__name">
    <p class="modal-content__name pl_0">
      Рейтинг
    </p>
  </li>
  <li class="modal-content__item">
    <ul class="funnel-colors__list">
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Зеленый
        </p>
        <input
          type="text"
          :value="ratingColors.green"
          name="lineColors[0].green"
          autocomplete="off"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Желтый
        </p>
        <input
          name="lineColors[0].yellow"
          :value="ratingColors.yellow"
          type="text"
          autocomplete="off"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Красный
        </p>
        <input
          name="lineColors[0].red"
          :value="ratingColors.red"
          type="text"
          autocomplete="off"
          class="modal-content__input funnel-colors__input"
        />
      </li>
    </ul>
  </li>
  <li class="modal-content__item funnel-colors__name">
    <p class="modal-content__name pl_0">
      Кпд
    </p>
  </li>
  <li class="modal-content__item">
    <ul class="funnel-colors__list">
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Зеленый
        </p>
        <input
          name="lineColors[1].green"
          :value="kpdColors.green"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Желтый
        </p>
        <input
          name="lineColors[1].yellow"
          :value="kpdColors.yellow"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Красный
        </p>
        <input
          name="lineColors[1].red"
          :value="kpdColors.red"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
    </ul>
  </li>
  <li class="modal-content__item funnel-colors__name">
    <p class="modal-content__name pl_0">
      % чистой выручки
    </p>
  </li>
  <li class="modal-content__item">
    <ul class="funnel-colors__list">
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Зеленый
        </p>
        <input
          name="lineColors[2].green"
          :value="proceedsColors.green"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Желтый
        </p>
        <input
          name="lineColors[2].yellow"
          :value="proceedsColors.yellow"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Красный
        </p>
        <input
          name="lineColors[2].red"
          :value="proceedsColors.red"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
    </ul>
  </li>
  <li class="modal-content__item funnel-colors__name">
    <p class="modal-content__name pl_0">
      % продаж с рассылки
    </p>
  </li>
  <li class="modal-content__item">
    <ul class="funnel-colors__list">
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Зеленый
        </p>
        <input
          name="lineColors[3].green"
          :value="mailingColors.green"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Желтый
        </p>
        <input
          name="lineColors[3].yellow"
          :value="mailingColors.yellow"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
      <li class="funnel-colors__item">
        <p class="modal-content__name">
          Красный
        </p>
        <input
          name="lineColors[3].red"
          :value="mailingColors.red"
          autocomplete="off"
          type="text"
          class="modal-content__input funnel-colors__input"
        />
      </li>
    </ul>
  </li>
</template>

<script>
// styles
import "./FunnelColorSettings.scss";

// store
import { funnelSettingsStore } from "./FunnelStore/FunnelStore";

const store = funnelSettingsStore();

const { filter } = store;

export default {
  setup() {
    return {
      filter,
    };
  },
  created() {
    const [ratingColors, kpdColors, proceedsColors, mailingColors] = this.filter.lineColors;

    this.ratingColors = ratingColors;
    this.kpdColors = kpdColors;
    this.proceedsColors = proceedsColors;
    this.mailingColors = mailingColors;
  },
};
</script>
