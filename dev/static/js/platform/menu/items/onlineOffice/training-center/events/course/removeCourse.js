import { trainigCenterAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemoveCourse {
  init(props, e) {
    this.removeCourse(props, e);
  }

  removeCourse(props, e) {
    const t = e.target;

    t.style.pointerEvents = 'none';

    const removeCourse = this.removeCourseItem.bind(this, props);

    const popupProps = {
      text: 'Вы дуйствительно хотите удалить этот курс?',
      settings: null,
      title: null,
      ok: removeCourse,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  removeCourseItem(props) {
    const { idSection, target, menu } = props;
    const remove = trainigCenterAPI.removeCourse(idSection);

    remove.then(() => {
      target.style.pointerEvents = 'all';

      const wrapper = menu.querySelector('.platform-modal__wrapper');

      utils.closeModalAnimation(menu, wrapper, false, false);

      this.afterRemoveLoader(props);
    });
  }

  afterRemoveLoader(props) {
    const { idSection } = props;

    const section = document.querySelector(`.theme[data-tutorial="${idSection}"]`);

    if (section) {
      section.remove();
    }
  }
}

export default RemoveCourse;
