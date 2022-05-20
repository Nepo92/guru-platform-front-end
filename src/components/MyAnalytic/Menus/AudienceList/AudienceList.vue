<template>
  <div ref="audienceList" class="modal">
    <div ref="audienceListWrapper" class="modal__wrapper">
      <div class="modal__header modal-header">
        <h2 class="modal-header__title">Список аудиторий</h2>
        <span class="modal-header__close" @click="closeMenu" />
      </div>
      <form>
        <ul class="modal__content modal-content__list custom-scroll">
          <div class="menu-search">
            <input
              js-menu-search
              id="search"
              type="text"
              class="menu-search__input"
              placeholder="Введите название"
            />
            <label for="search"></label>
          </div>
          <div js-menu-content class="menu-content">
            <div class="menu-content__wrapper is-selected">
              <form
                filter-form-communities
                class="white-table_full"
                action="#"
                th:action="@{/funnel/traffic/communities/}"
                th:object="${filter}"
                th:method="post"
              >
                <table class="white-table white-table_full white-table_half-top mb-4">
                  <thead class="white-table__header">
                    <tr class="header__row">
                      <th class="header__text"></th>
                      <th class="header__text">База/паблик</th>
                      <th class="header__text">Ссылка</th>
                    </tr>
                  </thead>
                  <tbody community-table class="white-table__body"></tbody>
                </table>
              </form>
            </div>
          </div>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("create-tab-settings-menu", {
      menuSettings: {
        menu: this.$refs.audienceList,
        wrapper: this.$refs.audienceListWrapper,
      },
    });
  },
};
</script>
