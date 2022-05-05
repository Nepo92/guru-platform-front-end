class PopupWrapper {
  removePopup(target) {
    const removeWrapper = document.querySelectorAll('[dialog-window]');

    if (removeWrapper.length) {
      removeWrapper.forEach((item) => {
        item.style.opacity = '0';
        item.remove();
      });
    }

    if (target) {
      target.style.pointerEvents = 'all';
    }

    const menuArray = Array.from(document.querySelectorAll('.platform-modal'));

    if (menuArray.length) {
      const isOpen = menuArray.some((el) => el.classList.contains('open'));

      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}

export default PopupWrapper;
