import Utils from '../../../../../../utils/utils.js';
import { billAPI } from '../../../../../../api/api.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemoveBill {
  init(props, e) {
    if (e) {
      this.removeFromDealCard(props, e);
    } else {
      this.removeFromClientCard(props);
    }
  }

  removeFromClientCard(props) {
    const removeBtns = document.querySelectorAll('.bill__remove');

    if (removeBtns.length) {
      const removeBill = this.removeFromDealCard.bind(this, props);

      removeBtns.forEach((item) => {
        const remove = utils.setCloneElement(item);

        remove.addEventListener('click', removeBill);
      });
    }
  }

  removeFromDealCard(props, e) {
    props.target = e.target;

    const acceptRequest = this.acceptRemove.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот счет?',
      settings: null,
      title: null,
      ok: acceptRequest,
      cancel: null,
      tartget: e.target,
    };

    popup.init(popupProps);
  }

  acceptRemove(props) {
    const removeProps = this.getProps(props);

    const { target } = removeProps;

    removeProps.menu = utils.getParent(target, 'platform-modal');

    const billItem = utils.getParent(target, 'bill__item');

    const data = {
      id: billItem.getAttribute('data-bill'),
    };

    const remove = billAPI.removeBill(data);

    remove.then(() => {
      const billWrapper = document.querySelectorAll('[js-client-bills]');

      billWrapper.forEach((elem) => {
        Array.from(elem.children).forEach((subj) => {
          subj.remove();
        });
      });

      props.tabBillObs.init(removeProps);
    });
  }

  getProps(props) {
    return utils.getDeepCopy(props);
  }
}

export default RemoveBill;
