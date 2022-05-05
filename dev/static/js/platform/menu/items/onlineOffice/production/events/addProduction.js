import Utils from '../../../../../utils/utils.js';
import { reglamentAPI } from '../../../../../api/api.js';
import Validation from '../../../../../utils/validation.js';

const utils = new Utils();
const validation = new Validation();

class AddProduction {
  init(props) {
    const menu = document.querySelector('[js-menu-create-article]');

    this.clearMenu(menu);
    utils.openModalAnimation(menu, true);

    const saveBtn = menu.querySelector('[js-save-article]');

    if (saveBtn) {
      const save = utils.setCloneElement(saveBtn);

      const params = {
        ...props,
        menu,
      };

      const saveReglament = this.saveReglament.bind(this, params);
      save.addEventListener('click', saveReglament);

      const toError = validation.toValidationError.bind(validation);
      save.addEventListener('dblclick', toError);
    }

    const closeBtn = document.querySelector('[js-menu-create-article-close-btn]');

    if (closeBtn) {
      const close = utils.setCloneElement(closeBtn);
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      close.addEventListener('click', closeMenu);
    }
  }

  clearMenu(menu) {
    const name = menu.querySelector('[js-article-form-name]');
    const link = menu.querySelector('[js-article-form-link]');
    const file = menu.querySelector('#file');
    const editor = menu.querySelector('.ql-editor');

    if (editor) {
      editor.innerText = '';
    }

    const items = [name, link, file];

    items.forEach((item) => {
      item.value = '';
    });
  }

  saveReglament(props, e) {
    const { menu } = props;
    const t = e.target;

    const form = menu.querySelector('[js-article-form]');

    if (validation.validateReglament(form)) {
      t.style.pointerEvents = 'none';

      const formData = new FormData(form);

      const saveReglament = reglamentAPI.saveReglament(formData);

      const loader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      saveReglament.then(() => {
        t.style.pointerEvents = 'all';
        clearTimeout(loader);
        utils.hideLoader();

        /* Code after save */
      }, () => t.style.pointerEvents = 'all');
    }
  }
}

export default AddProduction;
