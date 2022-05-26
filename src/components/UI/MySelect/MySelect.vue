<template>
  <div ref="select" class="select select-icon" @click="(e) => openSelect(e)">
    <input
      ref="inputSelect"
      type="hidden"
      :name="inputName"
      :value="selectItem.selected"
      @input="changeSelectValue"
    />
    <div :title="'title'" class="select__head">
      <span class="select__placeholder">{{ selectItem.selectedName() }}</span>
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
  watch,
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
    selectsBody: Array,
    activeTab: String,
  },
  setup(props, { emit }) {
    const select = ref({} as Ref<HTMLElement>);
    const selectBody = ref({} as Ref<HTMLElement>);
    const inputSelect = ref({} as Ref<InputHTMLAttributes>);
    const selectItem = reactive(props.selectItem as iMySelect);
    const activeTab = props.activeTab as string;

    const onChange = watch(selectItem, (selected) => {
      selectItem.selected;
    });

    const openSelect = (e: MouseEvent) => {
      props.selectsBody?.forEach((item) => {
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
    };

    const changeSelectValue = () => {
      console.log("das");
    };

    const inputName = selectItem.nameEng.find((el) =>
      el.tabs.includes(activeTab)
    )?.name;

    onMounted(() => {
      props.selectsBody?.push(select.value);

      if (!props.selectsArray?.length) {
        props.selectsArray?.push(select);

        document.body.addEventListener("click", (e) => {
          const t = e.target;

          const isSelect =
            (t as Element).classList.contains("select__head") ||
            (t as Element).classList.contains("select");

          if (!isSelect) {
            props.selectsBody?.forEach((item) => {
              (item as Element).classList.remove("open");
            });
          }
        });
      }
    });

    return {
      select,
      openSelect,
      selectOption,
      inputSelect,
      selectBody,
      selectItem,
      inputName,
      changeSelectValue,
    };
  },
});
</script>
