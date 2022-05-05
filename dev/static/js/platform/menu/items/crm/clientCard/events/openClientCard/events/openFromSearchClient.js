import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class OpenFromSearchClient {
  openClientCard(clientCardPack) {
    const { target, openMenu } = clientCardPack;

    const clientCard = utils.getParent(target, 'client');

    if (clientCard) {
      const idClient = clientCard.querySelector('[js-client-id]').value;

      clientCardPack.idClient = idClient;

      const openClientCard = openMenu.bind(this);
      openClientCard(clientCardPack);
    }
  }
}

export default OpenFromSearchClient;
