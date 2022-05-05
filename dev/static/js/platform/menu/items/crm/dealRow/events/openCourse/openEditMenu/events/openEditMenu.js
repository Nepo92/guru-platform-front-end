import Utils from '../../../../../../../../utils/utils.js';
import { dealAPI, homeworkAPI } from '../../../../../../../../api/api.js';
import CloseMenu from '../../closeMenu/closeMenu.js';
import DealTabObserver from '../../../../../tabs/observersTabs/dealTabObserver.js';
import AfterGetDeal from '../../../../../dealCard/deal/events/afterGetDeal/afterGetDeal.js';
import Tabs from '../../../../../tabs/tabs.js';

const utils = new Utils();
const closeMenu = new CloseMenu();

const afterGetDeal = new AfterGetDeal();

class OpenEditMenu {
  init(coursePack) {
    const openMenuBtns = document.querySelectorAll('[course-row]');

    if (openMenuBtns.length) {
      const openMenu = this.openMenu.bind(this, coursePack);

      openMenuBtns.forEach((item) => {
        const openMenuBtn = utils.setCloneElement(item);
        openMenuBtn.addEventListener('click', openMenu);
      });
    }

    const openBills = document.querySelectorAll('[js-add-bill-btn]');

    if (openBills.length) {
      const openMenu = this.openMenu.bind(this, coursePack);

      openBills.forEach((item) => {
        const openMenuBtn = utils.setCloneElement(item);
        openMenuBtn.addEventListener('click', openMenu);
      });
    }

    const openTasks = document.querySelectorAll('[data-deal-reminder]');

    if (openTasks.length) {
      const openMenu = this.openMenu.bind(this, coursePack);

      openTasks.forEach((item) => {
        const openMenuBtn = utils.setCloneElement(item);
        openMenuBtn.addEventListener('click', openMenu);
      });
    }
  }

  openMenu(coursePack, e) {
    e.preventDefault();
    e.stopPropagation();

    const { menu, pack } = coursePack;
    const t = e.target;

    utils.openModalAnimation(menu, true);
    const updateBtn = menu.querySelector('[edit-deal]');

    if (updateBtn) {
      updateBtn.setAttribute('disable', '');
    }

    const idDeal = utils.getParent(t, 'platform-table__row').getAttribute('data-deal');

    menu.querySelector('[client-name]').innerText = 'Редактировать сделку';

    const reminderMenu = utils.isReminderBtn(t);

    const { role } = pack;

    if (reminderMenu) {
      coursePack.defaultTab = 'Задачи';
      coursePack.activeTab = 'Задачи';
    } else if (role === 'ROLE_CURATOR') {
      coursePack.defaultTab = 'Доступ к продукту';
      coursePack.activeTab = 'Доступ к продукту';
    } else {
      coursePack.defaultTab = 'Счета и платежи';
      coursePack.activeTab = 'Счета и платежи';
    }

    coursePack.isCreate = false;
    coursePack.tabsObs = new Tabs();
    coursePack.dealTabObs = new DealTabObserver();

    const data = {
      id: idDeal,
    };

    let dealRequest;

    if (role !== 'ROLE_CURATOR') {
      dealRequest = dealAPI.getDeal(data);
    } else {
      dealRequest = homeworkAPI.getDeal(data);
    }

    dealRequest.then((deal) => {
      coursePack.deal = deal;
      coursePack.idDeal = deal.id;
      coursePack.idClient = deal.idClient;
      coursePack.target = t;
      coursePack.isChangeTab = false;

      const items = [
        afterGetDeal,
        closeMenu,
      ];

      items.forEach((item) => {
        const init = item.init.bind(item);
        init(coursePack);
      });
    });
  }
}

export default OpenEditMenu;
