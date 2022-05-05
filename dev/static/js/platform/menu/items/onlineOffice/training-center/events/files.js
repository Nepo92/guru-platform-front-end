import TrainigCenterTemplates from '../templates/trainingCenterTemplates.js';
import { trainigCenterAPI } from '../../../../../api/api.js';
import Utils from '../../../../../utils/utils.js';

const trainigCenterTemplates = new TrainigCenterTemplates();
const utils = new Utils();

class Files {
  setFiles(props, filesData, menu, isNew, e) {
    const t = e.target;
    const { files } = t;

    const documents = menu.querySelector('.input-element__documents .input-element__documents-new');

    const setTemplate = async () => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        filesData.append(file.name, file);

        const fileProperty = {
          name: file.name,
          type: file.name.split('.')[file.name.split('.').length - 1],
        };

        const div = document.createElement('div');
        div.classList.add('input-element__document-wrapper');
        div.innerHTML = trainigCenterTemplates.fileTemplate(fileProperty, isNew ? 'new' : '');

        await documents.appendChild(div);
      }
    };

    setTemplate().then(() => {
      const removeBtn = menu.querySelectorAll('[js-delete-doc]');

      const removeFile = this.removeFile.bind(this, false, filesData);

      if (removeBtn.length) {
        removeBtn.forEach((item) => {
          item.addEventListener('click', removeFile);
        });
      }
    });
  }

  appendFiles(formData, files) {
    /* eslint-disable-next-line */
    for (const pair of files.entries()) {
      formData.append('files', pair[1]);
    }
  }

  removeFile(lesson, fildesData, e) {
    const t = e.target;

    if (utils.getParent(t, 'input-element__documents-old')) {
      const id = t.getAttribute('data-file');

      const file = lesson.documents.find((el) => el.path === id);

      const formData = new FormData();
      formData.set('idLesson', lesson.id);
      formData.set('file', `${file.name}.${file.type}`);

      trainigCenterAPI.removeDocument(formData);

      utils.getParent(t, 'input-element__document-wrapper').remove();
    } else {
      fildesData.delete(t.getAttribute('data-file'));
      utils.getParent(t, 'input-element__document-wrapper').remove();
    }
  }
}

export default Files;
