<template>
  <div ref="select" class="select select-icon" @click="openSelect">
    <input
      ref="selectValue"
      type="hidden"
      :name="setItemName(props.nameEng)"
      :value="props.selected"
    />
    <div :title="props.selectedName()" class="select__head">
      <span class="select__placeholder">{{ props.selectedName() }}</span>
    </div>
    <ul ref="selectBody" class="select__body custom-scroll">
      <li
        v-for="(item, index) of props.options"
        :key="index"
        :value="item.value"
        class="select__option"
        @click="selectOption(item, props.name)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import "./MySelect.scss";

export default {
  props: ["props"],
  mounted() {
    const { select } = this.$refs;
    const { selectsOnPage } = this.props;

    if (!selectsOnPage.length) {
      const closeSelect = this.closeSelect.bind(this);
      document.body.addEventListener("click", closeSelect);
    }

    selectsOnPage.push(select);
  },
  methods: {
    openSelect(e) {
      const { select, selectBody } = this.$refs;
      const { selectsOnPage } = this.props;

      const selctIsOpen = selectsOnPage.some((el) => el.classList.contains("open"));

      if (selctIsOpen) {
        selectsOnPage.forEach((item) => item.classList.remove("open"));
      }

      select.classList.add("open");

      const { left } = select.getBoundingClientRect();
      const { bottom } = select.getBoundingClientRect();
      const width = select.offsetWidth;

      selectBody.style.left = left + "px";
      selectBody.style.top = bottom + "px";
      selectBody.style.width = width + "px";
    },
    closeSelect(e) {
      const t = e.target;

      const selectClass = ["select__head", "select-icon"];

      const isNotSelect = !selectClass.some((el) => t.classList.contains(el));

      if (isNotSelect) {
        this.closeAllSelect();
      }
    },
    closeAllSelect() {
      const { selectsOnPage } = this.props;

      selectsOnPage.forEach((item) => {
        if (item.classList.contains("open")) {
          item.classList.remove("open");
        }
      });
    },
    selectOption(item, name) {
      const { selectValue } = this.$refs;

      const selectOptionProps = {
        target: selectValue,
        name,
        selectedOption: {
          name: item.name,
          value: item.value,
        },
      };

      setTimeout(() => {
        this.$emit("change-select-value", selectOptionProps);

        if (name === "Тип сделки") {
          this.$emit("change-deal-type", selectOptionProps);
        }
      }, 100);
    },
    setItemName(nameEng) {
      const isArray = Array.isArray(nameEng);
      const { path } = this.$route;

      return isArray ? nameEng.find((el) => el.pages.includes(path))?.name : nameEng;
    },
  },
};
</script>
