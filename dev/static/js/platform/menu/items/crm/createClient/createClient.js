import OpenCreateCLientMenu from './events/openCreateClientMenu/openCreateClientMenu.js';
import CloseCreateClientMenu from './events/closeCreateClientMenu/closeCreateClientMenu.js';

const openCreateCLientMenu = new OpenCreateCLientMenu();
const cLoseCreateClientMenu = new CloseCreateClientMenu();

class CreateClient {
  init(props) {
    const {
      pack,
      user,
      clientCardObs,
      rowEventsObs,
      rerenderContent,
    } = props;

    const newClientData = {
      pack,
      user,
      menu: document.querySelector('[js-menu-search]'),
      clientCardObs,
      rowEventsObs,
      rerenderContent,
    };

    const items = [openCreateCLientMenu, cLoseCreateClientMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(newClientData);
    });
  }
}

export default CreateClient;
