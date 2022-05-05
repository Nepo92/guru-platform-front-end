import Utils from '../../../../../../utils/utils.js';
import { trainigCenterAPI } from '../../../../../../api/api.js';
import TrainigCenterTemplates from '../../templates/trainingCenterTemplates.js';
import Files from '../files.js';
import RemoveLesson from './removeLesson.js';

const utils = new Utils();
const trainigCenterTemplates = new TrainigCenterTemplates();
const filesAdd = new Files();
const removeLesson = new RemoveLesson();

class UpdateLesson {
  init(props) {
    const params = {
      ...props,
      menu: document.querySelector('[js-menu-update-lesson]'),
    };

    const filesData = new FormData();

    const { menu } = params;

    this.getData(params, filesData);

    utils.openModalAnimation(menu, true);

    const closeBtn = document.querySelector('[js-menu-update-lesson-close-btn]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      close.addEventListener('click', closeMenu);
    }

    const files = menu.querySelector('#filesUpdate');

    if (files) {
      const fileInput = utils.setCloneElement(files);

      const setFiles = filesAdd.setFiles.bind(filesAdd, params, filesData, menu, false);
      fileInput.addEventListener('change', setFiles);
    }
  }

  getData(props, filesData) {
    const { idLesson, menu } = props;
    const getData = trainigCenterAPI.getLesson(idLesson);

    const loader = setTimeout(utils.showLoader, 400);

    getData.then((lesson) => {
      clearTimeout(loader);

      props.lesson = lesson;
      this.setData(lesson, menu);

      const removeFileBtn = menu.querySelectorAll('[js-delete-doc]');

      if (removeFileBtn.length) {
        const removeFile = filesAdd.removeFile.bind(filesAdd, props.lesson, filesData);

        removeFileBtn.forEach((item) => {
          const removeBtn = utils.setCloneElement(item);
          removeBtn.addEventListener('click', removeFile);
        });
      }

      const updateLesson = menu.querySelector('[js-update-save-lesson]');

      if (updateLesson) {
        const update = utils.setCloneElement(updateLesson);

        const updLesson = this.updLesson.bind(this, props, filesData);

        update.addEventListener('click', updLesson);
      }

      removeLesson.init(props);
    });
  }

  setData(lesson, menu) {
    const name = menu.querySelector('[js-update-lesson-form-name]');
    name.value = lesson.name;

    const id = menu.querySelector('[js-update-lesson-form-id]');
    id.value = lesson.id;

    const idTutorial = menu.querySelector('[js-update-lesson-form-idTutorial]');
    idTutorial.value = lesson.idTutorial;

    const description = menu.querySelector('[js-update-lesson-form-desc]');
    description.value = lesson.description;

    const video = menu.querySelector('[js-update-lesson-form-video-link]');
    video.value = lesson.videoLink;

    const { documents } = lesson;

    if (documents.length) {
      const wrapper = document.querySelector('[js-update-lesson-form-documents]');

      utils.removeChildren(wrapper);

      documents.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('input-element__document-wrapper');
        div.innerHTML = trainigCenterTemplates.fileTemplate(item);

        wrapper.appendChild(div);
      });
    }
  }

  updLesson(props, filesData) {
    const { menu } = props;
    const form = menu.querySelector('[js-update-lesson-form]');

    const formData = new FormData(form);
    filesAdd.appendFiles(formData, filesData);

    const update = trainigCenterAPI.updateLesson(formData);

    update.then((lesson) => {
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, false);

      const lessonCurrent = document.querySelector(`[data-lesson="${lesson.id}"]`);

      lessonCurrent.querySelector('.lesson-header__title').innerText = lesson.name;
      lessonCurrent.querySelector('.lesson-description').innerText = lesson.description;

      const documents = lessonCurrent.querySelector('.lesson__documents');

      utils.removeChildren(documents);

      if (lesson.documents.length) {
        lesson.documents.forEach((item) => {
          const div = document.createElement('a');
          div.classList.add('lesson-document');
          div.setAttribute('href', item.path);
          div.innerHTML = trainigCenterTemplates.lessonDocument(item);

          documents.appendChild(div);
        });
      }
    });
  }
}

export default UpdateLesson;
