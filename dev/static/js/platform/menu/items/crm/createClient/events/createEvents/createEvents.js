import OpenMenu from './events/openMenu.js';

const openMenu = new OpenMenu();

class CreateEvents {
  init(createClientPack) {
    const props = {
      ...createClientPack,
    };

    const items = [openMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default CreateEvents;
