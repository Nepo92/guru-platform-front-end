class PopupTemplate {
  popupTemplate(title, text) {
    title = title || 'Подтвердите действие';

    return `
      <div class="dialog__wrapper">
        <div class="dialog__title">${title}</div>
        <div class="dialog__text">${text}</div>
        <div class="dialog__buttons">
          <div class="button button_dialog" accept-dialog="">Да</div>
          <div class="button button_dialog button_white" close-dialog>Нет</div>
        </div>
      </div>
    `;
  }

  popupTemplateContent(title, text, contentCreator) {
    title = title || 'Подтвердите действие';

    return `
      <div class="dialog__wrapper">
        <div class="dialog__title">${title}</div>
        <div class="dialog__text">${text}</div>
        <div class="dialog__content">${contentCreator()}</div>
        <div class="dialog__buttons">
          <div class="button button_dialog" accept-dialog="">Да</div>
          <div class="button button_dialog button_white" close-dialog>Нет</div>
        </div>
      </div>
    `;
  }

  alertCopy(title, text, contentCreator) {
    title = title || 'Скопировать данные';

    return `
      <div class="dialog__wrapper">
        <div class="dialog__title">${title}</div>
        <div dilog-copy-text class="dialog__text">${text}</div>
        ${contentCreator ? `<div class="dialog__content">${contentCreator()}</div>` : ''}
        <div class="dialog__buttons">
          <div class="button button_dialog" copy-dialog>Скопировать</div>
        </div>
      </div>
    `;
  }

  alertClose(title, text) {
    title = title || 'Внимание!';

    return `
      <div class="dialog__wrapper">
        <div class="dialog__title">${title}</div>
        <div class="dialog__text">${text}</div>
        <div class="dialog__buttons dffe">
          <div class="button button_dialog button_white" close-dialog>Закрыть</div>
        </div>
      </div>
    `;
  }
}

export default PopupTemplate;
