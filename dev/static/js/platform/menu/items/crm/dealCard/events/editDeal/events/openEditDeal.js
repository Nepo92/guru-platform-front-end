import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class OpenEditDeal {
  init(dealCardPack) {
    const props = {
      ...dealCardPack,
      menu: document.querySelector('[js-menu-client-card]'),
    };

    const { menu } = props;

    if (menu) {
      const editBtn = menu.querySelectorAll('[js-course-card]');

      if (editBtn.length) {
        const edit = this.editDeal.bind(this, props);

        editBtn.forEach((item) => {
          const editButton = utils.setCloneElement(item);
          editButton.addEventListener('click', edit);
        });
      }
    }
  }

  editDeal(dealCardPack, e) {
    const {
      idClient,
      menu,
      pack,
      dealObs,
      tabsObs,
      dealTabObs,
      deals,
      user,
      client,
      rowEventsObs,
      clientCardObs,
      rerenderContent,
    } = dealCardPack;

    const t = e.target;

    const editData = {
      idClient,
      pack,
      dealObs,
      tabsObs,
      dealTabObs,
      deals,
      user,
      client,
      rowEventsObs,
      clientCardObs,
      rerenderContent,
      menu: document.querySelector('[js-menu-deal]'),
      target: t,
    };

    const openEditMenu = this.openEditMenu.bind(this);

    if (menu) {
      openEditMenu(editData);
    }
  }

  openEditMenu(editData) {
    const { menu, target, dealObs } = editData;

    utils.openModalAnimation(menu, true);

    menu.querySelector('.platform-form__items').scrollTop = '0';
    menu.querySelector('.platform-form__title').innerText = 'Редактировать сделку';

    const dealCard = utils.getParent(target, 'deal-card');
    const dealRow = utils.getParent(target, 'platform-table__row');

    const idDeal = (dealCard || dealRow).getAttribute('data-deal');

    editData.idDeal = idDeal;
    editData.activeTab = 'Счета и платежи';
    editData.defaultTab = 'Счета и платежи';

    const items = [dealObs];

    editData.newDeal = false;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(editData);
    });
  }
}

export default OpenEditDeal;
