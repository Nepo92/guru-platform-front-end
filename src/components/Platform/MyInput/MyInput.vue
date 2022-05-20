<template>
  <input 
    type="text" 
    :value="props.value" 
    :name="nameEng" 
    @click="(e) => inputClick(e)" 
  />
</template>

<script>
export default {
  props: ["props"],
  emits: ['open-communities-menu'],
  data() {
    const { path } = this.$route;

    const nameEng = this.props.nameEng.find((el) => el.pages.includes(path))?.name;

    return {
      nameEng,
    };
  },
  methods: {
    inputClick(e) {
      if (this.props.name === "Аудитории") {
        this.$emit("open-communities-menu", e);
      }
    },
  },
};
</script>
