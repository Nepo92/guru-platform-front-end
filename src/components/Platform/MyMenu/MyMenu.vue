<template>
  <nav @mouseleave="closeSubMenu">
    <ul ref="menu" class="menu">
      <li class="menu__company menu-company">
        <span
          ref="mobileMenuBtn"
          class="menu-company__open"
          @click="toggleMobileMenu"
        >
          <span class="menu-open__row" />
        </span>
        <img class="menu-company__img" :src="'/' + company.logo" />
        <div class="menu-company__info">
          <p class="menu-company__title">
            {{ company.name }}
          </p>
          <p class="menu-company__name">
            {{ company.legalName }}
          </p>
        </div>
      </li>
      <li class="menu__selector" />
      <li class="menu__list menu-list custom-scroll">
        <ul>
          <li
            v-for="(item, index) of staticMenuItems"
            :key="index"
            class="menu-list__item menu-item"
            :class="checkMenuItemIsActive(item)"
          >
            <a
              ref="menuItems"
              class="menu-item__link"
              :href="item.path[0]"
              :class="checkHasSubMenu(item)"
              :title="item.name"
              @mouseenter="(e) => hoverMenuItem({ target: e.target, index })"
              @touchstart="(e) => hoverMenuItem({ target: e.target, index })"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </li>
      <li v-if="avatar" class="menu__user menu-user">
        <img
          class="menu-user__avatar"
          :class="!avatar.path ? 'menu-avatar__default' : ''"
          :src="avatar.path ? '/' + avatar.path : ''"
          alt="user-avatar"
        />
        <div class="menu-user__info">
          <p class="menu-user__name">
            {{ avatar.name }}
          </p>
          <p class="menu-user__rating rating-icon">
            {{ avatar.currentScore }}
          </p>
        </div>
      </li>
      <li class="menu__selector" />
      <li class="menu__logout">
        <a class="menu-logout__link logout" href="/logout">Выйти</a>
      </li>
    </ul>
    <ul class="submenu__list">
      <li
        v-for="(item, index) of staticMenuItems"
        v-show="item.submenu?.items.length"
        :key="index"
        class="submenu-list__item"
      >
        <ul
          v-if="item.submenu?.items.length"
          ref="submenu"
          class="sub-menu"
          :class="
            index === menuWrapper.subMenu.currentIndex ? classSubMenu : ''
          "
          @mouseenter="mouseOnSubMenu"
          @touchstart="mouseOnSubMenu"
        >
          <li class="sub-menu__header">
            {{ item.name }}
          </li>
          <li
            v-for="(elem, count) of item.submenu.items"
            :key="count"
            class="sub-menu__item"
          >
            <a class="sub-menu__link" :class="elem.class" :href="elem.path">{{
              elem.name
            }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
// styles
import "./MyMenu.scss";
import "@/assets/scss/grid.scss";

// store
import { platformStore } from "@/store/platformStore";

// vue
import { reactive, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

// interfaces
import { iMenuItem, iHoverProps } from "./interfacesMenu/interfacesMenu";

export default {
  setup() {
    const submenu = ref([] as HTMLElement[]);
    const store = platformStore();

    const { company, avatar, getMenuItems } = store;

    const menuWrapper = reactive({
      menu: {
        isOverflowed: true,
        timerOverflow: null,
      },
      mobileMenu: {
        isOpen: false,
        subMenuIsOpen: false,
      },
      subMenu: {
        isOpen: null as boolean | null,
        currentIndex: null as number | null,
        mouseEnter: null as boolean | null,
        prevIsOpen: null as boolean | null,
      },
      viewport: {
        width: 0,
      },
    });

    const menuItems = getMenuItems;

    const staticMenuItems = menuItems.map((item: iMenuItem) => {
      return { ...item };
    });

    onMounted(() => {
      menuWrapper.viewport.width = window.innerWidth;
    });

    const classSubMenu = computed(() => {
      const { subMenu } = menuWrapper;
      const openWithoutAnimation =
        subMenu.isOpen && subMenu.prevIsOpen ? "open_t0" : false;
      const openWithAnimation = subMenu.isOpen ? "open" : false;

      const open = openWithoutAnimation || openWithAnimation;

      const close =
        (!subMenu.isOpen && subMenu.mouseEnter) ||
        (subMenu.isOpen && !subMenu.mouseEnter && subMenu.prevIsOpen)
          ? "close"
          : false;

      const result = open || close;

      return result;
    });

    const checkMenuItemIsActive = (item: iMenuItem) => {
      const route = useRoute();
      const { path } = route;
      const isActive = item.path?.includes(path) ? "active" : "";

      return isActive;
    };

    const checkHasSubMenu = (item: iMenuItem) => {
      const hasSub = item.submenu ? "submenu" : "";

      return hasSub ? `${hasSub} ${item.class}` : item.class;
    };

    const hoverMenuItem = (props: iHoverProps) => {
      const { target, index } = props;
      const { subMenu, viewport } = menuWrapper;
      const { width } = viewport;

      const hasSubMenu = target.classList.contains("submenu");

      if (width <= 1000) return false;

      subMenu.currentIndex = index;

      if (hasSubMenu) {
        if (!subMenu.isOpen) {
          subMenu.prevIsOpen = false;
        } else {
          subMenu.prevIsOpen = true;
        }

        subMenu.isOpen = true;
      } else {
        subMenu.isOpen = false;
      }

      subMenu.mouseEnter = false;
    };

    const closeSubMenu = () => {
      const { subMenu } = menuWrapper;

      subMenu.isOpen = false;
    };

    const mouseOnSubMenu = () => {
      const { subMenu } = menuWrapper;

      subMenu.mouseEnter = true;
    };

    return {
      company,
      avatar,
      staticMenuItems,
      classSubMenu,
      checkMenuItemIsActive,
      checkHasSubMenu,
      hoverMenuItem,
      closeSubMenu,
      mouseOnSubMenu,
      menuWrapper,
    };
  },
};
</script>
