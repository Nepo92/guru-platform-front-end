import Utils from '../../../../../utils/utils.js';
import { reglamentAPI } from '../../../../../api/api.js';
import Popup from '../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class DeleteReglament {
  init(props) {
    const { target } = props;

    const removeReglament = this.removeReglament.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот регламент?',
      settings: null,
      title: null,
      ok: removeReglament,
      cancel: null,
      target,
    };

    popup.init(popupProps);
  }

  removeReglament(props) {
    const { idReglament, menu } = props;
    const remove = reglamentAPI.deleteReglament(idReglament);

    const loader = setTimeout(utils.showLoader, 400);

    remove.then(() => {
      clearInterval(loader);
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, false);

      const reglament = document.querySelector(`.theme[data-article="${idReglament}"]`);

      if (reglament) {
        reglament.remove();
      }
    });
  }
}

export default DeleteReglament;
