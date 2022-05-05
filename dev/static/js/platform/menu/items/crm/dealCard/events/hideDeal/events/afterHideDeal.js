import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class AfterHideDeal {
  init(dealCardPack) {
    this.#changeDealCardNav(dealCardPack);
  }

  #changeDealCardNav(dealCardPack) {
    const { target } = dealCardPack;

    this.rerenderCRMTable(dealCardPack);

    const img = utils.getParent(target, 'deal-card').querySelector('.deal-card__img');

    if (img) {
      img.classList.add('hiden');
    }

    const navigation = utils.getParent(target, 'deal-card__controls');

    if (navigation) {
      const changeNavigation = this.changeNavigation.bind(this);
      dealCardPack.navigation = navigation;
      changeNavigation(dealCardPack);

      const setListenerToButton = this.setListenerToButton.bind(this);
      setListenerToButton(dealCardPack);
    }
  }

  rerenderCRMTable(dealCardPack) {
    const { target } = dealCardPack;

    const id = +utils.getParent(target, 'deal-card').getAttribute('data-deal');

    if (dealCardPack.pack.items) {
      dealCardPack.pack.items = dealCardPack.pack.items.map((el) => {
        if (id === el.id) {
          el.isHidden = true;
        }

        return el;
      });
    }

    dealCardPack.rerenderContent.init(dealCardPack).then(() => {
      dealCardPack.rowEventsObs.init(dealCardPack);
      dealCardPack.clientCardObs.init(dealCardPack);
    });
  }

  changeNavigation(dealCardPack) {
    const { navigation } = dealCardPack;
    utils.removeChildren(navigation);

    const div = document.createElement('div');
    div.classList.add('deal-card__recover');
    div.setAttribute('js-reveal-deal-btn', '');
    div.innerText = 'Восстановить сделку';

    navigation.appendChild(div);
  }

  setListenerToButton(dealCardPack) {
    const { showManager } = dealCardPack;
    const show = showManager.init.bind(showManager);

    show(dealCardPack);
  }
}

export default AfterHideDeal;
