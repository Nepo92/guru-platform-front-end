<template>
  <div ref="modal" class="filter-modal">
    <div ref="wrapper" class="filter-modal__wrapper">
      <div class="filter-modal__head">
        <h2 class="filter-modal__title">
          {{ title }}
        </h2>
        <span class="modal-header__close" @click="(e) => closeFilter(e)" />
      </div>
      <div class="filter-modal__content custom-scroll">
        <form ref="form" class="filter-modal__form">
          <ul
            v-for="(item, index) of propsColumns"
            :key="index"
            class="filter-modal__column"
          >
            <li class="filter-modal__item width_100">
              <h3 class="filter-modal__subtitle">
                {{ item.name }}
              </h3>
            </li>
            <li
              v-for="(elem, count) of item.items"
              :key="count"
              class="filter-modal__item"
              :class="elem.hidden ? 'hide' : ''"
            >
              <p class="filter-modal__name">
                {{ elem.name }}
              </p>
              <div class="filter-modal__select-wrapper">
                <MySelect
                  v-if="elem.type === 'select'"
                  :selectItem="elem"
                  :selectsArray="selectsArray"
                  :activeTab="activeTab"
                  @side-effect-after-change="selectSideEffect"
                />
                <MyInput
                  v-else-if="elem.type === 'input'"
                  :inputItem="elem"
                  :activeTab="activeTab"
                  @input-side-effect="inputSideEffect"
                />
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div class="filter-modal__footer">
        <div class="filter-modal__apply" @click="(e) => applyFilter(e)">
          Применить фильтры
        </div>
        <button
          v-if="filter.canClear"
          type="button"
          class="filter-modal__reset"
          @click="(e) => clearFilter(e)"
        >
          <span class="filter-modal__reset--icon"></span>
          Сбросить фильтры
        </button>
      </div>
    </div>
    <MyLoader @create-loader="createLoader" />
  </div>
</template>

<script lang="ts">
import MyLoader from "../../UI/MyLoader/MyLoader.vue";
import MySelect from "@/components/UI/MySelect/MySelect.vue";
import MyInput from "@/components/UI/MyInput/MyInput.vue";
import "./MyFilter.scss";
import { defineComponent } from "@vue/runtime-core";
import { ref, onMounted, Ref } from "vue";
import { useRoute } from "vue-router";
import { filterStore } from "./filterStore/filterStore";
import { iFilterColumnItem } from "./interfacesMyFilter/interfacesMyFilter";
import ModalUtils from "../MyModal/ModalUtils/ModalUtils";
import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";
import { filterAPI } from "@/api/api";

const modalUtils = new ModalUtils();
const loaderUtils = new LoaderUtils();

export default defineComponent({
  components: {
    MyLoader,
    MySelect,
    MyInput,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    nested: {
      type: Boolean,
      required: true,
    },
    activeTab: {
      type: Object,
      required: true,
    },
    selectsArray: {
      type: Array,
      required: true,
    },
  },
  emits: [
    "side-effect-after-change",
    "create-filter-modal",
    "input-side-effect",
  ],
  setup(props, { emit }) {
    const modal = ref(<Ref<HTMLElement>>{});
    const wrapper = ref(<Ref<HTMLElement>>{});
    const form = ref(<Ref<HTMLFormElement>>{});
    let loader: Ref<HTMLElement>;
    const propsColumns = <Array<iFilterColumnItem>>props.columns;

    const route = useRoute();
    const { path } = route;

    const store = filterStore();

    const { filter } = store;

    const closeFilter = (e: MouseEvent) => {
      const closeFilterProps = {
        modal: modal,
        wrapper: wrapper,
        isOverflowed: props.nested,
      };

      modalUtils.closeMenu(closeFilterProps);
    };

    const clearFilter = (e: MouseEvent) => {
      const clear = filterAPI.clearFilter(path);

      const t = e.target;

      (t as Element).classList.add("no-active");
      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(loader);
      }, 400);

      clear.then(
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(loader);

          (t as Element).classList.remove("no-active");

          const closeModalProps = {
            modal,
            wrapper,
            isOverflowed: props.nested,
          };

          modalUtils.closeMenu(closeModalProps);

          setTimeout(() => {
            location.reload();
          }, 50);
        },
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(loader);

          (t as Element).classList.remove("no-active");
        }
      );
    };

    const applyFilter = (e: MouseEvent) => {
      const formData = new FormData(form.value);

      const apply = filterAPI.applyFilter(path, formData);

      const t = e.target;

      (t as Element).classList.add("no-active");

      const showLoader = setTimeout(() => {
        loaderUtils.showLoader(loader);
      }, 400);

      apply.then(
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(loader);

          (t as Element).classList.remove("no-active");

          const closeModalProps = {
            modal,
            wrapper,
            isOverflowed: props.nested,
          };

          modalUtils.closeMenu(closeModalProps);

          setTimeout(() => {
            location.reload();
          }, 50);
        },
        () => {
          clearTimeout(showLoader);
          loaderUtils.hideLoader(loader);

          (t as Element).classList.remove("no-active");
        }
      );
    };

    const createLoader = (t: Ref<HTMLElement>) => {
      loader = t;
    };

    const selectSideEffect = (
      selectName: string,
      value: null | number | string | boolean
    ) => {
      emit("side-effect-after-change", selectName, value);
    };

    const inputSideEffect = (props: Ref<HTMLElement>) => {
      emit("input-side-effect", props);
    };

    onMounted(() => {
      emit("create-filter-modal", {
        modal: modal,
        wrapper: wrapper,
      });
    });

    return {
      closeFilter,
      clearFilter,
      applyFilter,
      createLoader,
      filter,
      modal,
      wrapper,
      form,
      selectSideEffect,
      propsColumns,
      inputSideEffect,
    };
  },
});
</script>
