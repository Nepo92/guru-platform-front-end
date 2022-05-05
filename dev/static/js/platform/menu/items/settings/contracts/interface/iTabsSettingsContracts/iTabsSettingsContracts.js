import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class ITabsSettingsContracts {
  init(props) {
    const tabs = document.querySelector('.contract__tabs');

    if (tabs) {
      const changeTab = this.#changeTab.bind(this, props);

      const cloneTabs = utils.setCloneElement(tabs);
      cloneTabs.addEventListener('click', changeTab);
    }
  }

  #changeTab(props, e) {
    const tabsItems = document.querySelectorAll('.contract-tabs__item');

    if (tabsItems.length) {
      tabsItems.forEach((item) => {
        item.classList.remove('active');
      });

      const t = e.target;
      t.classList.add('active');

      props.rerenderContent.init(props);
    }
  }
}

export default ITabsSettingsContracts;
