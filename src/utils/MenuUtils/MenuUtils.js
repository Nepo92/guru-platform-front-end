class MenuUtils {
  openMenu(props) {
    const {
      menu,
      wrapper,
      isOverflowed,
    } = props;

    menu.classList.add('open__wrapper');

    setTimeout(() => {
      menu.classList.add('open');
    }, 100);

    setTimeout(() => {
      wrapper.classList.add('open');
    }, 0);

    this.setOverflow(isOverflowed);
  }

  closeMenu(props) {
    const { menu, wrapper, isOverflowed } = props;

    setTimeout(() => {
      wrapper.classList.remove('open');
    }, 0);

    setTimeout(() => {
      menu.classList.remove('open');
    }, 200);

    setTimeout(() => {
      menu.classList.remove('open__wrapper');
    }, 400);
    
    this.setOverflow(isOverflowed)
  }

  setOverflow(isOverflowed) {
    if (isOverflowed) {
      document.body.style.overflow = 'hidden';
    } else if (!isOverflowed && isOverflowed !== null) {
      document.body.style.overflow = 'auto';
    }
  }
}

export default MenuUtils;
