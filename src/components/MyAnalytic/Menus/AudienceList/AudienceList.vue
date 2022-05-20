<template>
  <div
    ref="audienceList"
    class="modal audience"
    @set-communities="setCommunities"
  >
    <div ref="audienceListWrapper" class="modal__wrapper audience__menu">
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">Список аудиторий</h2>
        <span class="modal-header__close" @click="closeMenu" />
      </div>
      <form>
        <ul
          class="
            modal__content
            modal-content__list
            audience__list
            custom-scroll
          "
        >
          <li class="audience__search search-icon">
            <input
              id="search"
              type="text"
              class="audience-search__input"
              placeholder="Введите название"
              autocomplete="off"
            />
          </li>
          <li class="audience__communities">
            <ul class="communities-list__header">
              <li class="communities-list__item bt_0 communities-list__title">
                <div class="communities__checkbox"></div>
                <div class="communities__name">Аудитория</div>
                <div class="communities__link">Ссылка</div>
              </li>
            </ul>
            <ul class="communities-list">
              <li class="communities-list__item">
                <input
                  id="Все аудитории"
                  name="Все аудитории"
                  type="checkbox"
                  class="checkbox"
                />
                <label for="Все аудитории" class="checkbox__label width_100">
                  <span class="communities-list__label">
                    <span class="communities__checkbox">
                      <span class="checkbox__fake" />
                    </span>
                    <span class="communities__name"> Все аудитории </span>
                    <span class="communities__link"></span>
                  </span>
                </label>
              </li>
              <li class="communities-list__item">
                <input
                  id="Неизвестно"
                  name="Неизвестно"
                  type="checkbox"
                  class="checkbox"
                />
                <label for="Неизвестно" class="checkbox__label width_100">
                  <span class="communities-list__label">
                    <span class="communities__checkbox">
                      <span class="checkbox__fake" />
                    </span>
                    <span class="communities__name"> Неизвестно </span>
                    <span class="communities__link"></span>
                  </span>
                </label>
              </li>
              <li
                v-for="(item, index) of props"
                :key="index"
                class="communities-list__item"
              >
                <input
                  :id="index"
                  :name="item.name"
                  type="checkbox"
                  class="checkbox"
                />
                <label :for="index" class="checkbox__label width_100">
                  <span class="communities-list__label">
                    <span class="communities__checkbox">
                      <span class="checkbox__fake" />
                    </span>
                    <span class="communities__name">
                      {{ item.name }}
                    </span>
                    <span class="communities__link">
                      {{ item.link }}
                    </span>
                  </span>
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>
<!-- th:action="@{/funnel/traffic/communities/}" -->
                <!-- th:object="${filter}" -->
                <!-- th:method="post" -->
<script>
// styles
import "./AudienceList.scss";

// utils
import MenuUtils from "@/utils/MenuUtils/MenuUtils.js";

import "@/assets/scss/grid.scss";

const menuUtils = new MenuUtils();

export default {
  props: ["props"],
  emits: ["create-tab-settings-menu"],
  mounted() {
    this.$emit("create-tab-settings-menu", {
      menuSettings: {
        menu: this.$refs.audienceList,
        wrapper: this.$refs.audienceListWrapper,
      },
    });
  },
  methods: {
    closeMenu() {
      const closeMenuProps = {
        menu: this.$refs.audienceList,
        wrapper: this.$refs.audienceListWrapper,
        isOverflowed: true,
      };

      menuUtils.closeMenu(closeMenuProps);
    },
    setCommunities(props) {
      console.log(props);
    },
  },
};
</script>
