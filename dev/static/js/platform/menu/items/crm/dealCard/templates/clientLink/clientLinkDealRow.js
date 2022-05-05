import PageData from '../../../../../../utils/pageData/pageData.js';

const pageData = new PageData();

class ClientLinkDealRow {
  init(deal) {
    const clientLink = pageData.addHttps(deal.clientLink);

    const snImage = this.#getSNImage(clientLink);
    const telImage = this.#getBotHelpImage(deal.clientTelegram);

    return [snImage, telImage];
  }

  #getBotHelpImage(telegram) {
    if (telegram) {
      return {
        iconClass: 'icon-tg',
        link: pageData.addHttps(telegram),
      };
    }
  }

  #getSNImage(link) {
    if (link) {
      const sn = this.#getSocialNetworks;

      const current = sn.find((el) => link.split(el.name).length > 1);

      if (current) {
        const currentLink = {
          link: pageData.addHttps(link),
          iconClass: current.iconClass,
        };

        return currentLink;
      }
    }
  }

  get #getSocialNetworks() {
    return [
      {
        name: 'vk.com',
        iconClass: 'icon-vk',
      },
      {
        name: 'facebook.com',
        iconClass: 'icon-fb',
      },
    ];
  }
}

export default ClientLinkDealRow;
