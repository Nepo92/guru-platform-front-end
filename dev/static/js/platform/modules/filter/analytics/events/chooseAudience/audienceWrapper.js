import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class AudienceWrapper {
  resetPlatform() {
    const platform = document.querySelector('#platform');

    if (platform) {
      const platformSelected = utils.getSelected(platform);
      platformSelected.removeAttribute('selected');

      const first = Array.from(platform.children)[0];
      first.setAttribute('selected', true);
    }
  }

  resetChannel() {
    const channel = document.querySelector('#channel');

    if (channel) {
      utils.removeChildren(channel);
      const option = this.setOption('all', 'Все источники', true);
      channel.appendChild(option);
    }
  }

  resetCommunity() {
    const community = document.querySelector('#community');

    if (community) {
      community.value = 'Все аудитории';
    }

    const communites = document.querySelector('[js-communites]');

    if (communites) {
      communites.value = 'Все аудитории';
    }
  }

  setOption(value, text, selected = null) {
    const option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerText = text;

    if (selected) {
      option.setAttribute('selected', '');
    }

    return option;
  }
}

export default AudienceWrapper;
