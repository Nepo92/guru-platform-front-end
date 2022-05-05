class AfterUpdateDeal {
  init() {

  }

  setClientData(clientColumn, deal) {
    const card = clientColumn.querySelector('[js-client-card]');

    card.setAttribute('title', deal.clientName);
    card.innerText = deal.clientName ? deal.clientName : '';

    const copy = clientColumn.querySelector('[js-copy-link]');

    copy.setAttribute('data-link', deal.clientPhone);

    copy.innerText = !deal.clientPhone ? '&mdash;' : deal.clientPhone;
  }

  setSocialData(social, deal) {
    const span = social.querySelector('span');

    if (span && deal.socialCode) {
      span.innerText = '';
      span.className = `deal-social_${deal.socialCode}`;
    } else if (social && !deal.socialCode) {
      social.querySelector('span').className = 'deal-social_default-icon no-icon';
      span.innerText = '&mdash;';
    }
  }

  setLinkData(link, deal) {
    const wrapper = link.querySelector('.link__wrapper--crm');

    wrapper.className = `link__wrapper link__wrapper--crm ${deal.clientLink ? '' : 'no-selector'}`;

    if (deal.clientLink) {
      const clientLink = wrapper.querySelector('.platform-table__row--link');
      const linkGo = wrapper.querySelector('.platform__go');

      if (clientLink && linkGo) {
        clientLink.setAttribute('data-link', deal.clientLink);
        clientLink.setAttribute('title', deal.clientLink);

        linkGo.setAttribute('href', deal.clientLink);
        linkGo.setAttribute('title', deal.clientLink);
      } else {
        this.setCopyLink(wrapper, deal);
        this.setBlankLink(wrapper, deal);
      }
    } else {
      wrapper.innerHTML = '';
      wrapper.innerText = '&mdash;';
    }
  }

  setCopyLink(wrapper, deal) {
    const linkCopy = document.createElement('a');
    linkCopy.setAttribute('data-link', deal.clientLink);
    linkCopy.setAttribute('title', deal.clientLink);
    linkCopy.className = 'platform-table__row--link platform__copy--table';

    wrapper.appendChild(linkCopy);
  }

  setBlankLink(wrapper, deal) {
    const linkBlank = document.createElement('a');
    linkBlank.setAttribute('href', deal.clientColumn);
    linkBlank.setAttribute('target', '_blank');
    linkBlank.setAttribute('rel', 'noopener noreferrer');
    linkBlank.setAttribute('title', deal.clientLink);

    wrapper.appendChild(linkBlank);
  }
}

export default AfterUpdateDeal;
