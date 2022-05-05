import Utils from '../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../api/api.js';
import AfterHideDeal from './events/afterHideDeal.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

const afterHideDeal = new AfterHideDeal();

class HideDealFromTable {
  init(props) {
    const hideBtn = document.querySelectorAll('.platform-table [js-hide-deal-btn]');

    if (hideBtn.length) {
      const setPopup = this.setPopup.bind(this, props);

      hideBtn.forEach((item) => {
        const hide = utils.setCloneElement(item);
        hide.addEventListener('click', setPopup);
      });
    }
  }

  setPopup(props, e) {
    const t = e.target;

    t.style.pointerEvents = 'none';

    props.target = t;

    const hideRequest = this.hideRequest.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить эту сделку?',
      settings: null,
      title: null,
      ok: hideRequest,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  hideRequest(props) {
    const { target } = props;

    const id = utils.getParent(target, 'platform-table__row').getAttribute('data-deal');

    const data = {
      id,
    };

    const hideDeal = dealAPI.hideDeal(data);

    hideDeal.then(() => {
      const items = [afterHideDeal];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(props);
      });
    });
  }
}

export default HideDealFromTable;
