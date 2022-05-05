import Utils from '../../../../../../utils/utils.js';
import { clientAPI } from '../../../../../../api/api.js';
import Tabs from '../../../tabs/tabs.js';
import OpenFromTable from './events/openFromTable.js';
import OpenFromClientList from './events/openFromClientList.js';
import OpenFromSearchClient from './events/openFromSearchClient.js';
import SetDataClientCard from '../setDataClientCard/setDataClientCard.js';
import EditClientName from '../editClientName/editClientName.js';
import HideClientManager from '../hideClientManager/hideClientManager.js';
import IChangePassword from '../changePassword/IChangePassword.js';
import GetAccess from '../getAccess.js';

const utils = new Utils();
const tabs = new Tabs();
const openFromTable = new OpenFromTable();
const openFromClientList = new OpenFromClientList();
const openFromSearchClient = new OpenFromSearchClient();
const setDataClientCard = new SetDataClientCard();
const editClientName = new EditClientName();
const hideClientManager = new HideClientManager();
const iChangePassword = new IChangePassword();
const getAccess = new GetAccess();

class OpenClientCard {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const clientCardBtns = document.querySelectorAll('[js-client-card]');

    if (clientCardBtns.length) {
      const openClientCard = this.openClientCard.bind(this, props);

      clientCardBtns.forEach((item) => {
        const cloneClientCard = utils.setCloneElement(item);
        cloneClientCard.addEventListener('click', openClientCard);
      });
    }
  }

  openClientCard(clientCardPack, e) {
    e.preventDefault();

    const t = e.target;

    if (t.classList.contains('client-phone__icon')) {
      return false;
    }

    const items = [
      openFromTable,
      openFromClientList,
      openFromSearchClient,
    ];

    clientCardPack.target = t;

    const openMenu = this.openMenu.bind(this);
    clientCardPack.openMenu = openMenu;
    clientCardPack.menu = document.querySelector('[js-menu-client-card]');

    items.forEach((item) => {
      const open = item.openClientCard.bind(item);
      open(clientCardPack);
    });
  }

  openMenu(clientCardPack) {
    const { menu } = clientCardPack;
    utils.openModalAnimation(menu, true);

    menu.querySelector('.platform-form__items').scrollTop = '0';

    const setEvents = this.setEvents.bind(this);
    setEvents(clientCardPack);
  }

  setEvents(clientCardPack) {
    const { idClient, pack } = clientCardPack;
    const { role } = pack;

    const getClientInfo = role !== 'ROLE_CURATOR' ? clientAPI.getClientInfo(idClient) : this.#getClientInfo(clientCardPack);

    getClientInfo.then((client) => {
      clientCardPack.tabsCallBack = new Tabs();
      clientCardPack.client = client;

      const items = [
        getAccess,
        setDataClientCard,
        hideClientManager,
        tabs,
        iChangePassword,
      ];

      if (role !== 'ROLE_CURATOR') {
        items.push(editClientName);
      }

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(clientCardPack);
      });
    });
  }

  async #getClientInfo(clientCardPack) {
    const { target, pack } = clientCardPack;
    const { items } = pack;

    const currentDeal = +utils.getParent(target, 'platform-table__row').getAttribute('data-deal');

    const currentClient = await items.find((el) => el.idDeal === currentDeal).client;

    return currentClient;
  }
}

export default OpenClientCard;
