import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class OpenFromClientList {
  openClientCard(clientCardPack) {
    const { target, openMenu } = clientCardPack;

    const clientCard = utils.getParent(target, 'clients__item');

    if (clientCard) {
      const idClient = clientCard.getAttribute('data-client');

      clientCardPack.idClient = idClient;

      const openClientCard = openMenu.bind(this);
      openClientCard(clientCardPack);
    }
  }
}

export default OpenFromClientList;
