import AfterGetDeal from '../../../deal/events/afterGetDeal/afterGetDeal.js';
import Utils from '../../../../../../../utils/utils.js';

const afterGetDeal = new AfterGetDeal();
const utils = new Utils();

class OpenCreateDealMenu {
  init(dealPack) {
    const { createBtn } = dealPack;

    const open = this.openMenu.bind(this, dealPack);

    createBtn.addEventListener('click', open);
  }

  openMenu(dealPack, e) {
    const t = e.target;
    dealPack.target = t;
    dealPack.deal = null;

    const { menu } = dealPack;

    utils.openModalAnimation(menu, true);

    menu.querySelector('.platform-form__title').innerText = 'Создать сделку';
    menu.querySelector('.platform-form__items').scrollTop = '0';

    dealPack.activeTab = 'Счета и платежи';
    dealPack.defaultTab = 'Счета и платежи';

    const items = [
      afterGetDeal,
    ];

    dealPack.newDeal = true;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(dealPack);
    });

    this.clearTabs(dealPack);
  }

  clearTabs(dealPack) {
    const { menu } = dealPack;

    const contents = menu.querySelectorAll('.client-card__content');

    contents.forEach((item) => {
      utils.removeChildren(item);
    });

    const tabs = menu.querySelector('.client-card__tabs');
    tabs.style.opacity = '0';
    tabs.style.pointerEvents = 'none';
  }
}

export default OpenCreateDealMenu;
