import Utils from '../../../../../../../utils/utils.js';
import { tariffAPI } from '../../../../../../../api/api.js';

const utils = new Utils();

class AddTariff {
  init(props) {
    const { menu } = props;

    const saveBtn = menu.querySelector('[js-add-tariff]');

    if (saveBtn) {
      const saveTariff = utils.setCloneElement(saveBtn);

      const saveTariffRequest = this.saveTariffRequest.bind(this, props);

      saveTariff.addEventListener('click', saveTariffRequest);
    }
  }

  saveTariffRequest(props, e) {
    const { menu, id, tariffObs } = props;
    const t = e.target;

    const form = menu.querySelector('[js-add-tariff-form]');

    // eslint-disable-next-line
    if (validateForm(form)) {
      t.style.pointerEvents = 'none';

      utils.showLoader();

      const data = {
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

      const saveTariff = tariffAPI.saveTariff(data);

      saveTariff.then(() => {
        t.style.pointerEvents = 'all';
        const wrapper = menu.querySelector('.platform-modal__wrapper');
        utils.closeModalAnimation(menu, wrapper, false, true, false);

        const tariffBlocks = menu.querySelector('.menu-tariff__blocks');
        tariffBlocks?.remove();
        tariffObs.getTariff(props);
        utils.hideLoader();
      }, () => {
        t.style.pointerEvents = 'all';
      });
    }
  }
}

export default AddTariff;
