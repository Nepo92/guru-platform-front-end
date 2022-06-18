class BannersTemplates {
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
