<template>
  <ul class="audiuence__list">
    <li class="audiuence__item">
      <div></div>
      <div></div>
      <div class="audiuence-item__label">
        <div class="audiuence-item__name">Имя</div>
        <div class="audiuence-item__link">Ссылка</div>
      </div>
    </li>
    <li class="audiuence__item">
      <MyCheckBox
        :id="`checkbox_all`"
        :text="''"
        :name="'communites'"
        :value="'Все aудитории'"
        :onChange="selectAllAudiences"
        @create-checkbox="createCheckbox"
      />
      <label :for="`checkbox_all`" class="audiuence-item__label">
        <span class="audiuence-item__name" title="Все аудитории"
          >Все аудитории</span
        >
        <span class="audiuence-item__link"></span>
      </label>
    </li>
    <li class="audiuence__item">
      <MyCheckBox
        :id="`checkbox_unknown`"
        :text="''"
        :value="'Неизвестно'"
        :name="'communites'"
        :onChange="toggleUnknown"
        @create-checkbox="createCheckbox"
      />
      <label :for="`checkbox_unknown`" class="audiuence-item__label">
        <span class="audiuence-item__name" title="Неизвестно">Неизвестно</span>
        <span class="audiuence-item__link"></span>
      </label>
    </li>
    <li
      v-for="(item, index) of slotData?.communitesData"
      :key="index"
      class="audiuence__item"
    >
      <MyCheckBox
        :id="`checkbox_${index}`"
        :text="''"
        :value="item.name"
        :name="'communites'"
        :onChange="toggleCheckbox"
        @create-checkbox="createCheckbox"
      />
      <label :for="`checkbox_${index}`" class="audiuence-item__label">
        <span class="audiuence-item__name" :title="item.name">{{
          item.name
        }}</span>
        <span class="audiuence-item__link" :title="item.link">{{
          item.link
        }}</span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import "./AudienceList.scss";
import { defineComponent, ref, Ref, watch } from "vue";
import MyCheckBox from "@/components/UI/MyCheckbox/MyCheckBox.vue";
import { iSlotPropsData } from "../interfacesAudienceList/interfacesAudienceList";

export default defineComponent({
  components: {
    MyCheckBox,
  },
  props: {
    activeTab: String,
    selectsArray: Array,
    slotData: Object,
  },
  emits: ["slot-side-effect"],
  setup(props, { emit }) {
    let checkboxs = ref([] as Array<Ref<HTMLElement>>);
    let slotProps = ref({} as iSlotPropsData);
    let checkAll = ref({} as Ref<boolean>);

    const createCheckbox = (checkbox: Ref<HTMLElement>) => {
      checkboxs.value.push(checkbox);

      slotProps.value = <iSlotPropsData>props.slotData;

      emit("slot-side-effect", checkboxs);
    };

    watch(slotProps, (props) => {
      const { value } = props;

      if (value === "Все аудитории") {
        checkboxs.value.forEach((item) => {
          (item.value as HTMLInputElement).checked = true;
        });
      }
    });

    const selectAllAudiences = (e: InputEvent) => {
      const t = e.target;
      checkAll.value = (t as HTMLInputElement).checked;
    };

    watch(checkAll, (checked) => {
      if (checked) {
        checkboxs.value.forEach((item) => {
          (item.value as HTMLInputElement).checked = true;
        });
      } else {
        checkboxs.value.forEach((item) => {
          (item.value as HTMLInputElement).checked = false;
        });
      }

      emit("slot-side-effect", checkboxs);
    });

    const toggleCheckbox = (e: InputEvent) => {
      const t = e.target;

      if (!(t as HTMLInputElement).checked) {
        (checkboxs.value[0].value as HTMLInputElement).checked = false;
      }

      const checkboxsAudience = checkboxs.value.slice(
        2,
        checkboxs.value.length - 1
      );

      const allChecked = checkboxsAudience.every(
        (el) => (el.value as HTMLInputElement).checked
      );

      if (allChecked) {
        (checkboxs.value[0].value as HTMLInputElement).checked = true;
      }

      emit("slot-side-effect", checkboxs);
    };

    const toggleUnknown = (e: InputEvent) => {
      const t = e.target;

      const checked = (t as HTMLInputElement).checked;

      if (checked) {
        (checkboxs.value[0].value as HTMLInputElement).checked = false;
      }

      emit("slot-side-effect", checkboxs);
    };

    return {
      createCheckbox,
      selectAllAudiences,
      toggleCheckbox,
      toggleUnknown,
    };
  },
});
</script>