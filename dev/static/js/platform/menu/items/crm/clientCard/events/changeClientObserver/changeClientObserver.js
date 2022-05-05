import SetClientInfo from '../clientInfoObserver.js';
import ClientIcons from '../clientIcons/clientIcons.js';
import UpdateClientCard from './events/updateClientCard.js';
import UpdateTableRow from './events/updateTableRow.js';
import GetAccess from '../getAccess.js';
import EditClientName from '../editClientName/editClientName.js';
import AfterSaveInfo from './events/afterSaveInfo.js';
import HideClientManager from '../hideClientManager/hideClientManager.js';

const setClientInfo = new SetClientInfo();
const clientIcons = new ClientIcons();
const updateClientCard = new UpdateClientCard();
const updateTableRow = new UpdateTableRow();
const getAccess = new GetAccess();
const editClientName = new EditClientName();
const afterSaveInfo = new AfterSaveInfo();
const hideClientManager = new HideClientManager();

class AfterUpdateInfo {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const items = [
      setClientInfo,
      clientIcons,
      updateClientCard,
      updateTableRow,
      getAccess,
      editClientName,
      hideClientManager,
    ];

    if (props.saveClient) {
      items.push(afterSaveInfo);
    }

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(clientCardPack);
    });
  }
}

export default AfterUpdateInfo;
