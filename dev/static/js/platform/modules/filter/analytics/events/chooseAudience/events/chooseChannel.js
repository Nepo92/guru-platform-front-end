import AudienceWrapper from '../audienceWrapper.js';
import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class ChooseChannel extends AudienceWrapper {
  init() {
    const channel = document.querySelector('[js-channel]');

    if (channel) {
      const changeChannel = this.changeChannel.bind(this);

      const channelSelect = utils.setCloneElement(channel);

      channelSelect.addEventListener('change', changeChannel);
    }
  }

  changeChannel() {
    const channel = document.querySelector('#channel');
    const community = document.querySelector('#community');

    if (channel.value !== 'all' && channel.value !== 'unknown' && community) {
      community.value = 'Выберите аудиторию';
    } else if (channel.value === 'all' && channel.value === 'unknown' && community) {
      this.resetCommunity();
    }
  }
}

export default ChooseChannel;
