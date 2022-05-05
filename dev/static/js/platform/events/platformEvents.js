class PlatformEvents {
  init() {
    const items = [];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init();
    });
  }
}

export default PlatformEvents;
