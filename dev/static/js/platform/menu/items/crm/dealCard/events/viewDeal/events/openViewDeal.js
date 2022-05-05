import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class OpenViewDeal {
  init(viewDealPack) {
    const menu = document.querySelector('[js-menu-client-card]');

    if (menu) {
      const viewBtn = menu.querySelectorAll('[js-view-course]');

      if (viewBtn.length) {
        const viewDeal = this.viewDeal.bind(this, viewDealPack);

        viewBtn.forEach((item) => {
          const editButton = utils.setCloneElement(item);
          editButton.addEventListener('click', viewDeal);
        });
      }
    }
  }

  viewDeal(viewDealPack, e) {
    const t = e.target;

    const openViewMenu = this.openViewMenu.bind(this);

    const menu = document.querySelector('[js-menu-deal]');

    const tabs = menu.querySelector('.client-card__tabs');

    if (tabs) {
      tabs.style.opacity = '1';
      tabs.style.pointerEvents = 'all';
    }

    if (menu) {
      viewDealPack.menu = menu;
      viewDealPack.target = t;
      openViewMenu(viewDealPack);
    }
  }

  openViewMenu(viewDealPack) {
    const { menu, dealObs } = viewDealPack;
    utils.openModalAnimation(menu, true);

    menu.querySelector('.platform-form__items').scrollTop = '0';

    menu.querySelector('.platform-form__title').innerText = 'Просмотр сделки';
    viewDealPack.activeTab = 'Счета и платежи';
    viewDealPack.defaultTab = 'Счета и платежи';

    const items = [dealObs];

    viewDealPack.isView = true;
    viewDealPack.newDeal = false;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(viewDealPack);
    });
  }
}

export default OpenViewDeal;
