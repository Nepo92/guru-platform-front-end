import Utils from '../utils/utils.js';
import { menuItems, subMenuItems } from './menuItemsList';
import DesktopMenu from './adaptive/DesktopMenu';
import MobileMenu from './adaptive/MobileMenu';

const utils = new Utils();
const desktopMenu = new DesktopMenu();
const mobileMenu = new MobileMenu();

class Menu {
  init(props) {
    const menu = document.querySelector('.platform-menu');

    if (menu && props.pack.role) {
      this.initMenu(props);
      this.#addClassActive();
    }
  }

  initMenu(menuProps) {
    const props = {
      mobileMenu,
      desktopMenu,
      ...menuProps,
    };

    if (window.innerWidth > 1000) {
      desktopMenu.init(props);
    } else {
      mobileMenu.init(props);
    }
  }

  #addClassActive() {
    const page = utils.getPage();
    const menuItemsEntries = Object.entries(menuItems);

    const currentMenuItem = menuItemsEntries.find((el) => el[1].includes(page));

    if (currentMenuItem) {
      const [currentSelector] = currentMenuItem;
      const menuItem = document.querySelector(`.${currentSelector}`);

      if (menuItem) {
        menuItem.classList.add('active');
      }
    }

    const subMenuEntries = Object.entries(subMenuItems);
    const currentSubMenuItem = subMenuEntries.find((el) => el[1].includes(page));

    if (currentSubMenuItem) {
      const [currentSelector] = currentSubMenuItem;
      const subMenuItem = document.querySelector(`.${currentSelector}`);

      if (subMenuItem) {
        subMenuItem.classList.add('active');
      }
    }
  }
}

export default Menu;
