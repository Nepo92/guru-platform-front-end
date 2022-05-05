import Utils from '../../../../../../utils/utils.js';
import Validation from '../../../../../../utils/validation.js';
import { trainigCenterAPI } from '../../../../../../api/api.js';

const utils = new Utils();
const validation = new Validation();

class CreateCourse {
  init(props) {
    const params = {
      ...props,
      menu: document.querySelector('[js-menu-create-tutorial]'),
    };

    const { menu } = params;

    utils.openModalAnimation(menu, true);

    this.clearMenu(menu);

    const closeBtn = menu.querySelector('[js-menu-create-tutorial-close-btn]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      close.addEventListener('click', closeMenu);
    }

    const saveBtn = menu.querySelector('[js-save-tutorial]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);
      const saveTrainingCourse = this.saveTrainingCourse.bind(this, params);
      save.addEventListener('click', saveTrainingCourse);

      const toError = validation.toValidationError.bind(validation);

      save.addEventListener('dblclick', toError);
    }
  }

  clearMenu(menu) {
    const type = menu.querySelector('[js-tutorial-form-type]');
    type.value = 'admin';

    const name = menu.querySelector('[js-tutorial-form-name]');
    name.value = '';

    const file = menu.querySelector('#file');
    file.value = '';
  }

  saveTrainingCourse(props, e) {
    const t = e.target;
    const { menu } = props;

    const form = menu.querySelector('[js-tutorial-form]');

    if (validation.validateTrainingCourse(form)) {
      t.style.pointerEvents = 'none';

      const formData = new FormData(form);

      const saveCourse = trainigCenterAPI.saveCourse(formData);

      const loader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      saveCourse.then((course) => {
        t.style.pointerEvents = 'add';
        clearTimeout(loader);
        utils.hideLoader();

        props.course = course;

        this.afterSaveCourse(props);
      }, () => t.style.pointerEvents = 'all');
    }
  }

  afterSaveCourse(props) {
    const { menu } = props;

    utils.closeModalAnimation(menu, true);
    /* code after save */
  }
}

export default CreateCourse;
