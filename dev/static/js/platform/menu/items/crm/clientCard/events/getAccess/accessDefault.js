import CopyAccess from './copyAccess.js';
import ClientCardTemplates from '../../templates/clientCardTemplates.js';

const copyAccess = new CopyAccess();
const clientCardTemplates = new ClientCardTemplates();

class AccessDefault {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const { client } = props;

    if (client?.idUser !== 0) {
      const setActive = this.setActive.bind(this);
      setActive(props);
    } else {
      const setDisable = this.setDisable.bind(this);
      setDisable(props);
    }
  }

  setActive(clientCardPack) {
    const { client } = clientCardPack;
    const clientCard = document.querySelector('[js-menu-client-card]');

    const access = clientCard.querySelector('.access-item');
    clientCardPack.accessItem = access;

    const getActiveClass = this.getActiveClass.bind(this);
    getActiveClass(clientCardPack);

    const accessInfo = clientCard.querySelector('.access-item__body');

    if (accessInfo) {
      accessInfo.remove();
    }

    const accessBtn = document.querySelector('.access-item__btn');

    if (accessBtn) {
      accessBtn.remove();
    }

    const accessItem = clientCard.querySelector('.access-item');
    accessItem.classList.add('active');
    accessItem.style.display = 'flex';

    const passwordItem = clientCard.querySelector('.client-password');

    if (passwordItem) {
      passwordItem.classList.remove('hide');

      if (passwordItem.querySelector('[pwd-value]')) {
        passwordItem.querySelector('[pwd-value]').innerText = client.userPassword;
      }
    }

    const accessArray = ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_HEAD_MANAGER', 'ROLE_CURATOR'];

    if (accessArray.includes(clientCardPack.pack.role)) {
      access.classList.remove('hide');
      const setAccessInfo = this.setAccessInfo.bind(this);
      setAccessInfo(clientCardPack);

      const setCopyAccess = copyAccess.init.bind(copyAccess);
      setCopyAccess(clientCardPack);
    } else {
      access.classList.add('hide');
    }
  }

  getActiveClass(clientCardPack) {
    const { accessItem } = clientCardPack;

    accessItem.classList.add('active');
  }

  setAccessInfo(clientCardPack) {
    const { accessItem } = clientCardPack;

    const div = document.createElement('div');
    div.classList.add('access-item__body');
    div.innerHTML = clientCardTemplates.accessTemplate(clientCardPack);

    accessItem.appendChild(div);
  }

  setDisable(props) {
    const { menu } = props;

    const clientCard = document.querySelector('[js-menu-client-card]');

    const accessItem = clientCard.querySelector('.access-item');
    accessItem.classList.remove('active');
    accessItem.style.display = 'flex';

    const accessBody = accessItem.querySelector('.access-item__body');

    const div = document.createElement('div');
    div.classList.add('access-item__btn');
    div.innerText = 'Сгенерировать доступ';

    if (accessBody) {
      accessBody.remove();
    }

    const passwordItem = clientCard.querySelector('.client-password');

    if (passwordItem) {
      passwordItem.classList.add('hide');
    }

    const accessBtn = menu.querySelector('.access-item__btn');

    if (!accessBtn) {
      accessItem.appendChild(div);
    }
  }
}

export default AccessDefault;
