import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class SetClientInfo {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const setClientInfo = this.setClientInfo.bind(this);
    setClientInfo(props);
  }

  setClientInfo(clientCardPack) {
    const { client } = clientCardPack;

    const clientCard = document.querySelector('[js-menu-client-card]');

    const name = clientCard.querySelector('[js-client-name]');
    name.innerText = client.name ? client.name : '';
    name.classList.remove('hide');

    const input = name.parentNode.querySelector('[js-change-client-name]');

    if (input) {
      input.classList.add('hide');
    }

    const when = clientCard.querySelector('[when-create]');
    when.innerText = client.createDate ? utils.getDateFormatDDMMYYYY(client.createDate) : '';

    const who = clientCard.querySelector('[who-create]');
    who.innerText = client.manager ? client.manager : '';

    const phone = clientCard.querySelector('[client-phone]');
    phone.value = client.phone ? client.phone : '';

    const email = clientCard.querySelector('[client-email]');
    email.value = client.email ? client.email : '';

    const vk = clientCard.querySelector('[client-vk]');
    vk.value = client.link ? this.getClientLink(client.link) : '';

    const telegram = clientCard.querySelector('[client-telegram]');
    telegram.value = client.telegram ? client.telegram : '';
  }

  getClientLink(link) {
    const isHttp = link.split('http://').length > 1 ? link : '';
    const isHttps = link.split('https://').length > 1 ? link : '';
    const data = isHttp || isHttps;

    return data || `https://${link}`;
  }
}

export default SetClientInfo;
