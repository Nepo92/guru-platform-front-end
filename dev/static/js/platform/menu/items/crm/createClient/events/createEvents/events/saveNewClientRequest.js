import Validation from '../../../../../../../utils/validation.js';
import { clientAPI } from '../../../../../../../api/api.js';
import AfterUpdateInfo from '../../../../clientCard/events/changeClientObserver/changeClientObserver.js';
import Popup from '../../../../../../../modules/popup/popup.js';
import Utils from '../../../../../../../utils/utils.js';

const validation = new Validation();
const afterUpdateInfo = new AfterUpdateInfo();
const popup = new Popup();
const utils = new Utils();

class SaveNewClientRequest {
  init(createClientPack, e) {
    const { menu } = createClientPack;
    const t = e.target;

    createClientPack.target = t;

    const form = menu.querySelector('.platform-modal__form');

    const data = this.getNewClientData(createClientPack);

    if (validation.validateClient(form)) {
      t.style.pointerEvents = 'none';

      const loader = setTimeout(utils.showLoader, 400);

      const saveClient = clientAPI.saveClient(data);

      saveClient.then((client) => {
        clearTimeout(loader);
        utils.hideLoader();

        t.style.pointerEvents = 'all';
        const after = afterUpdateInfo.init.bind(afterUpdateInfo);
        createClientPack.client = client;
        createClientPack.clientObs = afterUpdateInfo;
        createClientPack.saveClient = true;

        after(createClientPack);
      }, () => {
        t.style.pointerEvents = 'all';
        clearTimeout(loader);
        utils.hideLoader();

        const popupProps = {
          text: 'Клиент с такими контактными данными уже существует',
          settings: 'alert-close',
          title: 'Ошибка!',
        };

        popup.init(popupProps);
      });
    }
  }

  getNewClientData(createClientPack) {
    const { menu, pack } = createClientPack;
    const { manager } = pack;

    const name = menu.querySelector('[js-change-client-name]').value.trim();
    const when = menu.querySelector('[when-create]').innerText.trim();
    const link = menu.querySelector('[client-vk]').value.trim();
    const phone = menu.querySelector('[client-phone]').value.trim();
    const email = menu.querySelector('[client-email]').value.trim();
    const telegram = menu.querySelector('[client-telegram]').value.trim();
    const color = menu.querySelector('.platform-form__avatar').getAttribute('data-color');
    const bgColor = menu.querySelector('.platform-form__avatar').getAttribute('data-bg-color');
    const borderColor = menu.querySelector('.platform-form__avatar').getAttribute('data-border-color');

    const managerId = manager.id ? manager.id : null;

    return {
      name: name || null,
      createDate: when || null,
      idManager: managerId,
      link: link || null,
      phone: phone || null,
      email: email || null,
      telegram: telegram || null,
      clientColor: {
        color,
        bgColor,
        borderColor,
      },
    };
  }
}

export default SaveNewClientRequest;
