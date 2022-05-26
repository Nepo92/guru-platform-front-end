import { defineStore } from "pinia";

const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_MANAGER = "ROLE_MANAGER";
const ROLE_HEAD_MANAGER = "ROLE_HEAD_MANAGER";
const ROLE_CURATOR = "ROLE_CURATOR";
const ROLE_ADVERTISER = "ROLE_ADVERTISER";
const ROLE_EXAMINER = "ROLE_EXAMINER";

export const platformStore = defineStore("platformStore", {
  state() {
    const roles = {
      admin: ROLE_ADMIN,
      manager: ROLE_MANAGER,
      headManager: ROLE_HEAD_MANAGER,
      curator: ROLE_CURATOR,
      advertiser: ROLE_ADVERTISER,
      examiner: ROLE_EXAMINER,
    };

    return {
      // eslint-disable-next-line
      logoClass: logo || null,
      // eslint-disable-next-line
      company: company || null,
      // eslint-disable-next-line
      role: role || null,
      // eslint-disable-next-line
      avatar: avatar || null,
      menuItems: [
        {
          roles: [roles.admin],
          path: ["/monitor/", "/monitor-control/"],
          name: "Рабочий стол",
          class: "dashboard",
        },
        {
          roles: [roles.admin],
          path: ["/funnel/"],
          name: "Аналитика",
          class: "funnel",
        },
        {
          roles: [roles.admin],
          path: ["/a-advertising"],
          name: "Рекламный кабинет",
          class: "marketing",
        },
        {
          roles: [roles.admin],
          path: ["/deals/"],
          name: "Сделки",
          class: "crm",
        },
        {
          roles: [roles.admin],
          path: ["/a_bills/"],
          name: "Счета и платежи",
          class: "bills",
        },
        {
          roles: [roles.admin],
          path: ["/clients-list/"],
          name: "Клиенты",
          class: "clients",
        },
        {
          roles: [roles.admin],
          path: ["/performance-assessment/rating/"],
          name: "Оценка диалогов",
          class: "control",
        },
        {
          roles: [roles.admin],
          path: ["/homework"],
          name: "Проверка ДЗ",
          class: "homework",
        },
        {
          roles: [roles.admin],
          path: ["/settings/funnels/"],
          name: "Воронки",
          class: "funnels",
        },
        {
          roles: [roles.admin],
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
          roles: [roles.admin],
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
          roles: [roles.admin],
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
        {
          roles: [roles.manager],
          name: "Рабочий стол",
          path: ["/manager-monitor/"],
          class: "dashboard",
        },
        {
          roles: [roles.manager],
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
          roles: [roles.manager],
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
          roles: [roles.manager],
          name: "CRM",
          path: ["/transactions/"],
          class: "crm",
        },
        {
          roles: [roles.manager],
          path: ["/performance-assessment/"],
          name: "Контроль",
          class: "control",
        },
        {
          roles: [roles.headManager],
          name: "CRM",
          path: ["/head-maanger-transactions/"],
          class: "crm",
        },
        {
          roles: [roles.headManager],
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
          roles: [roles.headManager],
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
          roles: [roles.headManager],
          path: ["/performance-assessment/"],
          name: "Контроль",
          class: "control",
        },
        {
          roles: [roles.examiner],
          path: ["/examiner-control/"],
          name: "Рабочий стол",
          class: "dashboard",
        },
        {
          roles: [roles.examiner],
          path: ["/performance-assessment/rating/"],
          name: "Контроль",
          class: "control",
        },
        {
          roles: [roles.advertiser],
          path: ["/funnel/traffic/"],
          name: "Аналитика",
          class: "funnel",
        },
        {
          roles: [roles.advertiser],
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
          roles: [roles.advertiser],
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
          roles: [roles.advertiser],
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
        {
          roles: [roles.curator],
          path: ["/homework/"],
          name: "Проверка ДЗ",
          class: "homework",
        },
      ],
    };
  },
  getters: {
    getMenuItems() {
      const menuItems = this.menuItems.filter((el) =>
        el.roles.includes(this.role)
      );

      return menuItems;
    },
  },
});
