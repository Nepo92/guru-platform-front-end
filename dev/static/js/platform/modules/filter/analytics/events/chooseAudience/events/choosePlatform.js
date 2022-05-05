import AudienceWrapper from '../audienceWrapper.js';
import Utils from '../../../../../../utils/utils.js';
import { funnelAPI } from '../../../../../../api/api.js';

const utils = new Utils();

class ChoosePlatform extends AudienceWrapper {
  init() {
    const platform = document.querySelector('[js-platform]');

    if (platform) {
      const changePlatform = this.changePlatform.bind(this);

      const platformSelect = utils.setCloneElement(platform);
      platformSelect.addEventListener('change', changePlatform);
    }
  }

  changePlatform(e) {
    const t = e.target;

    const channel = document.querySelector('#channel');

    if (t.value === 'unknown') {
      utils.removeChildren(channel);

      const option = this.setOption('unknown', 'Неизвестно', true);

      channel.appendChild(option);

      this.resetCommunity();
    } else {
      this.resetChannel();

      const form = document.querySelector('[funnel-filter-form]');

      const formData = new FormData(form);
      this.setChannelByPlatform(formData, t);
    }
  }

  setChannelByPlatform(formData, t) {
    const getChannels = funnelAPI.getChannel(formData);

    t.setAttribute('disabled', '');

    getChannels.then((channels) => {
      this.afterGetChannels(channels, t);
    }, () => t.removeAttribute('disabled'));
  }

  afterGetChannels(channels, t) {
    t.removeAttribute('disabled');
    const channel = document.querySelector('#channel');

    utils.removeChildren(channel, 0);

    channels.forEach((item) => {
      const option = this.setOption(`${item}`, `${item}`, false);
      channel.appendChild(option);
    });
  }
}

export default ChoosePlatform;
