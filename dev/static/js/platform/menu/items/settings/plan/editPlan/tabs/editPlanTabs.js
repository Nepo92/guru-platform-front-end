class EditPlanTabs {
  init(props) {
    props.activeTab = this.getActiveTab;

    const tabContent = Array.from(document.querySelectorAll('.plans-funnel'));

    if (tabContent.length) {
      tabContent.forEach((item) => {
        item.innerHTML = '';
        item.classList.add('hide');
      });
    }

    const currentTab = tabContent.find((el) => el.getAttribute('data-type') === props.activeTab);

    if (currentTab) {
      props.currentTab = currentTab;
      currentTab.classList.remove('hide');
    }
  }

  get getActiveTab() {
    const tabs = Array.from(document.querySelectorAll('.plans-tabs__item'));
    const currentTab = tabs.find((el) => el.classList.contains('active'));
    const currentTabType = currentTab.getAttribute('data-type');

    return currentTabType;
  }

  get getTabItems() {
    return document.querySelectorAll('.plans-tabs__item');
  }
}

export default EditPlanTabs;
