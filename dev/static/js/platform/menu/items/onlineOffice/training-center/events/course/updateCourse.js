import Utils from '../../../../../../utils/utils.js';
import Validation from '../../../../../../utils/validation.js';
import { trainigCenterAPI } from '../../../../../../api/api.js';
import RemoveCourse from './removeCourse.js';

const utils = new Utils();
const validation = new Validation();
const removeCourse = new RemoveCourse();

class UpdateCourse {
  init(props) {
    const params = {
      ...props,
      menu: document.querySelector('[js-menu-update-tutorial]'),
    };

    const { menu, idSection, target } = params;

    const getCourseData = trainigCenterAPI.getCourseData(idSection);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    target.style.pointerEvents = 'none';

    getCourseData.then((course) => {
      target.style.pointerEvents = 'all';
      clearTimeout(loader);
      utils.hideLoader();

      params.course = course;

      this.updateEvents(params);
      this.setDataCourse(params);

      utils.openModalAnimation(menu, true);
    }, () => target.style.pointerEvents = 'all');
  }

  setDataCourse(params) {
    const { menu, course } = params;

    const id = menu.querySelector('[js-update-tutorial-form-id]');
    id.value = course.id;

    const img = menu.querySelector('[js-update-tutorial-form-img]');
    img.value = course.previewImg;

    const type = menu.querySelector('[js-update-tutorial-form-type]');
    type.value = course.type;

    const name = menu.querySelector('[js-update-tutorial-form-name]');
    name.value = course.name;
  }

  updateEvents(params) {
    const { menu } = params;

    const closeBtn = menu.querySelector('[js-menu-update-tutorial-close-btn]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      close.addEventListener('click', closeMenu);
    }

    const saveBtn = menu.querySelector('[js-update-save-tutorial]');

    if (saveBtn) {
      const updateCourse = this.updateCourse.bind(this, params);
      const save = utils.setCloneElement(saveBtn);

      save.addEventListener('click', updateCourse);
    }

    const removeBtn = menu.querySelector('[js-delete-tutorial]');

    if (removeBtn) {
      const remove = utils.setCloneElement(removeBtn);

      const removeSection = removeCourse.init.bind(removeCourse, params);

      remove.addEventListener('click', removeSection);
    }
  }

  updateCourse(props, e) {
    const t = e.target;
    const { menu } = props;

    const form = menu.querySelector('[js-update-tutorial-form]');

    if (validation.validateTrainingCourse(form)) {
      t.style.pointerEvents = 'none';
      const formData = new FormData(form);

      const update = trainigCenterAPI.updateCourse(formData);

      const loader = setTimeout(utils.showLoader, 400);

      update.then((course) => {
        t.style.pointerEvents = 'all';
        clearTimeout(loader);

        this.afterUpdateCourse(course, menu);
      }, () => t.style.pointerEvents = 'all');
    }
  }

  afterUpdateCourse(course, menu) {
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, false);

    const courseItem = document.querySelector(`.theme[data-article="${course.id}"]`);

    const img = courseItem.querySelector('[tutorial-preview]');
    img.setAttribute('src', course.previewImg);

    const name = courseItem.querySelector('[tutorial-name]');
    name.innerText = course.name;
  }
}

export default UpdateCourse;
