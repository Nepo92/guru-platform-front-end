import Utils from '../../../../../../utils/utils.js';
import { dealAPI } from '../../../../../../api/api.js';

const utils = new Utils();

class OpenTaskMenuDealCard {
  init(props) {
    const reminderBtns = document.querySelectorAll('.deal-card [data-deal-reminder]');

    if (reminderBtns.length) {
      const openMenu = this.openMenu.bind(this, props);

      reminderBtns.forEach((item) => {
        const btn = utils.setCloneElement(item);
        btn.addEventListener('click', openMenu);
      });
    }
  }

  openMenu(coursePack, e) {
    const { menu } = coursePack;
    const t = e.target;

    utils.openModalAnimation(menu, true);
    const updateBtn = menu.querySelector('[edit-deal]');

    if (updateBtn) {
      updateBtn.setAttribute('disable', '');
    }

    const idDeal = utils.getParent(t, 'deal-card').getAttribute('data-deal');

    menu.querySelector('[client-name]').innerText = 'Редактировать сделку';

    const reminderMenu = utils.isReminderBtn(t);

    if (reminderMenu) {
      coursePack.defaultTab = 'Задачи';
      coursePack.activeTab = 'Задачи';
    } else {
      coursePack.defaultTab = 'Счета и платежи';
      coursePack.activeTab = 'Счета и платежи';
    }

    coursePack.isCreate = false;

    const data = {
      id: idDeal,
    };

    dealAPI.getDeal(data).then((deal) => {
      coursePack.deal = deal;
      coursePack.idDeal = deal.id;
      coursePack.idClient = deal.idClient;
      coursePack.target = t;
      coursePack.isChangeTab = false;
      coursePack.openFromDealCard = true;

      const items = [
        coursePack.afterGetDeal,
        coursePack.closeDealMenu,
      ];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(coursePack);
      });
    });
  }
}

export default OpenTaskMenuDealCard;
