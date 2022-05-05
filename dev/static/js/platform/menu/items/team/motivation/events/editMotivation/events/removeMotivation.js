import Utils from '../../../../../../../utils/utils.js';
import { motivationAPI } from '../../../../../../../api/api.js';
import Popup from '../../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemoveMotivation {
  init(props) {
    const { blockProps } = props;
    const { menu } = blockProps;

    const removeBtn = menu.querySelector('[js-motivation-delete]');

    if (removeBtn) {
      const removeMotivation = this.removeMotivation.bind(this, props);

      const remove = utils.setCloneElement(removeBtn);

      remove.addEventListener('click', removeMotivation);
    }
  }

  removeMotivation(props, e) {
    const t = e.target;

    const removeRequest = this.removeRequest.bind(this, props);

    const popupProps = {
      text: 'Вы действтельно хотите удалить эту мотивацию?',
      settings: null,
      title: null,
      ok: removeRequest,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  removeRequest(props) {
    const { blockProps } = props;
    const { currentWage, menu } = blockProps;

    const remove = motivationAPI.removeMotivation(currentWage.id);

    remove.then(() => {
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, true, false, false);

      utils.getParent(document.querySelector(`.motivation-now__wage[value="${currentWage.id}"]`), 'motivation-now__block').remove();
    });
  }
}

export default RemoveMotivation;
