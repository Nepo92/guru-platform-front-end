import Utils from '../../../../../utils/utils.js';
import Popup from '../../../../../modules/popup/popup.js';
import { clientCleanerAPI } from '../../../../../api/api.js';

const popup = new Popup();
const utils = new Utils();

class RemoveClient {
  init(props, t) {
    const removeClient = this.removeClient.bind(this, props, t);

    const popupProps = {
      text: 'Вы действительно хотите удалить этого клиента?',
      settings: null,
      title: null,
      ok: removeClient,
      cancel: null,
      target: t,
    };

    popup.init(popupProps);
  }

  removeClient(props, t) {
    const clientItem = utils.getParent(t, 'coincedence-client__item');
    const idClient = +clientItem.getAttribute('data-id');

    const remove = clientCleanerAPI.removeClient(idClient);

    remove.then(() => {
      const clientItemRemoved = document.querySelector(`.coincedence-client__item[data-id="${idClient}"]`);

      if (clientItemRemoved) {
        const index = +utils.getParent(clientItemRemoved, 'coincedence-client__list')?.getAttribute('data-index');

        clientItemRemoved.remove();

        const quanity = document.querySelector(`.coincedence__item[data-index="${index}"] .coincedence__quanity`);
        const quanityValue = parseInt(quanity.innerText, 10);
        quanity.innerText = `${quanityValue - 1} шт`;
      }
    });
  }
}

export default RemoveClient;
