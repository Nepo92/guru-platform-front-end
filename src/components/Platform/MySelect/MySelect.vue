<template>
  <div ref="select" class="select select-icon" @click="openSelect">
    <input ref="selectValue" type="hidden" :name="props.item.nameEng" :value="defaultValue" />
    <div class="select__head">{{ defaultName }}</div>
    <ul ref="selectBody" class="select__body custom-scroll">
      <li
        v-for="(item, index) of props.item.options"
        :key="index"
        :value="item.value"
        class="select__option"
        @click="(e) => selectOption(item, e)"
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
  data() {
    return {
      defaultValue: this.props.defaultValue,
      defaultName: this.props.defaultName,
    };
  },
  mounted() {
    const { select } = this.$refs;
    const { selectProps } = this.props;
    const { selectsOnPage } = selectProps;

    if (!selectsOnPage.length) {
      const closeSelect = this.closeSelect.bind(this);
      document.body.addEventListener("click", closeSelect);
    }

    selectsOnPage.push(select);
  },
  methods: {
    openSelect(e) {
      const { select, selectBody } = this.$refs;
      const { selectProps } = this.props;
      const { selectsOnPage } = selectProps;

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
      const { selectProps } = this.props;
      const { selectsOnPage } = selectProps;

      selectsOnPage.forEach((item) => {
        if (item.classList.contains("open")) {
          console.log(item);
          item.classList.remove("open");
        }
      });
    },
    selectOption(item, e) {
      const t = e.target;

      this.defaultValue = item.value;
      this.defaultName = item.name;
    },
  },
};
</script>
