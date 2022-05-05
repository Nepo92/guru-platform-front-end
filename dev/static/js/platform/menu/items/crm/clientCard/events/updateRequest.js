import Utils from '../../../../../utils/utils.js';
import Validation from '../../../../../utils/validation.js';
import { clientAPI } from '../../../../../api/api.js';

const utils = new Utils();
const validation = new Validation();

class UpdateRequest {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
      menu: document.querySelector('[js-menu-client-card]'),
    };

    const { menu } = props;

    const updateBtn = menu.querySelector('[edit-client]');

    if (updateBtn) {
      const update = this.updateClientInfo.bind(this, props);
      const cloneUpdate = utils.setCloneElement(updateBtn);

      cloneUpdate.addEventListener('click', update);
    }
  }

  getData(clientCardPack) {
    const { client, menu } = clientCardPack;

    const inputName = menu.querySelector('[js-change-client-name]').value;
    const name = inputName || client.name;

    const inputPhone = menu.querySelector('[client-phone]').value;
    const phone = inputPhone || inputPhone;

    const inputEmail = menu.querySelector('[client-email]').value;
    const email = inputEmail || '';

    const inputLink = menu.querySelector('[client-vk]').value;
    const link = inputLink || '';

    const inputTelegram = menu.querySelector('[client-telegram]').value;
    const telegram = inputTelegram || '';

    client.name = name.trim();
    client.phone = phone.trim();
    client.email = email.trim();
    client.link = link.trim();
    client.telegram = telegram.trim();

    return client;
  }

  updateClientInfo(clientCardPack, e) {
    const t = e.target;

    const props = this.getProps(clientCardPack);

    const { menu, clientObs } = props;
    const form = menu.querySelector('.platform-modal__form');

    if (validation.validateClient(form)) {
      const data = this.getData(props);

      const updateClient = clientAPI.saveChanges(data);

      updateClient.then((clientData) => {
        props.client = clientData;
        props.target = t;

        const after = clientObs.init.bind(clientObs);
        after(props);

        this.updateInTable(props);
      });
    }
  }

  updateInTable(props) {
    const {
      client,
      clientCardObs,
      rowEventsObs,
      rerenderContent,
    } = props;

    const dealRows = document.querySelectorAll(`.platform-table__row[data-client="${client.id}"]`);

    const access = ['deals', 'transactions', 'head-manager-transactions'];

    if (dealRows.length && access.includes(utils.getPage())) {
      const clientDeals = props.pack.items.filter((el) => el.idClient === client.id);

      if (clientDeals.length) {
        let items = props.pack.items.pageItems || props.pack.items;

        items = items.map((el) => {
          if (el.idClient === client.id) {
            el.clientLink = client.link;
            el.clientName = client.name;
            el.clientPhone = client.phone;
            el.clientTelegram = client.telegram;
          }

          return el;
        });

        props.pack.items = items;
      }

      rerenderContent.init(props).then(() => {
        clientCardObs.init(props);
        rowEventsObs.init(props);
      });
    }
  }

  getProps(clientCardPack) {
    const {
      client,
      clientObs,
      defaultTab,
      menu,
      pack,
      target,
      clientCardObs,
      rowEventsObs,
      rerenderContent,
    } = clientCardPack;

    const props = {
      client,
      clientObs,
      defaultTab,
      menu,
      pack,
      target,
      clientCardObs,
      rowEventsObs,
      rerenderContent,
    };

    return props;
  }
}

export default UpdateRequest;
