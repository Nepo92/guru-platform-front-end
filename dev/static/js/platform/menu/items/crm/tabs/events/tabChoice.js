import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class TabChoice {
  init(tabsData) {
    const { menu } = tabsData;

    const tabsBtn = menu.querySelectorAll('.client-tab__item');

    const tabPack = {
      ...tabsData,
    };

    const changeTab = this.changeTab.bind(this, tabPack);

    tabsBtn.forEach((item) => {
      const tab = utils.setCloneElement(item);
      tab.addEventListener('click', changeTab);
    });
  }

  changeTab(tabsData, e) {
    const { isView } = tabsData;
    const t = e.target;
    tabsData.target = t;
    tabsData.isChangeTab = true;

    const updateBillMenu = document.querySelector('.platform-update__bill');

    if (updateBillMenu && updateBillMenu.classList.contains('active')) {
      updateBillMenu.classList.remove('active');
    }

    this.changeActiveTab(tabsData);

    const activeTab = tabsData.getActiveTab(tabsData);
    tabsData.activeTab = activeTab;

    tabsData.changeActiveContent(tabsData);

    const tabs = tabsData.getTabs();

    const instance = tabs.filter((el) => el.tab === activeTab)[0];

    if (isView && instance.tab === 'Доступ к продукту') {
      return false;
    }

    const initTab = instance.instance.init.bind(instance.instance);

    initTab(tabsData);
  }

  changeActiveTab(tabsData) {
    const { tabs, target } = tabsData;

    Array.from(tabs.children).forEach((item) => {
      item.classList.remove('active');
    });

    target.classList.add('active');
  }
}

export default TabChoice;
