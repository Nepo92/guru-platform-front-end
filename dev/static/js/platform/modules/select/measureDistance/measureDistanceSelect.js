class MeasureDistanceSelect {
  getDistanceBetweenBottom(selectItem, scrollWrapper) {
    const { scrollHeight, clientHeight } = scrollWrapper;

    const wrapper = scrollHeight > clientHeight ? scrollWrapper : window;
    const headerHeight = this.getHeaderHeight(wrapper) || 0;
    const wrapperHeight = wrapper.classList ? wrapper.offsetHeight : wrapper.innerHeight;

    return wrapperHeight - (selectItem.getBoundingClientRect().bottom - headerHeight);
  }

  getHeaderHeight(wrapper) {
    let wrapperTop;

    if (wrapper.getBoundingClientRect) {
      wrapperTop = wrapper.getBoundingClientRect().top;
    }

    return wrapperTop || 0;
  }

  getDistanceBetweenTop(beetwenBottom) {
    return window.innerHeight - beetwenBottom;
  }

  measureFromBottom(body, betweenBottom) {
    return body.offsetHeight > betweenBottom;
  }
}

export default MeasureDistanceSelect;
