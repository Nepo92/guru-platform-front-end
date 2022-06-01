<template>
  <li class="modal-content__item select">
    <p class="modal-content__name">Тип</p>
    <div class="select__wrapper">
      <MySelect
        :activeTab="activeTab"
        :selectItem="selectItem"
        :selectsArray="selectsArray"
      />
    </div>
  </li>
  <li class="modal-content__item color-settings">
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
        :data-index="index"
        @click.self="(e) => openCollapse(e)"
      >
        <p
          class="modal-content__name collapse-icon"
          @click.self="(e) => closeCollapse(e)"
        >
          {{ collapse.name }}
        </p>
        <ul ref="collapseBody" class="collapse__body" :data-index="index">
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
import "./FunnelTrafficSettings.scss";
import "@/components/UI/MyCheckbox/MyCheckbox.scss";
import FunnelColorSettings from "../FunnelColorSettings/FunnelColorSettings.vue";
import { defineComponent } from "@vue/runtime-core";
import MySelect from "@/components/UI/MySelect/MySelect.vue";
import { onMounted, ref, reactive, Ref } from "vue";
import { funnelTrafficStore } from "./funnelTrafficStore/funnelTrafficStore";
import { iMySelect } from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";

export default defineComponent({
  components: {
    FunnelColorSettings,
    MySelect,
  },
  props: {
    activeTab: {
      type: String,
      required: true,
    },
    selectsArray: {
      type: Array,
      required: true,
    },
  },
  emits: ["create-slot"],
  setup(props, { emit }) {
    let filterSettings = ref({} as HTMLFormElement);
    let selectItem = reactive({} as iMySelect);
    let collapseBody = ref({} as Ref<Array<HTMLElement>>);
    let visibleCheck = ref({} as Ref<Array<HTMLElement>>);

    const store = funnelTrafficStore();
    const { menu } = store;

    onMounted(() => {
      emit("create-slot", visibleCheck);
    });

    const collapseItems = menu.find((el) => el.type === "collapse")?.items;

    selectItem = <iMySelect>menu.find((el) => el.type === "select")?.items[0];

    const calculateMaxHeight = (t: HTMLElement) => {
      const currentBody = <HTMLElement>(
        collapseBody.value.find(
          (el) =>
            el.getAttribute("data-index") ===
            (t as Element).getAttribute("data-index")
        )
      );

      let maxHeight: string;

      if (currentBody) {
        if ((t as Element).classList.contains("open")) {
          maxHeight =
            (
              Array.from(currentBody.children) as Array<
                number | Element | undefined
              >
            ).reduce((first, second) => {
              if (typeof first !== "number" && second) {
                return (
                  (first as HTMLElement).offsetHeight +
                  15 +
                  (second as HTMLElement).offsetHeight +
                  15
                );
              } else if (typeof first === "number" && second) {
                return first + (second as HTMLElement).offsetHeight + 15;
              } else if (typeof first === "number" && !second) {
                return first;
              } else if (typeof first !== "number" && !second) {
                return (first as HTMLElement).offsetHeight + 15;
              }
            }) + "px";
        } else {
          maxHeight = 0 + "px";
        }

        currentBody.style.maxHeight = maxHeight;
      }
    };

    const openCollapse = (e: MouseEvent) => {
      const t = e.target;

      (t as Element).classList.toggle("open");

      calculateMaxHeight(t as HTMLElement);
    };

    const closeCollapse = (e: MouseEvent) => {
      const t = e.target;

      const parent = (t as HTMLElement).parentNode;

      (parent as Element).classList.toggle("open");

      calculateMaxHeight(parent as HTMLElement);
    };

    return {
      filterSettings,
      selectItem,
      collapseItems,
      openCollapse,
      closeCollapse,
      collapseBody,
      visibleCheck,
    };
  },
});
</script>