import OpenChangesInput from './events/openChangesInput.js';

const openChangesInput = new OpenChangesInput();

class EditClientName {
  init(clientCardPack) {
    const props = {
      ...clientCardPack,
    };

    const items = [openChangesInput];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default EditClientName;
