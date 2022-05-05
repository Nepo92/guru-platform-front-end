import Utils from '../../../../../utils/utils.js';
import { billAPI } from '../../../../../api/api.js';
import Popup from '../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemoveBill {
  init(props) {
    const removeBills = document.querySelectorAll('[js-delete-bill]');

    if (removeBills.length) {
      const removeBill = this.removeBill.bind(this, props);

      removeBills.forEach((item) => {
        const remove = utils.setCloneElement(item);
        remove.addEventListener('click', removeBill);
      });
    }
  }

  removeBill(props, e) {
    props.target = e.target;

    const acceptRequest = this.acceptRemove.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот счет?',
      settings: null,
      title: null,
      ok: acceptRequest,
      cancel: null,
    };

    popup.init(popupProps);
  }

  acceptRemove(props) {
    const { target } = props;

    const billItem = utils.getParent(target, 'platform-table__row');

    const data = {
      id: billItem.getAttribute('data-bill'),
    };

    const remove = billAPI.removeBill(data);

    remove.then(() => {
      billItem.remove();

      const popupElem = document.querySelector('.platform-remove__wrapper');

      if (popupElem) {
        popup.removePopup();
      }
    });
  }
}

export default RemoveBill;
