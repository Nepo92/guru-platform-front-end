import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class ITabsSettingsContracts {
  init(props) {
    const tabs = document.querySelector('.platform__tabs');

    if (tabs) {
      const changeTab = this.#changeTab.bind(this, props);

      const cloneTabs = utils.setCloneElement(tabs);
      cloneTabs.addEventListener('click', changeTab);
    }
  }

  #changeTab(props, e) {
    const t = e.target;

    const tabsItems = document.querySelectorAll('.platform-tabs__link');
    const isTabItem = t.classList.contains('platform-tabs__link');

    if (tabsItems.length && isTabItem) {
      tabsItems.forEach((item) => {
        item.classList.remove('active');
      });

      t.classList.add('active');

      props.rerenderContent.init(props);
    }
  }
}

export default ITabsSettingsContracts;
