class CloseProduct {
  init(dealPack) {
    const { menu, deal, dealStatus } = dealPack;

    const selectProduct = menu.querySelector('[data-select-type="select-product"]');
    const tariff = menu.querySelector('[data-select-type="select-tariff"]');
    const startDate = menu.querySelector('[data-select-type="select-stream"]');
    const price = menu.querySelector('[price-item]');

    if (deal && deal.type) {
      if (deal.status === 1 || dealStatus) {
        const items = [selectProduct, tariff, startDate, price];

        items.forEach((item) => {
          item.classList.add('hide');
          item.querySelector('[id-selected]')?.removeAttribute('required');
        });
      }
    } else {
      const props = {
        ...dealPack,
        selectProduct,
        tariff,
        startDate,
        price,
      };

      this.hideMenuItems(props);
    }
  }

  hideMenuItems(dealPack) {
    const {
      dealStatus,
      selectProduct,
      tariff,
      startDate,
      price,
    } = dealPack;

    if (dealStatus === 1) {
      const items = [selectProduct, tariff, startDate, price];

      items.forEach((item) => {
        item.classList.add('hide');
        item.querySelector('[id-selected]')?.removeAttribute('required');
      });
    }
  }
}

export default CloseProduct;
