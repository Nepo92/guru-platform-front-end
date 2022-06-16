import PageData from '../../utils/pageData/pageData';

const pageData = new PageData();

class Tabs {
  init() {
    const tabsCollection = document.querySelector('.platform__tabs')?.children;

    if (tabsCollection?.length) {
      const tabs = Array.from(tabsCollection);

      if (tabs.length) {
        const page = pageData.getPage();

        const currentTab = tabs.find((el) => el.getAttribute('href')?.includes(page));

        if (currentTab) {
          currentTab.classList.add('active');
        }
      }
    }
  }
}

export default Tabs;
