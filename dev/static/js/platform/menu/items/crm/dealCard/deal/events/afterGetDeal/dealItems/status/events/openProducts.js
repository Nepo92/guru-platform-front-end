class OpenProduct {
  init(dealPack) {
    const { menu, deal } = dealPack;

    const selectProduct = menu.querySelector('[data-select-type="select-product"]');
    const tariff = menu.querySelector('[data-select-type="select-tariff"]');
    const startDate = menu.querySelector('[data-select-type="select-stream"]');
    const price = menu.querySelector('[price-item]');

    const items = [selectProduct, tariff, startDate, price];

    if (deal && deal.type !== '' && deal.idTariff) {
      items.forEach((item) => {
        item.classList.remove('hide');
        item.querySelector('[id-selected]')?.setAttribute('required', '');
      });
    } else {
      const willOpen = items.filter((el) => !el.classList.contains('tariff-content'));

      willOpen.forEach((item) => {
        item.classList.remove('hide');
        item.querySelector('[id-selected]')?.setAttribute('required', '');
      });
    }
  }
}

export default OpenProduct;
