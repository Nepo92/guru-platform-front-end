import { aboutCompanyAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';
import Validation from '../../../../../../utils/validation.js';
import SectionTemplates from '../../templates/sectionTemplates.js';

const utils = new Utils();
const validation = new Validation();
const sectionTemplates = new SectionTemplates();

class AddSection {
  init(props) {
    const addSection = document.querySelector('[js-create-theme]');

    const menu = document.querySelector('[js-menu-create-theme]');

    const params = {
      ...props,
      menu,
    };

    if (addSection) {
      const openMenu = this.openMenu.bind(this, params);
      addSection.addEventListener('click', openMenu);
    }

    const closeSectionAdd = document.querySelector('[js-menu-create-theme-close-btn]');

    if (closeSectionAdd) {
      const close = utils.setCloneElement(closeSectionAdd);
      const wrapper = menu.querySelector('.platform-modal__wrapper');

      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      close.addEventListener('click', closeMenu);
    }
  }

  openMenu(props) {
    const { menu } = props;

    const name = menu.querySelector('[js-theme-form-name]');

    name.value = '';

    utils.openModalAnimation(menu, true);

    const saveBtn = menu.querySelector('[js-save-theme]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);

      const saveSection = this.saveSection.bind(this, menu, name);

      save.addEventListener('click', saveSection);
    }
  }

  saveSection(menu, name, e) {
    const t = e.target;

    if (validation.validateSection(name)) {
      t.style.pointerEvents = 'none';

      const data = {
        name: name.value.trim(),
      };

      const save = aboutCompanyAPI.saveSection(data);

      save.then((section) => {
        const params = {
          section,
          t,
          menu,
        };

        this.afterSaveSection(params);
      }, () => t.style.pointerEvents = 'all');
    }
  }

  afterSaveSection(props) {
    const { section, t, menu } = props;

    t.style.pointerEvents = 'all';

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, false);

    const div = document.createElement('div');
    div.classList.add('theme');
    div.setAttribute('data-theme', section.id);
    div.innerHTML = sectionTemplates.sectionTemplate(section);

    const contentWrapper = document.querySelector('.content-main.theme-container');
    contentWrapper.appendChild(div);
  }
}

export default AddSection;
