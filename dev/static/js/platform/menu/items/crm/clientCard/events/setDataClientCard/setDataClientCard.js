import AfterGetClientInfo from './events/afterGetClientInfo.js';

const afterGetClientInfo = new AfterGetClientInfo();

class SetDataClientCard {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const setData = this.setData.bind(this);
    setData(props);
  }

  setData(clientCardPack) {
    const afterGetClient = afterGetClientInfo.init.bind(afterGetClientInfo);
    afterGetClient(clientCardPack);
  }
}

export default SetDataClientCard;
