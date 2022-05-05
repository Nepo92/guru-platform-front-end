import Utils from '../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../api/api.js';
import AfterHideDeal from './events/afterHideDeal.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const afterHideDeal = new AfterHideDeal();
const popup = new Popup();

class HideDeal {
  init(dealCardPack) {
    const {
      showManager,
      hideManager,
    } = dealCardPack;

    const hidePack = {
      ...dealCardPack,
      menu: document.querySelector('[js-menu-client-card]'),
      showManager,
      hideManager,
    };

    const { menu } = hidePack;

    if (menu) {
      const hideBtn = menu.querySelectorAll('[js-hide-deal-btn]');

      if (hideBtn.length) {
        const hideThisDeal = this.hideDeal.bind(this, hidePack);

        hideBtn.forEach((item) => {
          const hideButton = utils.setCloneElement(item);
          hideButton.addEventListener('click', hideThisDeal);
        });
      }
    }
  }

  hideDeal(dealCardPack, e) {
    const t = e.target;

    dealCardPack.target = t;

    const setPopup = this.setPopup.bind(this);
    setPopup(dealCardPack);
  }

  setPopup(dealCardPack) {
    const { target } = dealCardPack;

    target.style.pointerEvents = 'none';

    const hideRequest = this.hideRequest.bind(this, dealCardPack);

    const popupProps = {
      text: 'Вы действительно хотите удалить эту сделку?',
      settings: null,
      title: null,
      ok: hideRequest,
      cancel: null,
      target,
    };

    popup.init(popupProps);
  }

  hideRequest(dealCardPack) {
    const { target } = dealCardPack;

    const id = utils.getParent(target, 'deal-card').getAttribute('data-deal');

    const data = {
      id,
    };

    const hideDeal = dealAPI.hideDeal(data);

    hideDeal.then(() => {
      const items = [afterHideDeal];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(dealCardPack);
      });
    });
  }
}

export default HideDeal;
