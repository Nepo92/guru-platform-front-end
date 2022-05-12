class SelectUtils {
  defaultSelectValue(item) {
    const filterData = Object.entries(this.filter);

    const currentFilterItem = filterData.find((el) => {
      return item.nameEng.find((elem) => elem.name === el[0]);
    });

    if (currentFilterItem) {
      return currentFilterItem[1];
    }
  }

  defaultSelectName(item) {
    const filterData = Object.entries(this.filter);

    const currentFilterItem = filterData.find((el) => {
      return item.nameEng.find((elem) => elem.name === el[0]);
    });

    if (currentFilterItem) {
      return item.options.find((el) => el.value === currentFilterItem[1])?.name || null;
    }
  }
}
