import { fileAPI } from '../../api/api.js';
import Utils from '../../utils/utils.js';

const utils = new Utils();

class Downloads {
  init() {
    const downloadTableBtn = document.querySelector('[download-table]');

    if (downloadTableBtn) {
      const dealTables = this.dealTables.bind(this);

      const downloadTable = utils.setCloneElement(downloadTableBtn);

      downloadTable.addEventListener('click', dealTables);
    }

    const downloadDealsBtn = document.querySelector('[download-deals]');

    if (downloadDealsBtn) {
      const downloadDeals = this.downloadDeals.bind(this);

      const downloadDealButton = utils.setCloneElement(downloadDealsBtn);

      downloadDealButton.addEventListener('click', downloadDeals);
    }
  }

  dealTables() {
    utils.showLoader();

    const downloadTable = fileAPI.downloadTable();

    downloadTable.then(() => {
      utils.hideLoader();
    });
  }

  downloadDeals() {
    utils.showLoader();

    const downloadDeals = fileAPI.downloadDeals();

    downloadDeals.then(() => {
      utils.hideLoader();
    });
  }
}

export default Downloads;
