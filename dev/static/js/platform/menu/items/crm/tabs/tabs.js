import DealTab from './content/dealTab.js';
import BillTab from './content/billTab.js';
import TaskTab from './content/taskTab.js';
import AccessTab from './content/accessTab/accessTab.js';
import Utils from '../../../../utils/utils.js';

import TabChoice from './events/tabChoice.js';
import TabDefault from './events/tabDefault.js';

const tabDefault = new TabDefault();
const tabChoice = new TabChoice();
const utils = new Utils();

const dealTab = new DealTab();
const billTab = new BillTab();
const taskTab = new TaskTab();
const accessTab = new AccessTab();

class Tabs {
  init(props) {
    const { menu, pack } = props;
    const { role } = pack;

    const isClientMenu = menu.hasAttribute('js-menu-client-card');

    if (isClientMenu && role === 'ROLE_CURATOR') {
      this.#hideTabs(props);
    } else {
      const tabsData = this.#getProps(props);

      this.#setTabs(tabsData);
      this.#showTabs(props, menu);
    }
  }

  #showTabs(props, menu) {
    const tabs = menu.querySelector('.client-card__tabs');

    if (tabs) {
      tabs.style.opacity = 1;
      tabs.style.pointerEvents = 'all';
    }

    if (props.pack.role === 'ROLE_CURATOR') {
      const tabBtns = menu.querySelectorAll('.client-tab__item');

      if (tabBtns) {
        tabBtns.forEach((item) => {
          const isNotAccessTab = item.getAttribute('data-content') !== 'Доступ к продукту';

          if (isNotAccessTab) {
            item.classList.add('hide');
          }
        });
      }
    }
  }

  #getProps(props) {
    const {
      idClient,
      defaultTab,
      deal,
      idDeal,
      activeTab,
      menu,
      deals,
      isView,
      pack,
      client,
      user,
      isCreate,
      isChangeTab,
      rowEventsObs,
      clientCardObs,
      rerenderContent,
    } = props;

    return {
      defaultTab,
      idClient,
      pack,
      deal,
      activeTab,
      idDeal,
      menu,
      user: user || null,
      deals,
      isView,
      client,
      isCreate,
      isChangeTab,
      rowEventsObs,
      clientCardObs,
      rerenderContent,
    };
  }

  #setTabs(tabsData) {
    const { isView, activeTab } = tabsData;

    const accessTabItem = document.querySelector('[data-content="Доступ к продукту"]');

    if (isView) {
      accessTabItem.style.display = 'none';
    } else {
      accessTabItem.style.display = 'list-item';
    }

    this.#propsAdded(tabsData, activeTab);
    this.#setDefaultTab(tabsData);

    const items = [
      tabDefault,
      tabChoice,
    ];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(tabsData);
    });
  }

  #propsAdded(tabsData, activeTab) {
    let { menu } = tabsData;

    menu = menu || utils.getActiveMenu(tabsData);

    tabsData.menu = menu;

    const tabs = menu.querySelector('.client-card__tabs');

    if (tabs) {
      tabs.style.display = 'flex';
      tabsData.tabs = tabs;
    }

    const enableTab = activeTab || this.getActiveTab(tabsData);
    tabsData.activeTab = enableTab;

    this.changeActiveContent(tabsData);

    tabsData.tabsObs = new Tabs();

    const getTabs = this.getTabs.bind(this);
    tabsData.getTabs = getTabs;

    const getActiveTab = this.getActiveTab.bind(this);
    tabsData.getActiveTab = getActiveTab;

    const changeActiveContent = this.changeActiveContent.bind(this);
    tabsData.changeActiveContent = changeActiveContent;
  }

  #setDefaultTab(tabsData) {
    const { tabs, defaultTab } = tabsData;

    if (tabs) {
      Array.from(tabs.children).forEach((item) => {
        item.classList.remove('active');

        if (item.getAttribute('data-content') === defaultTab) {
          item.classList.add('active');
        }
      });
    }
  }

  getActiveTab(tabsData) {
    const { tabs } = tabsData;

    const active = Array.from(tabs.children).filter((el) => el.classList.contains('active'))[0];

    if (active) {
      return active.getAttribute('data-content');
    }
  }

  getTabs() {
    return [
      {
        instance: dealTab,
        tab: 'Сделки',
      },
      {
        instance: billTab,
        tab: 'Счета и платежи',
      },
      {
        instance: taskTab,
        tab: 'Задачи',
      },
      {
        instance: accessTab,
        tab: 'Доступ к продукту',
      },
    ];
  }

  changeActiveContent(tabsData) {
    const { menu, activeTab } = tabsData;

    const contents = menu.querySelectorAll('.client-card__content');

    contents.forEach((item) => {
      utils.removeChildren(item);
      item.style.display = 'none';

      if (item.getAttribute('data-content') === activeTab) {
        item.style.display = 'flex';
      }
    });
  }

  #hideTabs(props) {
    const { menu } = props;

    const tabs = menu.querySelector('.client-card__tabs');

    if (tabs) {
      tabs.classList.add('hide');
    }
  }
}

export default Tabs;
