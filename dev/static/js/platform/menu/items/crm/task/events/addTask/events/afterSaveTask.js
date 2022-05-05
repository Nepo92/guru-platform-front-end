import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

const DEALS = 'deals';
const TRANSACTIONS = 'transactions';
const HEAD_MANAGER_TRANSACTIONS = 'head-manager-transactions';

class AfterSaveTask {
  init(props) {
    const { target } = props;
    const updateInDealCard = props.tabTaskObs;
    const updateInClientCard = props.dealObs;

    const items = [updateInDealCard, updateInClientCard];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });

    const access = [DEALS, TRANSACTIONS, HEAD_MANAGER_TRANSACTIONS];

    if (access.includes(utils.getPage())) {
      props.updateInTable(props);
    }

    target.style.pointerEvents = 'none';
  }
}

export default AfterSaveTask;
