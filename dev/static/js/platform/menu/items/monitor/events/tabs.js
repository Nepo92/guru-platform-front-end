class Tabs {
  init() {
    this.changeFilterTab();
  }

  changeFilterTab() {
    /* Жмем на табы */
    const tabs = document.querySelectorAll('[filter-parameter]');

    const form = document.querySelector('.content-main__panel-side');
    const filterFormSubmit = this.filterFormSubmit.bind(this, form);

    tabs.forEach((item) => {
      item.addEventListener('change', filterFormSubmit);
    });
  }

  filterFormSubmit(form) {
    form.submit();
  }
}

export default Tabs;
