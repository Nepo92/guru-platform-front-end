import Utils from '../../../../../../utils/utils.js';
import { knowledgeBaseAPI } from '../../../../../../api/api.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();
class RemoveSection {
  init(props) {
    const { menu } = props;

    const deleteBtn = menu.querySelector('[js-delete-theme]');

    if (deleteBtn) {
      const remove = utils.setCloneElement(deleteBtn);

      const setRemoveSectionPopup = this.setRemoveSectionPopup.bind(this, props);

      remove.addEventListener('click', setRemoveSectionPopup);
    }
  }

  setRemoveSectionPopup(props, e) {
    const t = e.target;

    const removeSection = this.removeSection.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот радел?',
      settings: null,
      title: null,
      ok: removeSection,
      cancel: false,
      target: t,
    };

    popup.init(popupProps);
  }

  removeSection(props) {
    const { idSection, menu } = props;

    const remove = knowledgeBaseAPI.removeSection(idSection);

    remove.then(() => {
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, false);

      const sections = Array.from(document.querySelectorAll('.theme'));

      const removed = sections.find((el) => el.getAttribute('data-theme') === idSection);
      removed.remove();
    });
  }
}

export default RemoveSection;
