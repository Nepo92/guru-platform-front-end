import Receipt from '../receipt/receipt.js';
import AddBill from './events/addBill/addBill.js';
import RemoveBill from './events/removeBill/removeBill.js';
import UpdateBill from './events/updateBill/updateBill.js';
import CopyLink from './events/copyLink/copyLink.js';
import Utils from '../../../../utils/utils.js';
import CheckBillStatus from './events/checkBillStatus/checkBillStatus.js';

const receipt = new Receipt();
const addBill = new AddBill();
const removeBill = new RemoveBill();
const updateBill = new UpdateBill();
const copyLink = new CopyLink();
const utils = new Utils();
const checkBillStatus = new CheckBillStatus();

class BillEvents {
  init(props) {
    const { menu } = props;

    const isClientCard = menu.hasAttribute('js-menu-client-card');

    if (isClientCard) {
      removeBill.init(props);
      checkBillStatus.init(props);
    } else {
      this.setBillEvents(props);
    }
  }

  setBillEvents(props) {
    const { menu } = props;

    const updateProps = {
      ...props,
      menu: document.querySelector('[add-bill-menu]'),
      timeoutCopy: null,
    };

    const distpatchBillWrapper = this.distpatchBillWrapper.bind(this, updateProps);

    const billWrapper = menu.querySelector('[js-client-bills]');
    const cloneWrapper = utils.setCloneElement(billWrapper);
    cloneWrapper.addEventListener('click', distpatchBillWrapper);
  }

  distpatchBillWrapper(props, e) {
    const t = e.target;
    const { isView } = props;

    const isUpdate = !['link__btn', 'bill__remove', 'bill__check', 'bill__status'].includes(t.classList[0]);

    const billItem = utils.getParent(t, 'bill__item') || (t.classList.contains('bill__item') ? t : false);

    if (billItem) {
      const isCreateBill = billItem?.classList.contains('bill__create');
      const isCreateBillItem = utils.getParent(t, 'bill__create') || t.classList.contains('bill__create');

      const notPaydBill = billItem.classList.contains('payd');

      const update = ((billItem && !isCreateBill && !notPaydBill) || (t && !isCreateBillItem && !notPaydBill)) && isUpdate ? 'update' : '';
      const remove = t.classList.contains('bill__remove') ? 'remove' : '';
      const copy = t.classList.contains('link__btn') && !t.classList.contains('payoff') ? 'copy' : '';
      const receiptBill = t.classList.contains('payoff') ? 'receipt' : '';
      const create = isCreateBillItem ? 'create' : '';
      const checkStatus = t.classList.contains('bill__status') ? 'check-status' : '';

      /* eslint-disable-next-line */
      const button = !isView ? update || remove || copy || receiptBill || create || checkStatus : receiptBill || copy;

      switch (button) {
        case 'update': {
          updateBill.init(props, e);
          break;
        }
        case 'remove': {
          removeBill.init(props, e);
          break;
        }
        case 'copy': {
          copyLink.init(props, e);
          break;
        }
        case 'receipt': {
          receipt.init(props, e);
          break;
        }
        case 'create': {
          addBill.init(props, e);
          break;
        }
        case 'check-status': {
          checkBillStatus.init(props, e);
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}

export default BillEvents;
