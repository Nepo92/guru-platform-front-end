import UpdateRequest from '../../updateRequest.js';
import Tabs from '../../../../tabs/tabs.js';

const updateRequest = new UpdateRequest();
const tabs = new Tabs();

class AfterSaveInfo {
  init(clientCardPack) {
    const { client } = clientCardPack;

    const items = [updateRequest, tabs];

    const clientPack = {
      ...clientCardPack,
      defaultTab: 'Сделки',
      client,
    };

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(clientPack);
    });
  }
}

export default AfterSaveInfo;
