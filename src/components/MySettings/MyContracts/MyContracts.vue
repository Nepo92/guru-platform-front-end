<template>
  <div class="page">
    <MyMenu />
    <div class="page-content custom-scroll">
      <MyHeader :props="headerProps" @set-active-tab="setActiveTab" />
      <div v-if="activeTab" class="page-content__wrapper contracts">
        <div class="contracts__nav">
          <div class="contracts-nav__search constracts-search">
            <input
              id="searchContract"
              autocomplete="off"
              class="constracts-search__input contracts-search__icon"
              type="text"
              placeholder="Введите название документа"
            />
          </div>
          <div class="contracts-nav__upload">
            <button
              type="button"
              upload-contract
              class="contracts-upload__button"
            >
              Загрузить договор
            </button>
          </div>
        </div>
        <table class="contracts__table">
          <tbody>
            <tr class="contracts__row contracts__row--header">
              <td class="contracts__cell">Дата загрузки</td>
              <td class="contracts__cell">Тип документа</td>
              <td class="contracts__cell">Название</td>
              <td class="contracts__cell">Кто загрузил</td>
              <td class="contracts__cell">Статус</td>
            </tr>
            <tr
              v-for="(item, index) of contracts"
              :key="index"
              class="contracts__row"
            >
              <td class="contracts__cell">{{ item }}</td>
              <td class="contracts__cell"></td>
              <td class="contracts__cell"></td>
              <td class="contracts__cell"></td>
              <td class="contracts__cell"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/components/Platform/MyHeader/MyHeader.vue";
import { defineComponent } from "@vue/runtime-core";
import MyHeader from "@/components/Platform/MyHeader/MyHeader.vue";
import MyMenu from "@/components/Platform/MyMenu/MyMenu.vue";
import { contractStore } from "./myContractsStrore/myContractsStore";
import { ref } from "vue";
import { settingsContractsAPI } from "@/api/api";

export default defineComponent({
  components: {
    MyHeader,
    MyMenu,
  },
  async setup() {
    let activeTab = ref("");
    let contracts = ref({});

    const store = contractStore();

    const { headerProps } = store;

    const setActiveTab = (tab: string) => {
      activeTab.value = tab;
    };

    contracts = await settingsContractsAPI.getContracts();

    return {
      headerProps,
      setActiveTab,
      activeTab,
      contracts,
    };
  },
});
</script>