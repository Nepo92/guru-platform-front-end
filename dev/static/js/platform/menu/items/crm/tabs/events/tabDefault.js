import DealTabObserver from '../observersTabs/dealTabObserver.js';
import BillTabObserver from '../observersTabs/billTabObserver.js';
import TaskTabObserver from '../observersTabs/taskTabObserver.js';
import DealTab from '../content/dealTab.js';

const billTabObserver = new BillTabObserver();
const taskTabObserver = new TaskTabObserver();
const dealTabObserver = new DealTabObserver();

class TabDefault {
  init(tabsData) {
    if (tabsData.activeTab) {
      tabsData.activeTab = tabsData.defaultTab;
      tabsData.changeActiveContent(tabsData);
    }

    if (tabsData.isCreate) {
      tabsData.activeTab = 'Счета и платежи';
    }

    const items = tabsData.getTabs();

    const instance = items.find((el) => el.tab === tabsData.activeTab)?.instance;

    tabsData.dealTabObs = dealTabObserver;
    tabsData.dealObs = new DealTab();
    tabsData.billTabObserver = billTabObserver;
    tabsData.taskTabObserver = taskTabObserver;

    instance.init(tabsData);
  }
}

export default TabDefault;
