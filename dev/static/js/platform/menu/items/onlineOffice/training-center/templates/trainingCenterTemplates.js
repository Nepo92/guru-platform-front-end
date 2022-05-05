class TrainigCenterTemplates {
  lessonTemplate(lesson) {
    const counter = document.querySelectorAll('.lesson').length;

    return `
      <div js-update-lesson class="theme-setting theme-setting_top theme-setting_absolute theme-setting_big"></div>
      <div class="lesson__header">
        <div class="lesson-header__number">
          <span lesson-counter="">${counter + 1}</span>
          <span>урок</span>
        </div>
        <div class="lesson-header__title">${lesson.name}</div>
      </div>
      <div class="lesson__content">
        <div class="lesson__content-wrapper">
          <div class="lesson-content__side">
            <a href="${lesson.videoLink}" class="lesson-video js-fancybox">
              <img src="/" class="lesson-video__preview">
            </a>
          </div>
          <div class="lesson-content__main">
            <div class="lesson-description">${lesson.description}</div>
            <div class="lesson__documents">
            ${lesson.documents.length ? lesson.documents.map((item) => {
      return `
              <div class="lesson__documents">
                <a href="${item.path}" class="lesson-document">
                  <div class="lesson-document__type  lesson-document__type_xlsx">${item.type}</div>
                  <div class="lesson-document__name">${item.name}</div>
                </a>
              </div>`;
    }).join('') : ''}
            </div>
        </div>
      </div>
    `;
  }

  fileTemplate(file) {
    return `
        <div class="lesson-document lesson-document_full lesson-document_without-hover">
        <div class="lesson-document__type lesson-document__type_${file.type}">${file.type}</div>
        <div class="lesson-document__name">${file.name}</div>
        </div>
        <div data-file="${file.path || file.name}" js-delete-doc class="lesson-document__delete-btn"></div>
      `;
  }

  lessonDocument(file) {
    return `
        <div class="lesson-document__type lesson-document__type_${file.type}">${file.type}</div>
        <div class="lesson-document__name">${file.name}</div>`;
  }
}

export default TrainigCenterTemplates;
