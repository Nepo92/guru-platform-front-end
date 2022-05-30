<template>
  <li class="modal-content__item">
    <p class="modal-content__name">Тип</p>
    <div>
      <MySelect
        :activeTab="activeTab"
        :selectItem="selectItem"
        :selectsArray="selectsArray"
      />
    </div>
  </li>
  <li class="modal-content__item">
    <ul>
      <FunnelColorSettings />
    </ul>
  </li>
  <li class="modal-content__item funnel-settings__title">
    <p class="modal-content__name funnel-colors__title">Этапы воронки</p>
  </li>
  <li v-for="(collapse, index) of collapseItems" :key="index">
    <ul>
      <li
        class="modal-content__item collapse"
        @click.self="(e) => openCollapse(e)"
      >
        <p
          class="modal-content__name collapse-icon"
          @click.self="(e) => closeCollapse(e)"
        >
          {{ collapse.name }}
        </p>
        <ul class="collapse__body">
          <li
            v-for="(checkbox, count) of collapse.items"
            :key="count"
            class="collapse__item"
          >
            <input
              :id="'collapse-' + `${count}-${checkbox.name}`"
              ref="visibleCheck"
              :name="checkbox.nameEng"
              type="checkbox"
              :checked="checkbox.value"
              :value="checkbox.value"
              class="checkbox"
            />
            <label
              :for="'collapse-' + `${count}-${checkbox.name}`"
              class="checkbox__label"
            >
              <span class="checkbox__fake"></span>
              <span class="checkbox__text">{{ checkbox.name }}</span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
// styles
import "./FunnelTrafficSettings.scss";
import "@/components/UI/MyCheckbox/MyCheckbox.scss";

// components
import FunnelColorSettings from "../FunnelColorSettings/FunnelColorSettings.vue";
import { defineComponent } from "@vue/runtime-core";

// vue
import { onMounted, ref, reactive } from "vue";

// store
import { funnelTrafficStore } from "./funnelTrafficStore/funnelTrafficStore";

// interfaces
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";

export default defineComponent({
  components: {
    FunnelColorSettings,
  },
  props: {
    selectsArray: Array,
    activeTab: String,
  },
  emits: ["create-funnel-traffic-settings"],
  setup(props, { emit }) {
    let filterSettings = ref({} as HTMLFormElement);
    let selectItem = reactive({} as iMySelect);

    const store = funnelTrafficStore();
    const { menu } = store;

    onMounted(() => {
      emit("create-funnel-traffic-settings", filterSettings.value);
    });

    const collapseItems = menu.find((el) => el.type === "collapse")?.items;

    selectItem = <iMySelect>menu.find((el) => el.type === "select")?.items[0];

    const openCollapse = (e: MouseEvent) => {
      const t = e.target;

      (t as Element).classList.toggle("open");
    };

    const closeCollapse = (e: MouseEvent) => {
      const t = e.target;

      const parent = (t as HTMLElement).parentNode;

      (parent as Element).classList.toggle("open");
    };

    return {
      filterSettings,
      selectItem,
      collapseItems,
      openCollapse,
      closeCollapse,
    };
  },
});
</script>