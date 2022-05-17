<template>
  <nav @mouseleave="closeSubMenu">
    <ul ref="menu" class="menu">
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
      <li class="menu__list menu-list custom-scroll">
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
      <li class="menu__logout">
        <a class="menu-logout__link logout" href="/logout">Выйти</a>
      </li>
    </ul>
    <ul class="submenu__list">
      <li
        v-for="(item, index) of menuItems"
        v-show="item.submenu?.items.length"
        :key="index"
        class="submenu-list__item"
      >
        <ul
          v-if="item.submenu?.items.length"
          ref="submenu"
          class="sub-menu"
          :class="index === subMenu.currentIndex ? classSubMenu : ''"
          @mouseenter="mouseOnSubMenu"
          @touchstart="mouseOnSubMenu"
        >
          <li class="sub-menu__header">
            {{ item.name }}
          </li>
          <li v-for="(elem, count) of item.submenu.items" :key="count" class="sub-menu__item">
            <a class="sub-menu__link" :class="elem.class" :href="elem.path">{{ elem.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import "./MyMenu.scss";
import "@/assets/scss/grid.scss";

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
          path: ["/monitor/", "/monitor-control/"],
          name: "Рабочий стол",
          class: "dashboard",
        },
        {
          path: ["/funnel/"],
          name: "Аналитика",
          class: "funnel",
        },
        {
          path: ["/a-advertising"],
          name: "Рекламный кабинет",
          class: "marketing",
        },
        {
          path: ["/deals/"],
          name: "Сделки",
          class: "crm",
        },
        {
          path: ["/a_bills/"],
          name: "Счета и платежи",
          class: "bills",
        },
        {
          path: ["/clients-list/"],
          name: "Клиенты",
          class: "clients",
        },
        {
          path: ["/performance-assessment/rating/"],
          name: "Оценка диалогов",
          class: "control",
        },
        {
          path: ["/homework"],
          name: "Проверка ДЗ",
          class: "homework",
        },
        {
          path: ["/settings/funnels/"],
          name: "Воронки",
          class: "funnels",
        },
        {
          path: [null],
          name: "Продукты",
          class: "products",
          submenu: {
            items: [
              {
                path: ["/products/"],
                name: "Каталог продуктов",
                class: "products",
              },
              {
                path: ["/streams/"],
                name: "Потоки",
                class: "streams",
              },
            ],
          },
        },
        {
          path: [null],
          name: "Команда",
          class: "team",
          submenu: {
            items: [
              {
                path: ["/workers-salary/"],
                name: "Расчет вознаграждения",
                class: "salary",
              },
              {
                path: ["/work-tracker/"],
                name: "График работы",
                class: "work-tracker",
              },
              {
                special: null,
                path: ["/settings/common-plans/"],
                name: "Планы",
                class: "plans",
              },
              {
                path: ["/motivation-builder/"],
                name: "Мотивация",
                class: "motivation",
              },
              {
                path: ["/settings/action/"],
                name: "Акция",
                class: "action",
              },
            ],
          },
        },
        {
          path: [null],
          name: "Настройки",
          class: "settings",
          submenu: {
            items: [
              {
                special: {
                  idCompany: 1,
                },
                path: ["/settings/companies/"],
                name: "Основные",
                class: "base",
              },
              {
                special: null,
                path: ["/settings-contracts/"],
                name: "Договора",
                class: "contracts",
              },
              {
                special: null,
                path: ["/settings/projects/"],
                name: "Проекты",
                class: "projects",
              },
              {
                special: null,
                path: ["/settings/users/staff/"],
                name: "Пользователи",
                class: "users",
              },
              {
                special: null,
                path: ["/settings/lists/payment-method]/"],
                name: "Счета",
                class: "pm-bills",
              },
              {
                special: null,
                path: ["/a-advertising/links/"],
                name: "Интеграции",
                class: "integrations",
              },
              {
                special: null,
                path: ["/bill-pattern/"],
                name: "Шаблоны счетов",
                class: "template-bills",
              },
              {
                special: null,
                path: ["/banners-settings/"],
                name: "Баннер",
                class: "module-banner",
              },
              {
                special: null,
                path: ["/client-cleaner/"],
                name: "Чистка дублей",
                class: "clear-clones",
              },
              {
                special: null,
                path: ["/payment-form-builder/"],
                name: "Формы оплаты",
                class: "pf-builder",
              },
            ],
          },
        },
      ],
      itemsManager: [
        {
          name: "Рабочий стол",
          path: ["/manager-monitor/"],
          class: "dashboard",
        },
        {
          name: "Онлайн офис",
          path: [null],
          submenu: {
            isActive: false,
            items: [
              {
                path: ["/corporate-center/about-company/"],
                name: "О компании",
              },
              {
                path: ["/corporate-center/regulations/"],
                name: "Регламенты",
              },
              {
                path: ["/corporate-center/bookmarks/"],
                name: "База знаний",
              },
              {
                path: ["/corporate-center/training-center/manager/"],
                name: "Обучающий центр",
              },
              {
                path: ["/corporate-center/events/"],
                name: "Мероприятия",
              },
              {
                path: ["/a-corporate-center/production/"],
                name: "Продакшн",
              },
            ],
          },
        },
        {
          name: "Рабочий кабинет",
          path: [null],
          class: "workers-office",
          submenu: [
            {
              name: "Вознаграждение",
              path: ["/employee-salary/"],
            },
            {
              name: "Отчеты",
              path: ["/reports/"],
            },
            {
              name: "Пароли",
              path: ["/e-passwords/"],
            },
          ],
        },
        {
          name: "CRM",
          path: ["/transactions/"],
          class: "crm",
        },
        {
          path: ["/performance-assessment/"],
          name: "Контроль",
          class: "control",
        },
      ],
      itemsHeadManager: [
        {
          name: "CRM",
          path: ["/head-maanger-transactions/"],
          class: "crm",
        },
        {
          name: "Рабочий кабинет",
          path: [null],
          class: "workers-office",
          submenu: [
            {
              name: "Вознаграждение",
              path: ["/employee-salary/"],
            },
            {
              name: "Отчеты",
              path: ["/reports/"],
            },
            {
              name: "Пароли",
              path: ["/e-passwords/"],
            },
          ],
        },
        {
          path: [null],
          name: "Онлайн офис",
          class: "office",
          submenu: [
            {
              path: ["/corporate-center/about-company/"],
              name: "О компании",
            },
            {
              path: ["/corporate-center/regulations/"],
              name: "Регламенты",
            },
            {
              path: ["/corporate-center/bookmarks/"],
              name: "База знаний",
            },
            {
              path: ["/corporate-center/training-center/manager/"],
              name: "Обучающий центр",
            },
            {
              path: ["/corporate-center/events/"],
              name: "Мероприятия",
            },
            {
              path: ["/a-corporate-center/production/"],
              name: "Продакшн",
            },
          ],
        },
        {
          path: ["/performance-assessment/"],
          name: "Контроль",
          class: "control",
        },
      ],
      itemsExaminer: [
        {
          path: ["/examiner-control/"],
          name: "Рабочий стол",
          class: "dashboard",
        },
        {
          path: ["/performance-assessment/rating/"],
          name: "Контроль",
          class: "control",
        },
      ],
      itemsAdvertiser: [
        {
          path: ["/funnel/traffic/"],
          name: "Аналитика",
          class: "funnel",
        },
        {
          name: "Рабочий кабинет",
          path: [null],
          class: "workers-office",
          submenu: [
            {
              name: "Вознаграждение",
              path: ["/advertiser-salary/"],
            },
            {
              name: "Пароли",
              path: ["/e-passwords/"],
            },
            {
              path: ["/corporate-center/training-center/advertiser/"],
              name: "Обучающий центр",
            },
            {
              path: ["/corporate-center/events/"],
              name: "Мероприятия",
            },
          ],
        },
        {
          path: [null],
          name: "Онлайн офис",
          class: "office",
          submenu: [
            {
              path: ["/corporate-center/about-company/"],
              name: "О компании",
            },
            {
              path: ["/corporate-center/regulations/"],
              name: "Регламенты",
            },
            {
              path: ["/corporate-center/bookmarks/"],
              name: "База знаний",
            },
            {
              path: ["/corporate-center/training-center/manager"],
              name: "Обучающий центр",
            },
            {
              path: ["/a-corporate-center/production/"],
              name: "Продакшн",
            },
          ],
        },
        {
          path: [null],
          name: "Маркетинг",
          submenu: [
            {
              path: ["/payment/page?id=1"],
              name: "Распределение сделок",
            },
            {
              path: ["/a-advertising/"],
              name: "Распределение заявок",
            },
          ],
        },
      ],
      itemsCurator: [
        {
          path: ["/homework/"],
          name: "Проверка ДЗ",
          class: "homework",
        },
      ],
      menu: {
        isOverflowed: true,
        timerOverflow: null,
      },
      mobileMenu: {
        isOpen: false,
        subMenuIsOpen: false,
      },
      subMenu: {
        isOpen: null,
        currentIndex: null,
        mouseEnter: null,
        prevIsOpen: null,
      },
      viewport: {
        width: 0,
      },
      target: null,
      index: null,
    };
  },
  computed: {
    classSubMenu() {
      console.log(this.subMenu.isOpen);
      return "";
    },
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
  },
  mounted() {
    this.viewport.width = window.innerWidth;
  },
  methods: {
    checkMenuItemIsActive(menuItem) {
      const { path } = this.$route;

      const isActive = menuItem.path?.includes(path) ? "active" : "";

      return isActive;
    },
    checkHasSubMenu(item) {
      const hasSub = item.submenu ? "submenu" : "";

      return hasSub ? `${hasSub} ${item.class}` : item.class;
    },
    hoverMenuItem(props) {
      const { target, index } = props;
      const { subMenu, viewport } = this;
      const { width } = viewport;

      const hasSubMenu = target.classList.contains("submenu");

      if (width <= 1000) return false;

      if (hasSubMenu) {
        if (!subMenu.isOpen) {
          subMenu.prevIsOpen = false;
        } else {
          subMenu.prevIsOpen = true;
        }

        subMenu.isOpen = true;
        subMenu.currentIndex = index;
      }

      if (!hasSubMenu) {
        subMenu.isOpen = false;
        subMenu.prevIsOpen = false;
        subMenu.currentIndex = false;
      }

      subMenu.mouseEnter = false;
    },
    openSubMenu() {
      const { subMenu } = this;

      const openWithoutAnimation = subMenu.isOpen && subMenu.prevIsOpen ? "open_t0" : false;
      const openWithAnimation = subMenu.isOpen ? "open" : false;

      const open = openWithoutAnimation || openWithAnimation;

      const close =
        (!subMenu.isOpen && subMenu.mouseEnter) ||
        (subMenu.isOpen && !subMenu.mouseEnter && subMenu.prevIsOpen)
          ? "close"
          : false;

      console.log(close);

      return open || close;
    },
    closeSubMenu() {
      const { subMenu } = this;

      subMenu.isOpen = false;
    },
    mouseOnSubMenu() {
      const { subMenu, $refs } = this;

      subMenu.mouseEnter = true;
      subMenu.leaveFromMenuItem = null;

      setTimeout(() => {
        $refs.submenu.forEach((item) => {
          item.classList.remove("close");
        });
      }, 400);
    },
    leaveMenuItem(e, index) {
      const t = e.target;

      const leaveProps = {
        target: e.target,
        index,
      };

      // this.hoverMenuItem(leaveProps);
    },
  },
};
</script>
