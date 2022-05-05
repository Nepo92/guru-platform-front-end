import Utils from '../../../../../../utils/utils.js';
import { tariffAPI } from '../../../../../../api/api.js';

const utils = new Utils();

class DeleteTariff {
  init(props) {
    const { menu } = props;

    const removeBtn = menu.querySelector('[js-remove-tariff]');

    if (removeBtn) {
      const remove = utils.setCloneElement(removeBtn);

      const removeTariff = this.removeTariff.bind(this, props);

      remove.addEventListener('click', removeTariff);
    }
  }

  removeTariff(props, e) {
    const { tariff, menu } = props;
    const { id } = tariff;
    const t = e.target;

    const deleted = tariffAPI.deleteTariff(id);

    t.style.pointerEvents = 'none';

    deleted.then(() => {
      t.style.pointerEvents = 'all';
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, true, false);

      const blocks = document.querySelectorAll('.tariff-block');

      blocks.forEach((item) => {
        if (!item.classList.contains('create-tariff')) {
          const idBlock = +item.querySelector('[tariff-id]').getAttribute('data-id');

          if (idBlock === id) {
            item.remove();
          }
        }
      });
    }, () => {
      t.style.pointerEvents = 'all';
    });
  }
}

export default DeleteTariff;
