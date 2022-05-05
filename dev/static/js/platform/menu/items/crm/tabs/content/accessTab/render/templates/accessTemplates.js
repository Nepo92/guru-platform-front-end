class AccessTabTemplates {
  accessNav(tabPack) {
    const { access, deal } = tabPack;
    const { allModulesHomeworkAllowed: stopLesson } = deal;

    return `
      <div class="access__nav">
        <div class="nav__left"></div>
        <div class="nav__right">
          <div class="right__stop">
            <input ${stopLesson ? 'checked' : ''} type="checkbox" stop-lesson-access class="platform__checkbox" id="stopLesson">
            <label for="stopLesson" class="platform-checkbox__label">
                <span class="platform__checkbox--fake access__checkbox--fake"></span>
                Отключить стоп-уроки
            </label>
          </div>
          <div class="right__access">
            Доступ к продукту
            <input type="checkbox" ${access ? 'checked' : ''} access-product-tab class="platform__checkbox access__checkbox"
                id="productAccess">
            <label product-access for="productAccess" class="platform__toggle access__toggle ${access ? 'active' : ''}">
                <span class="platform__thumb"></span>
            </label>
          </div>
        </div>
      </div>
      <div js-access-wrapper class="access__content"></div>
    `;
  }

  renderBlock(block, deal, index) {
    const { enabled } = block;

    return `
        <p class="block__name ml_0">
          ${block.courseBlock.name}
          <input type="checkbox" ${enabled ? 'checked' : ''} data-deal="${deal.id}" data-block="${block.courseBlock.id}" product-block id="block_${index}" class="platform__checkbox">
          <label access-block for="block_${index}" class="platform__toggle toggle__access-tab ${enabled ? 'active' : ''}">
            <span class="platform__thumb thumb__access-tab"></span>
          </label>
        </p>
        <div class="block__modules"></div>
    `;
  }
}

export default AccessTabTemplates;
