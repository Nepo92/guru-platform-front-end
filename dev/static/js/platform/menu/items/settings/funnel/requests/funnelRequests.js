import { dealAPI, funnelAPI } from '../../../../../api/api.js';
import ContentManager from '../../../../../contentManager/contentManager.js';
import Utils from '../../../../../utils/utils.js';
import Popup from '../../../../../modules/popup/popup.js';

const contentManager = new ContentManager();
const utils = new Utils();
const popup = new Popup();

class FunnelRequests {
  async saveRequest(props) {
    const data = this.getSaveData(props);

    await funnelAPI.funnelAdd(data);
    const funnels = await dealAPI.getFunnels();
    props.pack.funnels = funnels;

    return await contentManager.init(props);
  }

  getSaveData(props) {
    const { pack, newFunnelData } = props;
    const { company } = pack;
    const { id } = company;
    const { funnelName, dealType } = newFunnelData;

    return {
      idCompany: id,
      funnelName,
      dealType,
    };
  }

  funnelRemove(props, e) {
    const t = e.target;

    props.target = t;

    props.deletedId = this.getRemoveData(props);

    const removeFromAPI = this.removeFromAPI.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить эту воронку?',
      settings: null,
      title: null,
      ok: removeFromAPI,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  cancelDelete() {
    const deleteBoard = document.querySelector('[delete-board]');

    if (deleteBoard) {
      deleteBoard.style.bottom = '-100%';
    }
  }

  getRemoveData(props) {
    const { target } = props;

    return +utils.getParent(target, 'funnels-funnel__item').querySelector('[funnels-id]').value;
  }

  removeFromAPI(props) {
    const remove = funnelAPI.funnelRemove(props.deletedId);

    remove.then(() => {
      this.remove(props.deletedId);
    });
  }

  remove(id) {
    const items = document.querySelectorAll('[funnels-item]');

    items.forEach((item) => {
      if (+item.querySelector('[funnels-id]').value === id) {
        item.remove();
      }
    });
  }
}

export default FunnelRequests;
