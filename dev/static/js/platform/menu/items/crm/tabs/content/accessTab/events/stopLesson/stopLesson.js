import Utils from '../../../../../../../../utils/utils.js';
import { dealAPI, homeworkAPI } from '../../../../../../../../api/api.js';

const utils = new Utils();

class ChangeStopLesson {
  init(tabPack) {
    const { menu } = tabPack;

    const stopLesson = menu.querySelector('[stop-lesson-access]');

    if (stopLesson) {
      const stopLessonClone = utils.setCloneElement(stopLesson);

      const stopLessonToggle = this.stopLessonToggle.bind(this, tabPack);

      stopLessonClone.addEventListener('change', stopLessonToggle);
    }
  }

  stopLessonToggle(tabPack, e) {
    const { deal, pack } = tabPack;

    const t = e.target;

    const data = {
      id: deal.id,
      allModulesHomeworkAllowed: t.checked,
    };

    if (pack.role === 'ROLE_CURATOR') {
      homeworkAPI.updateAllowed(data);
    } else {
      dealAPI.updateAllowed(data);
    }
  }
}

export default ChangeStopLesson;
