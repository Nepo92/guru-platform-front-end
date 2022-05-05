import Utils from '../../../../../utils/utils.js';
import { reglamentAPI } from '../../../../../api/api.js';
import Validation from '../../../../../utils/validation.js';
import DeleteEvents from './deleteEvents.js';

const utils = new Utils();
const validation = new Validation();
const deleteEvents = new DeleteEvents();

class UpdateEvents {
  init(props) {
    const params = {
      ...props,
      menu: document.querySelector('[js-menu-update-article]'),
    };

    const { menu, idReglament } = params;

    const getReglamentData = reglamentAPI.getReglament(idReglament);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    getReglamentData.then((reglament) => {
      clearTimeout(loader);
      utils.hideLoader();

      utils.openModalAnimation(menu, true);

      params.reglament = reglament;

      this.setReglamentData(params);

      const updateBtn = menu.querySelector('[js-update-save-article]');

      if (updateBtn) {
        const update = utils.setCloneElement(updateBtn);

        const updateReglament = this.updateReglament.bind(this, params);
        update.addEventListener('click', updateReglament);

        const toError = validation.toValidationError.bind(validation);
        update.addEventListener('dblclick', toError);
      }

      const closeBtn = document.querySelector('[js-menu-update-article-close-btn]');

      if (closeBtn) {
        const close = utils.setCloneElement(closeBtn);
        const wrapper = menu.querySelector('.platform-modal__wrapper');
        const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
        close.addEventListener('click', closeMenu);
      }

      const removeBtn = menu.querySelector('[js-delete-article]');

      if (removeBtn) {
        const remove = utils.setCloneElement(removeBtn);

        const removeReglament = deleteEvents.init.bind(deleteEvents, params);
        remove.addEventListener('click', removeReglament);
      }
    });
  }

  setReglamentData(props) {
    const { reglament, menu } = props;

    const name = menu.querySelector('[js-update-article-form-name]');
    name.value = reglament.name;

    const type = menu.querySelector('[js-update-article-form-type]');

    if (type) {
      type.value = reglament.type;
    }

    const kind = menu.querySelector(`[name="kind"][value="${reglament.kind}"]`);
    kind.checked = true;

    const editor = menu.querySelector('.ql-editor');

    if (editor) {
      editor.innerHTML = reglament.text;
    }

    const link = menu.querySelector('[js-update-article-form-link]');

    if (link) {
      link.value = reglament.value || '';
    }
  }

  updateReglament(props, e) {
    const t = e.target;

    const form = document.querySelector('[js-update-article-form]');

    const { idReglament } = props;

    if (validation.validateReglament(form)) {
      t.style.pointerEvents = 'none';

      const formData = new FormData(form);
      formData.set('id', idReglament);

      const loader = setTimeout(() => {
        utils.showLoader();
      });

      const update = reglamentAPI.updateReglament(formData);

      update.then((reglament) => {
        t.style.pointerEvents = 'all';

        clearTimeout(loader);
        utils.hideLoader();

        props.reglament = reglament;

        const afterUpdateReglament = this.afterUpdateReglament.bind(this);
        afterUpdateReglament(props);
      }, () => t.style.pointerEvents = 'all');
    }
  }

  afterUpdateReglament(props) {
    const { menu, idReglaments, reglament } = props;
    const { previewImg } = reglament;

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, false);

    const reglaments = Array.from(document.querySelectorAll('.theme'));
    const reglamentItem = reglaments.find((el) => +el.getAttribute('data-article') === idReglaments);

    const img = reglamentItem.querySelector('.article__img');
    img.setAttribute('src', previewImg);
  }
}

export default UpdateEvents;
