import SetClientInfo from '../../clientInfoObserver.js';
import SetRandomCircle from '../../setRandomCircle/setRandomCircle.js';
import ClientIcons from '../../clientIcons/clientIcons.js';
import GetAccess from '../../getAccess.js';
import UpdateClient from '../../updateClient.js';
import HideClientManager from '../../hideClientManager/hideClientManager.js';

const setClientInfo = new SetClientInfo();
const setRandomCircle = new SetRandomCircle();
const clientIcons = new ClientIcons();
const getAccess = new GetAccess();
const updateClient = new UpdateClient();
const hideClientManager = new HideClientManager();

class AfterGetClientInfo {
  init(clientCardPack) {
    const items = [
      setClientInfo,
      setRandomCircle,
      clientIcons,
      getAccess,
      updateClient,
      hideClientManager,
    ];

    clientCardPack.openClientCard = true;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(clientCardPack);
    });
  }
}

export default AfterGetClientInfo;
