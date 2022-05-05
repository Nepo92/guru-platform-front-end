import Utils from '../../utils/utils.js';
import User from '../user.js';
import AdminEvents from './events/adminEvents.js';
import ContentManager from '../../contentManager/contentManager.js';

const utils = new Utils();
const adminEvents = new AdminEvents();
const contentManager = new ContentManager();

class Admin extends User {
  constructor() {
    super();
  }

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

      const events = adminEvents.init.bind(adminEvents);
      events(props);
    });
  }

  renderContent(renderData) {
    const render = contentManager.init.bind(contentManager);
    return render(renderData);
  }
}

export default Admin;
