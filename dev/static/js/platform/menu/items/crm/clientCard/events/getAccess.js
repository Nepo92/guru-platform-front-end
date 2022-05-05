import AccessDefault from './getAccess/accessDefault.js';
import ChangeAccess from './getAccess/changeAccess.js';
import { clientAPI } from '../../../../../api/api.js';

const accessDefault = new AccessDefault();
const changeAccess = new ChangeAccess();

class GetAccess {
  init(clientCardPack) {
    const { client } = clientCardPack;

    if (clientCardPack.saveClient) {
      const getAccess = clientAPI.getAccess(client.id);

      getAccess.then((access) => {
        const after = accessDefault.init.bind(accessDefault);

        clientCardPack.client.idUser = access.id;
        clientCardPack.client.userLogin = access.username;
        clientCardPack.client.userPassword = access.password;
        after(clientCardPack);
      });
    } else {
      const items = [accessDefault, changeAccess];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(clientCardPack);
      });
    }
  }
}

export default GetAccess;
