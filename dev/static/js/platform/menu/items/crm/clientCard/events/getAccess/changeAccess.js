import Utils from '../../../../../../utils/utils.js';
import { clientAPI } from '../../../../../../api/api.js';
import AfterGetAccess from './afterGetAccess.js';

const utils = new Utils();
const afterGetAccess = new AfterGetAccess();

class ChangeAccess {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const clientCard = document.querySelector('[js-menu-client-card]');

    const accessBtn = clientCard.querySelector('.access-item__btn');

    if (accessBtn) {
      const giveAccess = this.giveAccess.bind(this, props);
      const acceess = utils.setCloneElement(accessBtn);
      acceess.addEventListener('click', giveAccess);
    }
  }

  giveAccess(clientCardPack, e) {
    const { client } = clientCardPack;
    const t = e.target;

    clientCardPack.target = t;

    t.style.pointeEvents = 'none';

    const getAccess = clientAPI.getAccess(client.id);

    getAccess.then((access) => {
      const after = afterGetAccess.init.bind(afterGetAccess);

      clientCardPack.client.idUser = access.id;
      clientCardPack.client.userLogin = access.username;
      clientCardPack.client.userPassword = access.password;
      after(clientCardPack);
    });
  }
}

export default ChangeAccess;
