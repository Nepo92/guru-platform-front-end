import Utils from '../../../../../../utils/utils.js';
import Validation from '../../../../../../utils/validation.js';
import { trainigCenterAPI } from '../../../../../../api/api.js';
import TrainigCenterTemplates from '../../templates/trainingCenterTemplates.js';
import Files from '../files.js';

const utils = new Utils();
const validation = new Validation();
const trainigCenterTemplates = new TrainigCenterTemplates();
const filesAdd = new Files();

class CreateLesson {
  init(props) {
    const params = {
      ...props,
      menu: document.querySelector('[js-menu-create-lesson]'),
    };

    const filesData = new FormData();

    const { menu } = params;

    this.clearMenu(menu);

    utils.openModalAnimation(menu, true);

    const closeBtn = document.querySelector('[js-menu-create-lesson-close-btn]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);
      const wrapper = menu.querySelector('.platform-modal__wrapper');

      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);

      close.addEventListener('click', closeMenu);
    }

    const saveBtn = document.querySelector('[js-save-lesson]');

    if (saveBtn) {
      const saveLesson = this.saveLesson.bind(this, params, filesData);
      const save = utils.setCloneElement(saveBtn);

      save.addEventListener('click', saveLesson);

      const toError = validation.toValidationError.bind(validation);
      save.addEventListener('click', toError);
    }

    const files = menu.querySelector('#files');

    if (files) {
      const fileInput = utils.setCloneElement(files);

      const setFiles = filesAdd.setFiles.bind(filesAdd, params, filesData, menu, true);
      fileInput.addEventListener('change', setFiles);
    }
  }

  clearMenu(menu) {
    const name = menu.querySelector('[js-lesson-form-name]');
    name.value = '';

    const desc = menu.querySelector('[js-lesson-form-desc]');
    desc.value = '';

    const video = menu.querySelector('[js-lesson-form-video-link]');
    video.value = '';

    const input = menu.querySelector('.input-upload-file');
    input.value = '';

    const documents = menu.querySelector('.input-element__documents .input-element__documents-new');

    utils.removeChildren(documents);
  }

  saveLesson(props, filesData, e) {
    const { idSection } = props;
    const t = e.target;
    const form = document.querySelector('[js-lesson-form]');

    if (validation.validateLessonTrainingCentr(form)) {
      t.style.pointerEvents = 'none';

      const formData = new FormData(form);
      filesAdd.appendFiles(formData, filesData);
      formData.set('idTutorial', idSection);

      const save = trainigCenterAPI.saveLesson(formData);

      const loader = setTimeout(utils.showLoader, 400);

      save.then((lesson) => {
        clearTimeout(loader);

        props.lesson = lesson;

        this.afterSaveLesson(props);
      });
    }
  }

  afterSaveLesson(props) {
    const { menu, idSection, lesson } = props;
    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);

    const div = document.createElement('div');
    div.classList.add('lesson');
    div.setAttribute('data-lesson', lesson.id);
    div.innerHTML = trainigCenterTemplates.lessonTemplate(lesson);

    // data-tutorial

    const content = document.querySelector(`.theme[data-tutorial="${idSection}"]`).querySelector('.theme__lessons');
    content.appendChild(div);
  }
}

export default CreateLesson;
