import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class CloseEditDeal {
  init(dealCardPack) {
    const menu = document.querySelector('[js-menu-deal]');

    if (menu) {
      const closeBtn = menu.querySelector('.platform__close--btn-modal');

      if (closeBtn) {
        dealCardPack.menu = menu;
        const closeEditDealMenu = this.closeEditDealMenu.bind(this, dealCardPack);

        const cloneClose = utils.setCloneElement(closeBtn);
        cloneClose.addEventListener('click', closeEditDealMenu);
      }
    }
  }

  closeEditDealMenu(props) {
    const { menu, tabsObs } = props;

    const clientCardProps = {
      ...props,
      defaultTab: 'Сделки',
      activeTab: 'Сделки',
      menu: document.querySelector('[js-menu-client-card]'),
      deals: [...props.deals],
    };

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    const editBtn = menu.querySelector('[edit-deal]');
    editBtn.setAttribute('disabled', '');

    const isClientCardOpen = utils.checkClientCardOpen();

    utils.closeModalAnimation(menu, wrapper, false, isClientCardOpen, true, false);

    const tabs = tabsObs.init.bind(tabsObs);

    tabs(clientCardProps);
  }
}

export default CloseEditDeal;
