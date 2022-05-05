import SaveLink from './events/saveLink.js';
import CloseTunnelMenu from './events/closeTunnelMenu.js';

const saveLink = new SaveLink();
const closeTunnelMenu = new CloseTunnelMenu();

class AddLink {
  init(props) {
    const items = [saveLink, closeTunnelMenu];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default AddLink;
