class TariffTemplates {
  tariffBlock(tariff) {
    return `
        <div class="tariff-block__title">
          <span class="tariff-block__name">${tariff.name}</span>
          <span update-tariff="" class="tariff-block__settings"></span>
        </div>
        <div class="tariff-block__info">
          <span class="tariff-block__block-count">Блоков ${tariff.courseBlocks.length}</span>
          <span class="tariff-block__price">${tariff.price} ₽</span>
        </div>
        <input type="hidden" tariff-id="" data-id="${tariff.id}">
    `;
  }

  newTariffButton() {
    return `
      <div class="create-tariff__block">
        <p class="create-tariff__icon"></p>
        <p class="create-tariff__text">Добавить тариф</p>
      </div>
    `;
  }

  getTariffWrapper() {
    return `
      <div class="menu-input__title">Выберите блоки *</div>
      <div blocks-to-tariff class="menu-input__wrapper"></div>
    `;
  }

  blockInMenu(item, index) {
    return `
      <input type="checkbox" data-id="${item.id}" block-checbox class="platform__checkbox" id="checkbox_${index + 1}">
      <label for="checkbox_${index + 1}" class="platform-checkbox__label">
        <span class="platform__checkbox--fake"></span>
        <span class="block__name">${item.name}</span>
      </label>
    `;
  }
}

export default TariffTemplates;
