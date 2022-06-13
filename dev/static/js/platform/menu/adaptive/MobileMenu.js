import Utils from '../../utils/utils';

const utils = new Utils();

class MobileMenu {
  resizeTimeout = null;

  menuText = null;

  init(mobileMenuProps) {
    const props = this.getProps(mobileMenuProps);

    if (props.menu) {
      const resizeMenu = this.resizeMenu.bind(this, props);

      resizeMenu();
      window.onresize = resizeMenu;
    }
  }

  getProps(mobileMenuProps) {
    const burger = document.querySelector('.burger');
    const cloneBurger = utils.setCloneElement(burger);
    const menu = document.querySelector('.platform-menu');
    const subMenuButtons = document.querySelectorAll('.submenu');
    const mainMenu = document.querySelector('.platform-menu__main');

    const props = {
      cloneBurger,
      menu,
      desktopMenu: mobileMenuProps.desktopMenu,
      mobileMenu: mobileMenuProps.mobileMenu,
      subMenuButtons,
      mainMenu,
    };

    const toggleMenu = this.toggleMenu.bind(this, props);
    props.toggleMenu = toggleMenu;

    const toggleSubMenu = this.toggleSubMenu.bind(this, props);
    props.toggleSubMenu = toggleSubMenu;

    return props;
  }

  resizeMenu(props) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      if (window.innerWidth < 1000) {
        this.mobileMenu(props);
      } else {
        const subMenuMobile = document.querySelectorAll('.mobile-sub');

        if (subMenuMobile.length) {
          subMenuMobile.forEach((item) => {
            if (item.classList.contains('open')) {
              const subMenuName = item.getAttribute('data-item');

              const link = document.querySelector(`.submenu[data-item="${subMenuName}"]`);
              link.innerText = this.menuText;
            }

            item.remove();
          });
        }

        props.menu.classList.remove('open');
        props.cloneBurger.removeEventListener('click', props.toggleMenu);
        props.mainMenu.removeEventListener('click', props.toggleSubMenu);

        const desktopProps = {
          desktopMenu: props.desktopMenu,
          mobileMenu: props.mobileMenu,
        };

        props.desktopMenu.init(desktopProps);
      }
    }, 50);
  }

  mobileMenu(props) {
    props.cloneBurger.removeEventListener('click', props.toggleMenu);
    props.cloneBurger.addEventListener('click', props.toggleMenu);

    props.mainMenu.removeEventListener('click', props.toggleSubMenu);
    props.mainMenu.addEventListener('click', props.toggleSubMenu);
  }

  toggleMenu(props) {
    props.menu.classList.toggle('open');
  }

  toggleSubMenu(props, e) {
    const t = e.target;

    if (t.classList.contains('submenu')) {
      const itemName = t.dataset.item;

      const subMenus = document.querySelectorAll('.platform-submenu');

      if (subMenus.length) {
        subMenus.forEach((item) => {
          if (item.classList.contains('open')) {
            item.classList.remove('open');
            item.querySelector('.mobile-sub')?.remove();
            const subMenuName = item.getAttribute('data-item');

            const link = document.querySelector(`.submenu[data-item="${subMenuName}"]`);
            link.innerText = this.menuText;
          }
        });
      }

      this.menuText = t.innerText;
      t.innerText = '';

      const subMenu = props.menu.querySelector(`.platform-submenu[data-item="${itemName}"]`);

      const cloneSubMenu = subMenu.cloneNode(true);

      t.appendChild(cloneSubMenu);
      cloneSubMenu.classList.add('open');
      cloneSubMenu.classList.add('mobile-sub');
    }
  }
}

export default MobileMenu;
