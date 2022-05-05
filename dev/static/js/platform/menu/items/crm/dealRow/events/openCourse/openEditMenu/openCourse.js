import OpenEditMenu from './events/openEditMenu.js';

const openMenu = new OpenEditMenu();

class OpenCourse {
  init(data) {
    let coursePack;

    if (!data.pack) {
      coursePack = {
        pack: data,
        menu: document.querySelector('[js-menu-deal]'),
      };
    } else {
      coursePack = {
        ...data,
        menu: document.querySelector('[js-menu-deal]'),
      };
    }

    const items = [openMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(coursePack);
    });
  }
}

export default OpenCourse;
