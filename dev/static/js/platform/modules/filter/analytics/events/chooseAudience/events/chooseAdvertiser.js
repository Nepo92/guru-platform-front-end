import AudienceWrapper from '../audienceWrapper.js';
import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class ChooseAdvertiser extends AudienceWrapper {
  init() {
    const advSelect = document.querySelector('[js-advertiser]');

    if (advSelect) {
      const advertiser = utils.setCloneElement(advSelect);

      const resetAdvertiser = this.resetAdvertiser.bind(this);

      advertiser.addEventListener('change', resetAdvertiser);
    }
  }

  resetAdvertiser() {
    this.resetPlatform();
    this.resetChannel();
    this.resetCommunity();
  }
}

export default ChooseAdvertiser;
