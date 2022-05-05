import Utils from '../../../../../../utils/utils.js';
import { trainigCenterAPI } from '../../../../../../api/api.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemoveLesson {
  init(props) {
    const { menu } = props;

    const removeLessonBtn = menu.querySelector('[js-delete-lesson]');

    if (removeLessonBtn) {
      const update = utils.setCloneElement(removeLessonBtn);

      const remove = this.removeLesson.bind(this, props);

      update.addEventListener('click', remove);
    }
  }

  removeLesson(props, e) {
    const t = e.target;
    const { lesson, menu, idSection } = props;

    const remove = this.remove.bind(this, lesson, menu, idSection);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот урок?',
      settings: null,
      title: null,
      ok: remove,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  remove(lesson, menu, idSection) {
    const deleteLesson = trainigCenterAPI.remvoveLesson(lesson.id);

    deleteLesson.then(() => {
      const wrapper = menu.querySelector('.platform-modal__wrapper');

      utils.closeModalAnimation(menu, wrapper, false, false);

      const lessonRemoved = document.querySelector(`.theme[data-tutorial="${idSection}"] .lesson[data-lesson="${lesson.id}"]`);

      lessonRemoved.remove();
    });
  }
}

export default RemoveLesson;
