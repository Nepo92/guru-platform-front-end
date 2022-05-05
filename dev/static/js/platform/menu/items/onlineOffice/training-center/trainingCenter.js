import CreateCourse from './events/course/createCourse.js';
import CreateLesson from './events/lesson/createLesson.js';
import UpdateCourse from './events/course/updateCourse.js';
import UpdateLesson from './events/lesson/updateLesson.js';
import Utils from '../../../../utils/utils.js';

const createCourse = new CreateCourse();
const createLesson = new CreateLesson();
const updateCourse = new UpdateCourse();
const updateLesson = new UpdateLesson();
const utils = new Utils();

class TrainingCenter {
  init(props) {
    const container = document.querySelector('.content-main.theme-container');

    const dispatchContainer = this.dispatchContainer.bind(this, props);

    container.addEventListener('click', dispatchContainer);
  }

  dispatchContainer(props, e) {
    const t = e.target;
    props.target = t;

    const createSection = t.hasAttribute('js-create-tutorial') ? 'create-section' : '';
    const updateSection = t.hasAttribute('js-update-tutorial') ? 'update-section' : '';
    const createLearn = t.hasAttribute('js-create-lesson') ? 'create-lesson' : '';
    const updateLearn = t.hasAttribute('js-update-lesson') ? 'update-lesson' : '';

    const button = createSection || updateSection || createLearn || updateLearn;

    props.idSection = +utils.getParent(t, 'theme')?.getAttribute('data-tutorial');

    switch (button) {
      case 'create-section': {
        createCourse.init.bind(createCourse)(props);
        break;
      }
      case 'update-section': {
        updateCourse.init.bind(updateCourse)(props);
        break;
      }
      case 'create-lesson': {
        createLesson.init.bind(createLesson)(props);
        break;
      }
      case 'update-lesson': {
        const idLesson = +utils.getParent(t, 'lesson').getAttribute('data-lesson');

        props.idLesson = idLesson;
        updateLesson.init.bind(updateLesson)(props);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default TrainingCenter;
