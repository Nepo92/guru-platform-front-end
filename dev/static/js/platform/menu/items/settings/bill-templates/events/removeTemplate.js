import Utils from '../../../../../utils/utils.js';
import { billTemplateAPI } from '../../../../../api/api.js';
import Popup from '../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemoveTemplate {
  init(props) {
    const footerBtn = document.querySelector('[remove-bill-template]');

    if (footerBtn) {
      const footerItem = utils.setCloneElement(footerBtn);

      const setRemoveModal = this.setRemoveModal.bind(this, props);

      footerItem.addEventListener('click', setRemoveModal);
    }
  }

  setRemoveModal(props, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    props.target = t;

    const removeTemplate = this.removeTemplate.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот шаблон?',
      settings: null,
      title: null,
      ok: removeTemplate,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  removeTemplate(props) {
    const { currentTemplate, menu, target } = props;

    const remove = billTemplateAPI.removeBillTemplate(currentTemplate.id);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    target.style.pointerEvents = 'none';

    remove.then(() => {
      clearTimeout(loader);
      utils.hideLoader();

      target.style.pointerEvents = 'all';

      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, false);

      Array.from(document.querySelectorAll('.templates__item')).find((el) => +el.getAttribute('data-id') === currentTemplate.id).remove();
    }, () => target.style.pointerEvents = 'all');
  }
}

export default RemoveTemplate;
