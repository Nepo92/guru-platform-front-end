import Utils from '../../../../../../../utils/utils.js';
import Tabs from '../../../../tabs/tabs.js';

const utils = new Utils();
const tabs = new Tabs();

class AfterChangeClientHide {
  init(props) {
    this.changeBtnMode(props);
    this.removeRowsAndCard(props);
  }

  changeBtnMode(props) {
    const { client } = props;

    if (client.hidden) {
      const { menu } = props;
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, false);

      const changeBtn = this.changeBtn.bind(this, props);

      setTimeout(changeBtn, 800);
    } else {
      this.changeBtn(props);
    }
  }

  changeBtn(props) {
    const { client, menu } = props;

    const btn = menu.querySelector('[client-remove]') || menu.querySelector('[client-recover]');

    if (btn && client.hidden) {
      btn.className = 'client-nav__recover';
    } else if (btn && !client.hidden) {
      btn.className = 'client-nav__remove';
    }

    tabs.init(props);
  }

  removeRowsAndCard(props) {
    const { client } = props;

    const showToggle = document.querySelector('[js-filter-hidden-deals]');
    const accesPage = ['transactions', 'deals', 'head-manager-transactions', 'clients-list'];
    const removeClient = accesPage.includes(utils.getPage()) ? showToggle?.value !== 'false' : false;

    if (client.hidden && removeClient) {
      this.removeClientDeals(client);
    }
  }

  removeClientDeals(client) {
    const rows = document.querySelectorAll(`.platform-table__row[data-client="${client.id}"]`);

    if (rows.length) {
      rows.forEach((row) => row.remove());
    }

    const clientCard = document.querySelectorAll(`[js-client-card][data-client="${client.id}"]`);

    if (clientCard.length) {
      clientCard.forEach((card) => card.remove());
    }
  }
}

export default AfterChangeClientHide;
