<script>
import "./MyMenu.scss";

export default {
  data() {
    return {
      // eslint-disable-next-line
      logoClass: logo || null,
      // eslint-disable-next-line
      company: company || null,
      // eslint-disable-next-line
      role: role || null,
      // eslint-disable-next-line
      avatar: avatar || null,
      itemsAdmin: [
        {
          path: "/monitor/",
          name: "Рабочий стол",
          class: "dashboard",
        },
        {
          path: "/funnel/",
          name: "Аналитика",
          class: "funnel",
        },
        {
          path: "/deals/",
          name: "CRM",
          class: "crm",
        },
        {
          path: null,
          name: "Онлайн офис",
          class: "office",
          submenu: [
            {
              path: "/a-corporate-center/about-company/",
              name: "О компании",
            },
            {
              path: "/a-corporate-center/regulations/",
              name: "Регламенты",
            },
            {
              path: "/a-corporate-center/bookmarks/",
              name: "База знаний",
            },
            {
              path: "/a-corporate-center/training-center/",
              name: "Обучающий центр",
            },
            {
              path: "/a-corporate-center/events/",
              name: "Мероприятия",
            },
            {
              path: "/a-corporate-center/production/",
              name: "Продакшн",
            },
          ],
        },
        {
          path: null,
          name: "Финансы",
          class: "finance",
          submenu: [
            {
              path: "/workers-salary/",
              name: "Расчет вознаграждения",
            },
            {
              path: "/salary/bonus/",
              name: "Бонусы",
            },
          ],
        },
        {
          path: null,
          name: "Команда",
          class: "team",
          submenu: [
            {
              path: "/settings/users/staff/",
              name: "Сотрудники",
            },
            {
              path: "/settings/action/",
              name: "Акция",
            },
            {
              path: "/motivation-builder/",
              name: "Мотивация",
            },
            {
              path: "/work-tracker/",
              name: "Рабочие часы",
            },
          ],
        },
        {
          path: null,
          name: "Продукты",
          class: "products",
          submenu: [
            {
              path: "/products/",
              name: "Продукты",
            },
            {
              path: "/streams/",
              name: "Потоки",
            },
            {
              path: "/homework",
              name: "Проверка ДЗ",
            },
          ],
        },
        {
          path: "/a-advertising",
          name: "Маркетинг",
          class: "marketing",
        },
        {
          path: "/performance-assessment/rating/",
          name: "Контроль",
          class: "control",
        },
        {
          path: null,
          name: "Настройки",
          class: "settings",
          submenu: [
            {
              special: {
                idCompany: 1,
              },
              path: "/settings/companies/",
              name: "Организации",
            },
            {
              special: null,
              path: "/settings/projects/",
              name: "Проекты",
            },
            {
              special: null,
              path: "/banners-settings/",
              name: "Баннер",
            },
            {
              special: null,
              path: "/client-cleaner/",
              name: "Чистка дублей",
            },
            {
              special: null,
              path: "/settings/funnels/",
              name: "Воронки",
            },
            {
              special: null,
              path: "/payment-form-builder/",
              name: "Формы оплаты",
            },
            {
              special: null,
              path: "/settings/common-plans/",
              name: "Планы",
            },
            {
              special: null,
              path: "/a-advertising/links/",
              name: "Рекламные данные",
            },
            {
              special: null,
              path: "/settings/lists/payment-method/",
              name: "Способы оплаты",
            },
            {
              special: null,
              path: "/settings-contracts/",
              name: "Договора",
            },
            {
              special: null,
              path: "/bill-pattern/",
              name: "Шаблоны счетов",
            },
            {
              special: null,
              path: "/settings/password/",
              name: "Пароли",
            },
          ],
        },
      ],
      itemsManager: [
        {
          name: "Рабочий стол",
          path: "/manager-monitor/",
          class: "dashboard",
        },
        {
          name: "Онлайн офис",
          path: null,
          submenu: {
            isActive: false,
            items: [
              {
                path: "/corporate-center/about-company/",
                name: "О компании",
              },
              {
                path: "/corporate-center/regulations/",
                name: "Регламенты",
              },
              {
                path: "/corporate-center/bookmarks/",
                name: "База знаний",
              },
              {
                path: "/corporate-center/training-center/manager/",
                name: "Обучающий центр",
              },
              {
                path: "/corporate-center/events/",
                name: "Мероприятия",
              },
              {
                path: "/a-corporate-center/production/",
                name: "Продакшн",
              },
            ],
          },
        },
        {
          name: "Рабочий кабинет",
          path: null,
          class: "workers-office",
          submenu: [
            {
              name: "Вознаграждение",
              path: "/employee-salary/",
            },
            {
              name: "Отчеты",
              path: "/reports/",
            },
            {
              name: "Пароли",
              path: "/e-passwords/",
            },
          ],
        },
        {
          name: "CRM",
          path: "/transactions/",
          class: "crm",
        },
        {
          path: "/performance-assessment/",
          name: "Контроль",
          class: "control",
        },
      ],
      itemsHeadManager: [
        {
          name: "CRM",
          path: "/head-maanger-transactions/",
          class: "crm",
        },
        {
          name: "Рабочий кабинет",
          path: null,
          class: "workers-office",
          submenu: [
            {
              name: "Вознаграждение",
              path: "/employee-salary/",
            },
            {
              name: "Отчеты",
              path: "/reports/",
            },
            {
              name: "Пароли",
              path: "/e-passwords/",
            },
          ],
        },
        {
          path: null,
          name: "Онлайн офис",
          class: "office",
          submenu: [
            {
              path: "/corporate-center/about-company/",
              name: "О компании",
            },
            {
              path: "/corporate-center/regulations/",
              name: "Регламенты",
            },
            {
              path: "/corporate-center/bookmarks/",
              name: "База знаний",
            },
            {
              path: "/corporate-center/training-center/manager/",
              name: "Обучающий центр",
            },
            {
              path: "/corporate-center/events/",
              name: "Мероприятия",
            },
            {
              path: "/a-corporate-center/production/",
              name: "Продакшн",
            },
          ],
        },
        {
          path: "/performance-assessment/",
          name: "Контроль",
          class: "control",
        },
      ],
      itemsExaminer: [
        {
          path: "/examiner-control/",
          name: "Рабочий стол",
          class: "dashboard",
        },
        {
          path: "/performance-assessment/rating/",
          name: "Контроль",
          class: "control",
        },
      ],
      itemsAdvertiser: [
        {
          path: "/funnel/traffic/",
          name: "Аналитика",
          class: "funnel",
        },
        {
          name: "Рабочий кабинет",
          path: null,
          class: "workers-office",
          submenu: [
            {
              name: "Вознаграждение",
              path: "/advertiser-salary/",
            },
            {
              name: "Пароли",
              path: "/e-passwords/",
            },
            {
              path: "/corporate-center/training-center/advertiser/",
              name: "Обучающий центр",
            },
            {
              path: "/corporate-center/events/",
              name: "Мероприятия",
            },
          ],
        },
        {
          path: null,
          name: "Онлайн офис",
          class: "office",
          submenu: [
            {
              path: "/corporate-center/about-company/",
              name: "О компании",
            },
            {
              path: "/corporate-center/regulations/",
              name: "Регламенты",
            },
            {
              path: "/corporate-center/bookmarks/",
              name: "База знаний",
            },
            {
              path: "/corporate-center/training-center/manager",
              name: "Обучающий центр",
            },
            {
              path: "/a-corporate-center/production/",
              name: "Продакшн",
            },
          ],
        },
        {
          path: null,
          name: "Маркетинг",
          submenu: [
            {
              path: "/payment/page?id=1",
              name: "Распределение сделок",
            },
            {
              path: "/a-advertising/",
              name: "Распределение заявок",
            },
          ],
        },
      ],
      itemsCurator: [
        {
          path: "/homework/",
          name: "Проверка ДЗ",
          class: "homework",
        },
      ],
      menu: {
        isOpen: false,
        isOverflowed: true,
        timerOverflow: null,
      },
      mobileMenu: {
        isOpen: false,
        subMenuIsOpen: false,
      },
      subMenu: {
        isOpen: false,
        currentIndex: null,
        mouseEnter: false,
        prevIsOpen: false,
        isLast: false,
      },
      viewport: {
        width: 0,
      },
    };
  },
  created() {
    const isAdmin = this.role === "ROLE_ADMIN" ? this.itemsAdmin : false;
    const isManager =
      this.role === "ROLE_MANAGER" || this.role === "ROLE_HEAD_MANAGER" ? this.itemsManager : false;
    const isExaminer = this.role === "ROLE_EXAMINER" ? this.itemsExaminer : false;
    const isAdvertiser = this.role === "ROLE_ADVERTISER" ? this.itemsAdvertiser : false;
    const isHeadManager = this.role === "ROLE_HEAD_MANAGER" ? this.itemsHeadManager : false;
    const isCurator = this.role === "ROLE_CURATOR" ? this.itemsCurator : false;

    this.menuItems =
      isAdmin || isManager || isExaminer || isAdvertiser || isHeadManager || isCurator;

    window.addEventListener("resize", () => {
      this.updateWidth();
    });
  },
  mounted() {
    this.viewport.width = window.innerWidth;
  },
  methods: {
    openMenu() {
      const { menu, $refs, viewport } = this;
      const { width } = viewport;

      if (width <= 1000) return false;

      menu.isOpen = true;

      $refs.menu.classList.add("open");

      this.menu.timerOverflow = setTimeout(() => {
        $refs.menu.classList.add("overflowed");
        this.menu.timerOverflow = null;
      }, 300);
    },
    checkMenuItemIsActive(menuItem) {
      const { path } = this.$route;

      const isActive = menuItem.path === path ? "active" : "";

      return isActive;
    },
    checkHasSubMenu(item) {
      const hasSub = item.submenu ? "submenu" : "";

      return hasSub ? `${hasSub} ${item.class}` : item.class;
    },
    hoverMenuItem(e, index) {
      const { subMenu, viewport } = this;
      const { width } = viewport;

      if (width <= 1000) return false;

      const t = e.target;
      const hasSubMenu = t.classList.contains("submenu");

      if (hasSubMenu) {
        if (!subMenu.isOpen) {
          subMenu.prevIsOpen = false;
        } else {
          subMenu.prevIsOpen = true;
        }

        subMenu.isOpen = true;
        subMenu.currentIndex = index;
      } else {
        subMenu.currentIndex = null;
        subMenu.isOpen = false;
        subMenu.prevIsOpen = false;
      }

      subMenu.mouseEnter = false;
    },
    mouseOnSubMenu() {
      const { viewport } = this;
      const { width } = viewport;

      if (width > 1000) {
        this.subMenu.mouseEnter = true;
        this.subMenu.isOpen = true;
      }
    },
    closeMenu() {
      const { menu, subMenu, $refs, viewport } = this;
      const { width } = viewport;

      if (this.mobileMenu.isOpen && width <= 1000) return false;

      menu.isOpen = false;
      subMenu.currentIndex = null;
      subMenu.isOpen = false;
      menu.isOverflowed = true;

      if (subMenu.mouseEnter) {
        $refs.menu.classList.remove("open");

        setTimeout(() => {
          $refs.menu.classList.remove("overflowed");
        }, 300);
      } else {
        $refs.menu.classList.remove("overflowed");
        $refs.menu.classList.remove("open");

        if (menu.timerOverflow) {
          clearTimeout(menu.timerOverflow);
        }
      }
    },
    checkOverFlowMenuItems() {
      return this.subMenu.isOpen ? "open" : "";
    },
    openSubMenu() {
      const { subMenu, mobileMenu } = this;
      const { isOpen, prevIsOpen, mouseEnter } = subMenu;
      const { subMenuIsOpen } = mobileMenu;

      const openWithAnimation = isOpen && !prevIsOpen ? "open" : false;
      const openWithoutAnimation = isOpen && prevIsOpen ? "open_t0" : false;
      const openMobileSubMenu = subMenuIsOpen ? "open-mobile" : false;

      const open = openWithAnimation || openWithoutAnimation || openMobileSubMenu;

      const closeWithAnimation = !prevIsOpen && !isOpen && !mouseEnter ? "close" : false;

      const closeSubMenu = mouseEnter ? "close" : false;

      const close = closeWithAnimation || closeSubMenu;

      console.log(subMenuIsOpen);

      return open || close;
    },
    mouseLeaveMenuItem(index) {
      const { $refs, subMenu } = this;
      const { menuItems } = $refs;

      if (index === menuItems.length - 1) {
        subMenu.prevIsOpen = false;
        subMenu.isOpen = false;
      }
    },
    updateWidth() {
      if (this.listenerWodth) {
        clearTimeout(this.listenerWodth);
      }

      this.listenerWodth = setTimeout(() => {
        this.viewport.width = window.innerWidth;
      }, 50);
    },
    toggleMobileMenu(e) {
      this.mobileMenu.isOpen = !this.mobileMenu.isOpen;

      const { mobileMenuBtn, menu } = this.$refs;

      if (this.mobileMenu.isOpen) {
        mobileMenuBtn.classList.add("open");
        menu.classList.add("open");
      } else {
        mobileMenuBtn.classList.remove("open");
        menu.classList.remove("open");
        this.mobileMenu.subMenuIsOpen = false;
      }
    },
    toggleSubMenuMobile(index) {
      const { viewport, subMenu } = this;
      const { width } = viewport;

      if (width > 1000) return false;

      subMenu.currentIndex = index;
      this.mobileMenu.subMenuIsOpen = true;
    },
  },
};
</script>

<template>
  <nav ref="menu" class="menu" @mouseenter.stop="openMenu" @mouseleave="closeMenu">
    <ul class="menu__wrapper">
      <li class="menu__company menu-company">
        <span ref="mobileMenuBtn" class="menu-company__open" @click="toggleMobileMenu">
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
      <li class="menu__list menu-list custom-scroll" :class="checkOverFlowMenuItems">
        <ul>
          <li
            v-for="(item, index) of menuItems"
            :key="index"
            class="menu-list__item menu-item"
            :class="checkMenuItemIsActive(item)"
          >
            <a
              ref="menuItems"
              class="menu-item__link"
              :class="checkHasSubMenu(item)"
              :href="item.path"
              @click="() => toggleSubMenuMobile(index)"
              @mouseenter.self="(e) => hoverMenuItem(e, index)"
              @mouseleave="(e) => mouseLeaveMenuItem(index)"
              @touchstart="(e) => hoverMenuItem(e, index)"
              @touchend="(e) => mouseLeaveMenuItem(index)"
            >
              {{ item.name }}
            </a>
            <ul
              v-if="item.submenu?.length"
              ref="submenu"
              class="sub-menu"
              :class="index === subMenu.currentIndex ? openSubMenu() : ''"
              @mouseenter="(e) => mouseOnSubMenu(e)"
            >
              <li v-for="(elem, count) of item.submenu" :key="count" class="sub-menu__item">
                <a class="sub-menu__link" :href="elem.path">{{ elem.name }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li v-if="avatar" class="menu__user menu-user">
        <img
          class="menu-user__avatar"
          :class="!avatar.path ? 'menu-avatar__default' : ''"
          :src="avatar.path ? '/' + avatar.path : null"
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
      <li class="menu__logout" @mouseover.self="openMenu">
        <a class="menu-logout__link logout" href="/logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>
