import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class OpenFromTable {
  openClientCard(clientCardPack) {
    const { target, openMenu } = clientCardPack;

    const row = utils.getParent(target, 'platform-table__row');

    if (row) {
      const idClient = row.getAttribute('data-client');

      clientCardPack.idClient = idClient;
      const openClientCard = openMenu.bind(this);
      openClientCard(clientCardPack);
    }
  }
}

export default OpenFromTable;
