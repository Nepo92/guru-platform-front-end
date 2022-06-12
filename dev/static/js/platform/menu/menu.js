import Utils from '../utils/utils.js';

const utils = new Utils();

// const WORKERS_SALARY = 'workers-salary';
// const MOTIVATION_BUILDER = 'motivation-builder';
// const WORK_TRACKER = 'work-tracker';
// const SETTINGS_FUNNELS = 'funnels';

class Menu {
  hoverTimeout = null;

  init() {
    this.settings();
  }

  settings() {
    const menu = document.querySelector('.platform-menu__main');
    const mainMenu = document.querySelector('.platform-menu');

    if (menu) {
      const subMenuIsOpen = false;
      const menuList = document.querySelector('.platform-menu__list');

      const props = {
        subMenuIsOpen,
        menuList,
        menu: mainMenu,
      };

      if (menuList) {
        this.toggleSubMenu(props);
      }

      const subMenuList = document.querySelector('.platform-menu__sub');

      if (subMenuList) {
        const mouseLeaveSubMenu = this.mouseLeaveSubMenu.bind(this, props);
        subMenuList.addEventListener('mouseleave', mouseLeaveSubMenu);

        const mouseEnterSubMenu = this.mouseEnterSubMenu.bind(this, props);
        subMenuList.addEventListener('mouseover', mouseEnterSubMenu);
      }
    }
  }

  toggleSubMenu(props) {
    const { menuList } = props;
    props.subMenuList = Array.from(document.querySelectorAll('.platform-submenu'));

    const mouseOverSubMenu = this.mouseOverSubMenu.bind(this, props);
    const mouseLeaveMenuItem = this.mouseLeaveMenuItem.bind(this, props);

    menuList.addEventListener('mouseover', mouseOverSubMenu);
    menuList.addEventListener('mouseleave', mouseLeaveMenuItem);
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
      props.subMenuList.forEach((item) => {
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

    const currentMenu = Array.from(t.children).find((el) => {
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
    const { subMenuList, target } = props;
    const { item } = target.dataset;

    props.currentSubMenu = subMenuList.find((el) => el.dataset.item === item);

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

    props.subMenuList.forEach((item) => {
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

    const someIsOpen = Array.from(props.subMenuList).find((el) => el.classList.contains('open') || el.classList.contains('open_t0'));

    props.subMenuList.forEach((item) => {
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
    const { subMenuList } = props;

    subMenuList.forEach((item) => {
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

export default Menu;
