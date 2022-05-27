<template>
  <div
    v-for="(item, index) of props.data"
    :key="index"
    class="monitor-stat__row"
    :class="$route.path === '/monitor-control/' ? 'control' : ''"
  >
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
    <div class="monitor-stat__deal-count deal-count">
      {{ item.dealCount }}
    </div>
    <div class="monitor-stat__rate-count rate-count">
      {{ item.rateCount }}
    </div>
    <div class="monitor-stat__debate-count debate-count">
      {{ item.debateCount }}
    </div>
    <div class="monitor-stat__debate-count-estimation debate-count-estimation">
      {{ item.debateCount }}
    </div>
    <div class="monitor-stat__score score">
      {{ item.score }}
    </div>
  </div>
</template>

<script>
import "./ManagerStatAdminControl.scss";
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
