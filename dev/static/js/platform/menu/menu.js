import Utils from '../utils/utils.js';

const utils = new Utils();

const WORKERS_SALARY = 'workers-salary';
const MOTIVATION_BUILDER = 'motivation-builder';
const WORK_TRACKER = 'work-tracker';
const SETTINGS_FUNNELS = 'funnels';

class Menu {
  init() {
    this.settings();
  }

  settings() {
    const menu = document.querySelector('.platform-menu');

    if (menu) {
      this.isOpen = false;
      menu.style.pointerEvents = 'all';

      this.checkItemActive();
      this.checkPhotoSize();

      const banned = ['platform-menu__link', 'platform-menu__selector', 'platform-menu__item', 'platform-logout__selector', 'platform-logout__item'];

      const menuOpen = this.transitionStart.bind(this, banned, menu);
      menu.addEventListener('transitionstart', menuOpen);
      const menuClosed = this.transitionEnd.bind(this, banned, menu);
      menu.addEventListener('transitionend', menuClosed);

      this.setOverflowHidden(menu);
    }
  }

  setOverflowHidden(menu) {
    const links = menu.querySelectorAll('a');

    if (links.length) {
      const overflowed = this.overflowed.bind(this, menu);

      links.forEach((item) => {
        const link = utils.setCloneElement(item);
        link.addEventListener('click', overflowed);
      });
    }
  }

  overflowed(menu) {
    menu.style.overflow = 'hidden';
  }

  transitionStart(banned, menu, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    if (banned.includes(t.classList[0])) {
      return false;
    }

    const menuWidth = menu.offsetWidth;

    if (menuWidth === 70) {
      this.isOpen = false;
      menu.style.overflow = 'hidden';
    }

    if (menuWidth <= 300) {
      menu.style.overflow = 'hidden';
    }
  }

  transitionEnd(banned, menu, e) {
    e.preventDefault();
    e.stopPropagation();

    const t = e.target;

    if (banned.includes(t.classList[0])) {
      return false;
    }

    const menuWidth = menu.offsetWidth;

    if (menuWidth === 300) {
      this.isOpen = true;
      menu.style.overflow = 'visible';
    }

    if (menuWidth === 70) {
      this.isOpen = false;
      menu.style.overflow = 'hidden';
    }
  }

  checkItemActive() {
    const url = window.location.href;
    const urlArr = url.split('/');
    const page = urlArr[urlArr.length - 2];

    let menuItem;
    let linkItem;

    switch (page) {
      case WORKERS_SALARY:
        menuItem = '.platform-menu__item.finance';
        linkItem = `.platform-submenu__link[href="/${WORKERS_SALARY}/"]`;
        this.setItemActive(menuItem, linkItem);
        break;
      case MOTIVATION_BUILDER:
        menuItem = '.platform-menu__item.team';
        linkItem = `.platform-submenu__link[href="/${MOTIVATION_BUILDER}/"]`;
        this.setItemActive(menuItem, linkItem);
        break;
      case WORK_TRACKER:
        menuItem = '.platform-menu__item.team';
        linkItem = `.platform-submenu__link[href="/${WORK_TRACKER}/"]`;
        this.setItemActive(menuItem, linkItem);
        break;
      case SETTINGS_FUNNELS:
        menuItem = '.platform-menu__item.settings';
        linkItem = `.platform-submenu__link[href="/settings/${SETTINGS_FUNNELS}/"]`;
        this.setItemActive(menuItem, linkItem);
        break;
      default:
        break;
    }
  }

  checkPhotoSize() {
    const photoMenu = document.querySelector('.platform-logout__image img');

    if (photoMenu) {
      const resolution = photoMenu.offsetWidth / photoMenu.offsetHeight;
      this.setResolution(photoMenu, resolution);
    }
  }

  setResolution(photo, resolution) {
    if (photo && resolution < 1) {
      photo.style.width = '100%';
      photo.style.height = 'auto';
    } else if (photo && resolution >= 1) {
      photo.style.width = '100%';
      photo.style.height = '100%';
    }
  }

  setItemActive(itemClass = null, subMenuClass = null) {
    if (!itemClass && !subMenuClass) return false;

    const menuItem = document.querySelector(itemClass);
    menuItem.classList.add('active');

    const subMenuItem = document.querySelector(subMenuClass);

		if (subMenuItem) {
			const subMenuItemActive = utils.getParent(subMenuItem, 'platform-submenu__item');
			subMenuItemActive.classList.add('active');
		}
  }
}

export default Menu;
