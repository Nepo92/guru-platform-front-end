import CopyClientLink from './events/copyClientLink.js';
import OpenCourse from './events/openCourse/openEditMenu/openCourse.js';
import Select from '../../../../modules/select/select.js';
import HideDealFromTable from './events/hideDealFromTable/hideDeal.js';
import RevealDealFromTable from './events/revealDealFromTable/revealDealFromTable.js';
import Tooltip from '../../../../modules/tooltip/tooltip.js';
import RemoveBill from './events/removeBill.js';
import EditBill from './events/editBill.js';
import PayBill from '../receipt/receipt.js';
import Utils from '../../../../utils/utils.js';
import CheckBillStatus from '../bill/events/checkBillStatus/checkBillStatus.js';
import ClientCard from '../clientCard/clientCard.js';
import ContentManager from '../../../../contentManager/contentManager.js';
import CopyClientPhone from './events/copyClientPhone.js';

const copyClientLink = new CopyClientLink();
const openCourse = new OpenCourse();
const select = new Select();
const hideDealFromTable = new HideDealFromTable();
const revealDealFromTable = new RevealDealFromTable();
const tooltip = new Tooltip();
const removeBill = new RemoveBill();
const editBill = new EditBill();
const receipt = new PayBill();
const utils = new Utils();
const checkBillStatus = new CheckBillStatus();
const copyClientPhone = new CopyClientPhone();

class DealRowEvents {
  init(pack) {
    const pagination = document.querySelector('.pagination');

    if (pagination) {
      pagination.classList.remove('hide');
    }

    pack.rowEventsObs = new DealRowEvents();
    pack.clientCardObs = new ClientCard();
    pack.rerenderContent = new ContentManager();

    const items = [
      tooltip,
      copyClientLink,
      hideDealFromTable,
      revealDealFromTable,
      openCourse,
      removeBill,
      editBill,
      copyClientPhone,
    ];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(pack);
    });

    const checkBtn = document.querySelectorAll('[js-check-add]');

    if (checkBtn.length) {
      const receiptMenuOpen = receipt.init.bind(receipt, pack);

      checkBtn.forEach((item) => {
        const btn = utils.setCloneElement(item);
        btn.addEventListener('click', receiptMenuOpen);
      });
    }

    const selects = document.querySelectorAll('[deal-select-type="status-select"]');

    if (selects.length) {
      selects.forEach((item) => {
        utils.removeChildren(item);
      });

      const getStatusSelectData = this.setStatusSelect(pack, selects);

      getStatusSelectData.then(() => {
        select.init(pack);
      });
    }

    this.checkBillStatus(pack);
  }

  async setStatusSelect(props, selects) {
    props.selectsArray = [];

    selects.forEach(async (selectItem) => {
      const value = selectItem.getAttribute('data-status-code');
      const code = selectItem.getAttribute('data-code');

      const isBroken = selectItem.getAttribute('data-status-name') === 'Рассрочка' ? 'Долями' : false;
      const isSuccess = selectItem.getAttribute('data-status-name') === 'Успешно реализована' ? 'Реализована' : false;

      const name = isBroken || isSuccess || selectItem.getAttribute('data-status-name');

      const selectProps = {
        required: false,
        placeholder: null,
        mode: 'hover-close',
        type: 'select-status',
        uniqClass: null,
        item: selectItem,
        defaultValue: value,
        defaultCode: code,
        defaultPlaceholder: name,
        name: null,
      };

      await props.selectsArray.push(selectProps);
    });
  }

  checkBillStatus(pack) {
    const statusBillBtn = document.querySelectorAll('.bill-status');

    if (statusBillBtn.length) {
      const checkStatus = checkBillStatus.init.bind(checkBillStatus, pack);

      statusBillBtn.forEach((item) => {
        const status = utils.setCloneElement(item);

        status.addEventListener('click', checkStatus);
      });
    }
  }
}

export default DealRowEvents;
