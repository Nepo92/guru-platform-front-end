import Utils from '../../utils/utils.js';

const utils = new Utils();

class CloseModal {
  init() {
    // const wrappers = document.querySelectorAll('.platform-modal__wrapper');

    // if (wrappers.length) {
    //   const closeMenu = this.closeModal.bind(utils);

    //   wrappers.forEach((item) => {
    //     const closeBtn = utils.setCloneElement(item);

    //     closeBtn.addEventListener('click', closeMenu);
    //   });
    // }

    const filterWrapper = document.querySelectorAll('.platform__filter');

    if (filterWrapper.length) {
      const closeMenu = this.closeModal.bind(utils);

      filterWrapper.forEach((item) => {
        const closeBtn = utils.setCloneElement(item);

        closeBtn.addEventListener('click', closeMenu);
      });
    }
  }

  closeModal(e) {
    const t = e.target;

    const canClose = ['platform-modal__content', 'platform-modal__wrapper', 'platform__filter'].includes(t.classList[0]);

    // const isFilter = t.classList.contains('platform__filter');

    if (!canClose) return false;

    // if (isFilter) {
      // this.closeFilter(t);
    // } else {
      // this.closeMenuModal(t);
    // }
  }

  // closeMenuModal(t) {
    // const modals = document.querySelectorAll('.platform-modal');
  //   const isOverflowed = [...modals].filter((el) => el.classList.contains('open')).length > 1;

  //   const menu = this.getParent(t, 'platform-modal');

  //   if (menu) {
  //     const wrapper = menu.querySelector('.platform-modal__wrapper');
  //     this.closeModalAnimation(menu, wrapper, false, isOverflowed);
  //   }
  // }

  closeFilter() {
    // const menu = this.getParent(t, 'platform__filter');

    // if (menu) {
    //   const wrapper = menu.querySelector('.filter__wrapper');

    //   console.log(wrapper);

    //   utils.closeModalAnimation(menu, wrapper, true, false);
    // }
  }
}

export default CloseModal;
