import AccessDefault from './accessDefault.js';

const accessDefault = new AccessDefault();

class AfterGetAccess {
  init(clientCardPack) {
    const { target } = clientCardPack;
    target.style.pointerEvents = 'none';

    const accessInit = accessDefault.init.bind(accessDefault);
    accessInit(clientCardPack);
  }
}

export default AfterGetAccess;
