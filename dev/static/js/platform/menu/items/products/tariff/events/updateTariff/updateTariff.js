import Utils from '../../../../../../utils/utils.js';
import { tariffAPI } from '../../../../../../api/api.js';
import SetTariffData from './events/setTariffData.js';
import UpdateTariffRequest from './request/updateTariffRequest.js';
import DeleteTariff from '../deleteTariff/deleteTariff.js';
import CloseMenu from './events/closeMenu.js';

const utils = new Utils();
const setData = new SetTariffData();
const updateTariffRequest = new UpdateTariffRequest();
const deleteTariff = new DeleteTariff();
const closeMenu = new CloseMenu();

class UpdateTariff {
  init(props) {
    const updateBtns = document.querySelectorAll('[update-tariff]');

    if (updateBtns.length) {
      const updateTariff = this.updateTariff.bind(this, props);

      updateBtns.forEach((item) => {
        const update = utils.setCloneElement(item);
        update.addEventListener('click', updateTariff);
      });
    }
  }

  updateTariff(props, e) {
    const t = e.target;

    const updateProps = {
      ...props,
      menu: document.querySelector('[js-menu-update-tariff]'),
    };

    const { menu } = updateProps;

    utils.openModalAnimation(menu, true);

    const idTariff = +utils.getParent(t, 'tariff-block').querySelector('[tariff-id]').getAttribute('data-id');

    const getTariff = tariffAPI.getTariff(idTariff);

    t.style.pointerEvents = 'none';

    getTariff.then((tariff) => {
      t.style.pointerEvents = 'all';
      updateProps.tariff = tariff;

      const items = [setData, updateTariffRequest, deleteTariff, closeMenu];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(updateProps);
      });
    }, () => {
      t.style.pointerEvents = 'all';
    });
  }
}

export default UpdateTariff;
