import { billAPI } from '../../../../../../api/api.js';
import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class CheckBillStatus {
  init(props, e) {
    if (e) {
      this.#checkFromDealMenu(props, e);
    } else {
      this.#checkFromClientCard(props);
    }
  }

  #checkFromClientCard(props) {
    const { menu } = props;

    const checkBtns = menu.querySelectorAll('.bill__status');

    if (checkBtns.length) {
      const checkBill = this.#checkFromDealMenu.bind(this, props);

      checkBtns.forEach((item) => {
        const check = utils.setCloneElement(item);
        check.addEventListener('click', checkBill);
      });
    }
  }

  #checkFromDealMenu(props, e) {
    const t = e.target;

    if (props) {
      const { client } = props;

      const billItem = utils.getParent(t, 'platform-table__row') || utils.getParent(t, 'bill__item');

      const idBill = +billItem.getAttribute('data-bill');
      const idClient = +billItem.getAttribute('data-client') || client.id;

      const getInfo = billAPI.checkBillSatus(idClient, idBill);

      t.style.pointerEvents = 'none';

      getInfo.then(() => {
        t.style.pointerEvents = 'all';
      }, () => {
        t.style.pointerEvents = 'all';
      });
    }
  }
}

export default CheckBillStatus;
