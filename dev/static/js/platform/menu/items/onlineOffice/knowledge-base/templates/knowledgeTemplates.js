class KnowledgeTemplates {
  sectionTemplate(section) {
    return `
        <div class="theme-wrapper">
          <div class="theme__title-wrapper">
            <div theme-name class="theme-title theme-title_delim theme-title__faq">${section.name}</div>
            <div js-update-theme class="theme-setting mt_0"></div>
            <div js-create-article class="add-button add-button_right">Добавить файл</div>
          </div>
          <div class="theme__articles"></div>
        </div>
    `;
  }

  articleTempalte(article) {
    return `
        <div class="article-wrapper">
          <div class="article__title">${article.name}</div>
          <div class="article-preview">
            <div class="article__preview">
              <div class="article__preview-hover"></div>
              <img src="/${article.previewImg}}" alt="" class="article__img">
              <div class="article__link-wrapper">
                <a href="${article.link}" target="_blank" class="article__link">Открыть</a>
                <div js-update-article class="article__btn-link">Редактировать</div>
              </div>
            </div>
          </div>
        </div>
    `;
  }
}

export default KnowledgeTemplates;
