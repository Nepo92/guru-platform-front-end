import OpenMenu from './events/openMenu.js';
import CloseMenu from './events/closeMenu.js';

const openMenu = new OpenMenu();
const closeMenu = new CloseMenu();

class AddFunnel {
  init(props) {
    const addProps = {
      ...props,
      menu: document.querySelector('[js-menu-funnel-add]'),
    };

    const items = [openMenu, closeMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(addProps);
    });
  }
}

export default AddFunnel;
