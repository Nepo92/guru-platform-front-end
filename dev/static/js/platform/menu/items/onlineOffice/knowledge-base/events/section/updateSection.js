import { knowledgeBaseAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';
import RemoveSection from './removeSection.js';
import Validation from '../../../../../../utils/validation.js';

const removeSection = new RemoveSection();
const utils = new Utils();
const validation = new Validation();

class UpdateSection {
  init(props) {
    const { idSection } = props;

    const menu = document.querySelector('[js-menu-update-theme]');
    const getSectionData = knowledgeBaseAPI.getSection(idSection);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    const closeBtn = menu.querySelector('[js-menu-update-theme-close-btn]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      close.addEventListener('click', closeMenu);
    }

    getSectionData.then((section) => {
      clearTimeout(loader);
      utils.hideLoader();

      const params = {
        ...props,
        section,
        menu,
      };

      this.afterGetData(params);
    });
  }

  afterGetData(props) {
    const { menu, section } = props;

    utils.openModalAnimation(menu, true);
    this.setSectionData(section, menu);
    this.setUpdateEvents(props);

    const items = [removeSection];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }

  setSectionData(section, menu) {
    const { name, type } = section;

    const typeInput = menu.querySelector('[js-update-theme-form-type]');
    typeInput.value = type;

    const nameInput = menu.querySelector('[js-update-theme-form-name]');

    nameInput.value = name;
  }

  setUpdateEvents(props) {
    const { menu } = props;
    const updateBtn = menu.querySelector('[js-save-update-theme]');

    if (updateBtn) {
      const updateSection = this.updateSection.bind(this, props);

      const update = utils.setCloneElement(updateBtn);
      update.addEventListener('click', updateSection);
    }
  }

  updateSection(props, e) {
    const { menu, idSection } = props;
    const t = e.target;
    const name = menu.querySelector('[js-update-theme-form-name]');

    if (validation.validateSection(name)) {
      t.style.pointerEvents = 'none';

      const type = menu.querySelector('[js-update-theme-form-type]').value;

      const data = {
        id: idSection,
        name: name.value.trim(),
        type,
      };

      const update = knowledgeBaseAPI.updateSection(data);

      const loader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      update.then((dataSection) => {
        clearTimeout(loader);
        utils.hideLoader();

        t.style.pointerEvents = 'all';

        this.afterUpdate(dataSection, menu);
      }, () => t.style.pointerEvents = 'all');
    }
  }

  afterUpdate(section, menu) {
    const sections = Array.from(document.querySelectorAll('.theme'));

    const updated = sections.find((el) => +el.getAttribute('data-theme') === section.id);

    const name = updated.querySelector('[theme-name]');
    name.innerText = section.name;

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, false);
  }
}

export default UpdateSection;
