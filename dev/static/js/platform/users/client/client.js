import ClientEvents from './events/clientEvents.js';
import ContentManager from '../../contentManager/contentManager.js';
import Utils from '../../utils/utils.js';
import User from '../user.js';

const clientEvents = new ClientEvents();
const contentManager = new ContentManager();
const utils = new Utils();

class Client extends User {
  init(props) {
    const { pack } = props;
    const { items } = pack;

    const renderData = {
      items: items ? items.pageItems : null,
      pack,
    };

    const render = this.renderContent(renderData);

    render.then(() => {
      utils.hideLoader();

      this.showPagination(props);

      const events = clientEvents.init.bind(clientEvents);
      events(props);
    });
  }

  renderContent(renderData) {
    const render = contentManager.init.bind(contentManager);
    return render(renderData);
  }
}

export default Client;
