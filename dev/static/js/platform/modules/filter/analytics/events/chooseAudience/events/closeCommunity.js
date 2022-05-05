import Utils from '../../../../../../utils/utils.js';

const utils = new Utils();

class CloseCommunity {
  init() {
    const closeCommunity = document.querySelector('[js-menu-close-btn]');

    if (closeCommunity) {
      const closeCommunityMenu = this.closeCommunityMenu.bind(this);

      const close = utils.setCloneElement(closeCommunity);

      close.addEventListener('click', closeCommunityMenu);
    }
  }

  closeCommunityMenu() {
    const communites = [];

    const filterForm = document.querySelector('[filter-form-communities]');

    if (filterForm) {
      const filterFormRows = filterForm.querySelectorAll('tr:not(.none) [js-menu-checker]:checked');

      if (filterFormRows.length) {
        filterFormRows.forEach((item) => {
          communites.push(item.value);
        });
      }
    }

    const communitesInput = document.querySelector('[js-communites]');

    if (communites.includes('Все аудитории')) {
      communitesInput.value = 'Все аудитории';
    } else {
      communitesInput.value = communites.toString();
    }

    this.showAll();

    const menu = document.querySelector('[js-menu]');

    const wrapper = menu.querySelector('.platform-modal__wrapper');

    utils.closeModalAnimation(menu, wrapper, false, true);
  }

  showAll() {
    const search = document.querySelector('[js-menu-search]');
    search.value = '';

    const rows = document.querySelectorAll('[js-menu-purchase]');

    if (rows.length) {
      rows.forEach((item) => {
        item.classList.remove('none');
      });
    }
  }
}

export default CloseCommunity;
