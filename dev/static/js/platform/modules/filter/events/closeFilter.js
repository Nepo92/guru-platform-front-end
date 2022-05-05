import Utils from '../../../utils/utils.js';

const utils = new Utils();

class CloseFilter {
  init() {
      const closeFilterBtn = document.querySelector('.platform__close--btn-modal');

      if (closeFilterBtn) {
          const closeFilter = this.closeFilter.bind(this);

          closeFilterBtn.removeEventListener('click', closeFilter);
          closeFilterBtn.addEventListener('click', closeFilter);
      }
  }

  closeFilter() {
      const filterButton = document.querySelector('.platform__filter--btn');
      if (filterButton) {
          filterButton.classList.remove('active');
      }

      const filter = document.querySelector('.platform__filter');
      const filterWrapper = filter.querySelector('.filter__wrapper');

      utils.closeModalAnimation(filter, filterWrapper, true, false, false);
  }
}

export default CloseFilter;
