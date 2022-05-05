import Utils from '../../../../../../../utils/utils.js';
import { tariffAPI } from '../../../../../../../api/api.js';

const utils = new Utils();

class UpdateTariffRequest {
  init(props) {
    const { menu } = props;

    const updateBtn = menu.querySelector('[js-update-tariff]');

    if (updateBtn) {
      const updateTariff = this.updateTariff.bind(this, props);

      const update = utils.setCloneElement(updateBtn);

      update.addEventListener('click', updateTariff);
    }
  }

  updateTariff(props) {
    const {
      menu,
      id,
      tariffObs,
      tariff,
    } = props;

    const form = menu.querySelector('[js-update-tariff-form]');

    // eslint-disable-next-line
    if (validateForm(form)) {
      utils.showLoader();

      const data = {
        id: tariff.id,
        name: menu.querySelector('[tariff-name]').value,
        price: menu.querySelector('[tariff-coast]').value,
        courseBlocks: [],
        idCourse: id,
      };

      const blocks = menu.querySelectorAll('[block-checbox]');

      blocks.forEach((block) => {
        if (block.checked) {
          const obj = {
            id: +block.getAttribute('data-id'),
          };

          data.courseBlocks.push(obj);
        }
      });

      const deleted = [];

      blocks.forEach((item) => {
        tariff.courseBlocks.forEach((elem) => {
          if (+item.getAttribute('data-id') === elem.id) {
            if (!item.checked) {
              deleted.push(elem.id);
            }
          }
        });
      });

      const updatingBox = {};

      updatingBox.keyField = data;
      updatingBox.valueField = deleted;

      const saveTariff = tariffAPI.updateTariff(updatingBox);

      saveTariff.then(() => {
        const wrapper = menu.querySelector('.platform-modal__wrapper');
        utils.closeModalAnimation(menu, wrapper, false, true, false);

        const tariffBlocks = menu.querySelector('.menu-tariff__blocks');
        tariffBlocks.remove();
        tariffObs.getTariff(props);
        utils.hideLoader();
      });
    }
  }
}

export default UpdateTariffRequest;
