class DesktopMenu {
  hoverTimeout = null;

  resizeTimeout = null;

  init(desktopMenuProps) {
    const props = this.getProps(desktopMenuProps);
    const resizeWindow = this.resizeWindow.bind(this, props);

    resizeWindow();
    window.onresize = resizeWindow;
  }

  getProps(desktopMenuProps) {
    const menu = document.querySelector('.platform-menu');
    const subMenuIsOpen = false;
    const menuList = menu.querySelector('.platform-menu__list');
    const subMenuList = menu.querySelector('.platform-menu__sub');
    const platformWrapper = document.querySelector('.platform__wrapper');

    const props = {
      subMenuIsOpen,
      menuList,
      menu,
      subMenuList,
      desktopMenu: desktopMenuProps.desktopMenu,
      mobileMenu: desktopMenuProps.mobileMenu,
      platformWrapper,
    };

    const clickMenuItem = this.clickMenuItem.bind(this, props);
    props.clickMenuItem = clickMenuItem;

    const closeMenu = this.closeMenu.bind(this, props);
    props.closeMenu = closeMenu;

    return props;
  }

  resizeWindow(props) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 1000) {
        props.menu.classList.remove('open');
        this.desktopMenu(props);
      } else {
        props.platformWrapper.removeEventListener('click', props.closeMenu);
        props.menuList.removeEventListener('click', props.clickMenuItem);

        const mobileProps = {
          desktopMenu: props.desktopMenu,
          mobileMenu: props.mobileMenu,
        };

        props.mobileMenu.init(mobileProps);
      }
    }, 50);
  }

  desktopMenu(props) {
    if (props.menuList) {
      this.toggleSubMenu(props);
    }
  }

  toggleSubMenu(props) {
    if (props.menuList) {
      props.menuList.removeEventListener('click', props.clickMenuItem);
      props.menuList.addEventListener('click', props.clickMenuItem);
    }

    if (props.platformWrapper) {
      props.platformWrapper.removeEventListener('click', props.closeMenu);
      props.platformWrapper.addEventListener('click', props.closeMenu);
    }
  }

  closeMenu(props) {
    const subMenus = Array.from(props.subMenuList.children);

    if (subMenus.length) {
      subMenus.forEach((item) => {
        if (item.classList.contains('open') || item.classList.contains('open_t0')) {
          item.classList.add('height_100vh');

          setTimeout(() => {
            item.classList.remove('height_100vh');
          }, 400);
        }

        item.classList.remove('open');
        item.classList.remove('open_t0');
      });

      props.menu.classList.remove('open');
    }
  }

  clickMenuItem(props, e) {
    const t = e.target;

    if (t.classList.contains('submenu')) {
      const subMenus = Array.from(props.subMenuList.children);

      if (subMenus.length) {
        const currentSubMenu = subMenus.find((el) => el.dataset.item === t.getAttribute('data-item'));

        if (currentSubMenu) {
          const someIsOpen = subMenus.some((el) => el.classList.contains('open') || el.classList.contains('open_t0'));

          subMenus.forEach((item) => {
            item.classList.remove('open');
            item.classList.remove('open_t0');
          });

          if (!someIsOpen) {
            props.menu.classList.add('open');
            currentSubMenu.classList.add('open');
          } else {
            currentSubMenu.classList.add('open_t0');
          }
        }
      }
    }
  }
}

export default DesktopMenu;
