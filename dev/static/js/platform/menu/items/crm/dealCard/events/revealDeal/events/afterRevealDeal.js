import Utils from '../../../../../../../utils/utils.js';
import HideManager from '../../../dispatch/dealHideManager.js';

const utils = new Utils();

const hideManager = new HideManager();

class AfterRevealDeal {
  init(dealCardPacks) {
    const { target } = dealCardPacks;

    const dealCard = utils.getParent(target, 'deal-card');

    if (dealCard) {
      const id = +dealCard.getAttribute('data-deal');

      const img = dealCard.querySelector('.deal-card__img');

      if (img) {
        img.classList.remove('hiden');
      }

      const items = dealCardPacks.pack.items?.pageItems || dealCardPacks.pack.items;

      if (items) {
        dealCardPacks.pack.items = dealCardPacks.pack.items.map((el) => {
          if (id === el.id) {
            el.isHidden = false;
          }

          return el;
        });

        dealCardPacks.deals = dealCardPacks.deals?.map((el) => {
          if (id === el.id) {
            el.isHidden = false;
          }

          return el;
        });
      }
    }

    dealCardPacks.rerenderContent.init(dealCardPacks).then(() => {
      dealCardPacks.rowEventsObs.init(dealCardPacks);
      dealCardPacks.clientCardObs.init(dealCardPacks);

      const updateNavigation = this.updateNavigation.bind(this);
      updateNavigation(dealCardPacks);
    });
  }

  updateNavigation(dealCardPacks) {
    const { target, dealCard } = dealCardPacks;

    target.style.display = 'none';

    if (dealCard) {
      const navigation = dealCard.querySelector('.deal-card__controls');

      utils.removeChildren(navigation);

      dealCardPacks.navigation = navigation;

      if (navigation) {
        /* Устанавливаем новые кнопки */
        this.setButtonsToNavigation(dealCardPacks);

        /* Добавляем слушатели на кнопки */
        const setListenersToButtons = this.setListenersToButtons.bind(this);
        setListenersToButtons(dealCardPacks);
      }
    }
  }

  setButtonsToNavigation(dealCardPacks) {
    const { navigation } = dealCardPacks;

    const manageDeal = document.createElement('div');
    manageDeal.classList.add('deal-card__management');
    manageDeal.setAttribute('js-course-card', '');
    manageDeal.innerText = 'Управление сделкой';

    const hideBtn = document.createElement('div');
    hideBtn.classList.add('deal-card__delete--btn');
    hideBtn.classList.add('deal-card__delete-icon');
    hideBtn.setAttribute('js-hide-deal-btn', '');

    navigation.appendChild(manageDeal);
    navigation.appendChild(hideBtn);
  }

  setListenersToButtons(dealCardPacks) {
    const hide = hideManager.init.bind(hideManager);

    hide(dealCardPacks);
  }
}

export default AfterRevealDeal;
