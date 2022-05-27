<template>
  <div ref="select" class="select select-icon" @click="(e) => openSelect(e)">
    <input
      ref="inputSelect"
      type="hidden"
      :name="inputName"
      :value="selectItem.selected"
    />
    <div :title="selectItem.selectedName()?.name" class="select__head">
      <span class="select__placeholder">{{
        selectItem.selectedName()?.name
      }}</span>
    </div>
    <ul ref="selectBody" class="select__body custom-scroll">
      <li
        v-for="(item, index) of selectItem.options()"
        :key="index"
        :value="`${item.value}`"
        :title="item.name"
        class="select__option"
        @click="() => selectOption(item, selectItem.name)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// styles
import "./MySelect.scss";

// vue
import {
  defineComponent,
  InputHTMLAttributes,
  ref,
  onMounted,
  Ref,
  reactive,
} from "vue";

// interfaces
import {
  iMySelect,
  iSelectOption,
} from "./interfacesMySelect/interfacesMySelect";

export default defineComponent({
  props: {
    selectItem: Object,
    selectsArray: Array,
    activeTab: String,
  },
  emits: ["on-change", "side-effect-after-change"],
  setup(props, { emit }) {
    const select = ref({} as Ref<HTMLElement>);
    const selectBody = ref({} as Ref<HTMLElement>);
    const inputSelect = ref({} as Ref<EventTarget>);
    const selectItem = reactive(props.selectItem as iMySelect);
    const activeTab = props.activeTab as string;

    const openSelect = (e: MouseEvent) => {
      props.selectsArray?.forEach((item) => {
        (item as Element).classList.remove("open");
      });

      if (select.value && selectBody.value) {
        select.value.classList.add("open");

        const { left } = select.value.getBoundingClientRect();
        const { bottom } = select.value.getBoundingClientRect();
        const width = select.value.offsetWidth;

        selectBody.value.style.left = left + "px";
        selectBody.value.style.top = bottom + "px";
        selectBody.value.style.width = width + "px";
      }
    };

    const selectOption = (item: iSelectOption, name: string) => {
      selectItem.selected = item.value;

      setTimeout(() => {
        emit("on-change", inputSelect.value);

        if (selectItem.hasSideEffect) {
          emit("side-effect-after-change", selectItem.name);
        }
      }, 100);
    };

    const inputName = selectItem.nameEng.find((el) =>
      el.tabs.includes(activeTab)
    )?.name;

    onMounted(() => {
      if (!props.selectsArray?.length) {
        document.body.addEventListener("click", (e) => {
          const t = e.target;
          const isSelect =
            (t as Element).classList.contains("select__head") ||
            (t as Element).classList.contains("select");

          if (!isSelect) {
            props.selectsArray?.forEach((item) => {
              (item as Element).classList.remove("open");
            });
          }
        });
      }

      props.selectsArray?.push(select.value);
    });

    return {
      select,
      openSelect,
      selectOption,
      inputSelect,
      selectBody,
      selectItem,
      inputName,
    };
  },
});
</script>
