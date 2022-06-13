import Utils from '../../utils/utils';

const utils = new Utils();

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

    const props = {
      subMenuIsOpen,
      menuList,
      menu,
      subMenuList,
      desktopMenu: desktopMenuProps.desktopMenu,
      mobileMenu: desktopMenuProps.mobileMenu,
    };

    const mouseLeaveSubMenu = this.mouseLeaveSubMenu.bind(this, props);
    const mouseEnterSubMenu = this.mouseEnterSubMenu.bind(this, props);
    const mouseOverSubMenu = this.mouseOverSubMenu.bind(this, props);
    const mouseLeaveMenuItem = this.mouseLeaveMenuItem.bind(this, props);
    props.mouseLeaveSubMenu = mouseLeaveSubMenu;
    props.mouseEnterSubMenu = mouseEnterSubMenu;
    props.mouseLeaveMenuItem = mouseLeaveMenuItem;
    props.mouseOverSubMenu = mouseOverSubMenu;

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
        props.subMenuList.removeEventListener('mouseleave', props.mouseLeaveSubMenu);
        props.subMenuList.removeEventListener('mouseover', props.mouseEnterSubMenu);
        props.menuList.removeEventListener('mouseover', props.mouseOverSubMenu);
        props.menuList.removeEventListener('mouseleave', props.mouseLeaveMenuItem);

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

    if (props.subMenuList) {
      props.subMenuList.removeEventListener('mouseleave', props.mouseLeaveSubMenu);
      props.subMenuList.addEventListener('mouseleave', props.mouseLeaveSubMenu);
      props.subMenuList.removeEventListener('mouseover', props.mouseEnterSubMenu);
      props.subMenuList.addEventListener('mouseover', props.mouseEnterSubMenu);
    }
  }

  toggleSubMenu(props) {
    props.subMenuListItems = Array.from(document.querySelectorAll('.platform-submenu'));

    props.menuList.removeEventListener('mouseover', props.mouseOverSubMenu);
    props.menuList.addEventListener('mouseover', props.mouseOverSubMenu);
    props.menuList.removeEventListener('mouseleave', props.mouseLeaveMenuItem);
    props.menuList.addEventListener('mouseleave', props.mouseLeaveMenuItem);
  }

  mouseOverSubMenu(props, e) {
    const t = e.target;

    const isSubMenuItem = t.classList.contains('submenu');

    props.target = t;

    if (isSubMenuItem) {
      this.hasSubMenu(props);
    } else {
      this.closeSubMenu(props);
    }
  }

  mouseLeaveMenuItem(props) {
    if (props.subMenuIsOpen) {
      props.subMenuListItems.forEach((item) => {
        const isOpen = item.classList.contains('open') || item.classList.contains('open_t0');

        item.classList.remove('open');
        item.classList.remove('open_t0');
        item.classList.add('closed');

        if (isOpen) {
          item.classList.add('height_100vh');
        }
      });

      props.subMenuIsOpen = false;
      props.menu.classList.remove('open');
    }

    this.clearHoverTimeout();
  }

  mouseEnterSubMenu(props, e) {
    const t = e.target;

    const subMenu = utils.getParent(t, 'platform-submenu') ? utils.getParent(t, 'platform-submenu') : t;

    if (subMenu) {
      subMenu.classList.remove('closed');
      subMenu.classList.remove('open');
      subMenu.classList.add('open_t0');
      props.menu.classList.add('open');
      props.subMenuIsOpen = true;
    }
  }

  mouseLeaveSubMenu(props, e) {
    const t = e.target;

    const currentMenu = Array.from(t.children)
        .find((el) => {
          const isOpen = el.classList.contains('open') || el.classList.contains('open_t0');

          if (isOpen) {
            return el;
          }
        });

    if (currentMenu) {
      const closeSubMenu = e.clientX >= props.menu.offsetWidth && props.subMenuIsOpen ? 'close sub' : false;
      const openOtherSubMenu = e.clientX < props.menu.offsetWidth && props.subMenuIsOpen ? 'open other' : false;

      const event = closeSubMenu || openOtherSubMenu;

      if (event === 'close sub') {
        currentMenu.classList.remove('open');
        currentMenu.classList.remove('open_t0');
        currentMenu.classList.add('height_100vh');
        currentMenu.classList.add('closed');

        props.subMenuIsOpen = false;
        props.menu.classList.remove('open');
      }
    }
  }

  hasSubMenu(props) {
    const {
      subMenuListItems,
      target,
    } = props;
    const { item } = target.dataset;

    props.currentSubMenu = subMenuListItems.find((el) => el.dataset.item === item);

    const dispatchMouseOver = this.dispatchMouseOver(props);
    const methods = this.getMethods(props);

    const currentMethod = methods.find((el) => el.name === dispatchMouseOver);

    if (this.hoverTimeout) {
      this.clearHoverTimeout();
    }

    if (currentMethod) {
      if (!currentMethod.applyWithTimeout) {
        currentMethod.method();
      } else {
        this.openMenuWithTimeout(currentMethod, props);
      }
    }
  }

  clearHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  openMenuWithTimeout(currentMethod, props) {
    this.hoverTimeout = setTimeout(() => {
      currentMethod.method(props);

      props.menu.classList.add('open');
    }, 150);
  }

  dispatchMouseOver(props) {
    const { currentSubMenu } = props;

    const firstSubMenuElem = currentSubMenu && !props.subMenuIsOpen ? 'open' : false;
    const notFirstSubMenuElem = currentSubMenu && props.subMenuIsOpen ? 'open-also' : false;
    const notSubMenu = !currentSubMenu && props.subMenuIsOpen ? 'close' : false;

    return firstSubMenuElem || notFirstSubMenuElem || notSubMenu;
  }

  getMethods(props) {
    const openSubMenu = this.openSubMenu.bind(this, props);
    const openAlsoSubMenu = this.openAlsoSubMenu.bind(this, props);
    const closeSubMenu = this.closeSubMenu.bind(this, props);

    return [
      {
        name: 'open',
        method: openSubMenu,
        applyWithTimeout: true,
      },
      {
        name: 'open-also',
        method: openAlsoSubMenu,
        applyWithTimeout: false,
      },
      {
        name: 'close',
        method: closeSubMenu,
        applyWithTimeout: false,
      },
    ];
  }

  openAlsoSubMenu(props) {
    props.currentSubMenu.classList.remove('closed');
    props.currentSubMenu.classList.remove('open');
    props.currentSubMenu.classList.remove('open_t0');
    props.currentSubMenu.classList.remove('height_100vh');

    props.subMenuListItems.forEach((item) => {
      item.classList.remove('open');
      item.classList.remove('closed');
      item.classList.remove('open_t0');
      item.classList.remove('height_100vh');
    });

    props.currentSubMenu.classList.add('open_t0');
  }

  openSubMenu(props) {
    props.subMenuIsOpen = true;
    props.currentSubMenu.classList.remove('open_t0');
    props.currentSubMenu.classList.remove('closed');

    const someIsOpen = Array.from(props.subMenuListItems)
        .find((el) => el.classList.contains('open') || el.classList.contains('open_t0'));

    props.subMenuListItems.forEach((item) => {
      item.classList.remove('open');
      item.classList.remove('closed');
      item.classList.remove('open_t0');
      item.classList.remove('height_100vh');
    });

    if (someIsOpen) {
      props.currentSubMenu.classList.add('open_t0');
    } else {
      props.currentSubMenu.classList.add('open');
    }

    this.clearHoverTimeout();
  }

  closeSubMenu(props) {
    const { subMenuListItems } = props;

    subMenuListItems.forEach((item) => {
      const isOpen = item.classList.contains('open') || item.classList.contains('open_t0');

      if (isOpen) {
        item.classList.add('height_100vh');
      }

      item.classList.remove('open');
      item.classList.remove('open_t0');
      item.classList.add('closed');
    });

    props.subMenuIsOpen = false;
    props.menu.classList.remove('open');

    this.clearHoverTimeout();
  }
}

export default DesktopMenu;
