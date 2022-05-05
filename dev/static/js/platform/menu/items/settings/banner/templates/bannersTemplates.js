class BannersTemplates {
  emptyBanners() {
    return `
      <div class="banner__file-wrapper">
        <input type="file" accept=".jpg,.svg,.png,.webp,.gif,.avif,.jpeg" class="platform__input banner__file" id="banner-mobile">
        <label for="banner-mobile" class="platform__label banner__label">
          <span class="banner__icon"></span>
          Загрузить мобильную версию 640х440
        </label>
      </div>

      <div class="banner__file-wrapper">
        <input type="file" accept=".jpg,.svg,.png,.webp,.gif,.avif,.jpeg" class="platform__input banner__file" id="banner-desktop">
        <label for="banner-desktop" class="platform__label banner__label">
          <span class="banner__icon"></span>
          Загрузить десктоп версию 1180х350
        </label>
      </div>
    `;
  }

  bannerCheckList() {
    return `
        <div class="banner__files"></div>
        <div class="banner__checklist"></div>
    `;
  }

  getListItemTemplate(item) {
    return `
      <span class="checklist-item__name">${item.name}</span>
      <div class="checklist-item__nav">
        <span class="checklist-item__preview mobile">
          <a data-fancybox href="/${item.mobileImagePath}">
            <img class="checklist-item__img" src="/${item.mobileImagePath}">
          </a>
        </span>
        <span class="checklist-item__preview">
          <a data-fancybox href="/${item.mainImagePath}">
            <img class="checklist-item__img" src="/${item.mainImagePath}">
          </a>
        </span>
        <span class="checklist-item__remove"></span>
      </div>
    `;
  }
}

export default BannersTemplates;
