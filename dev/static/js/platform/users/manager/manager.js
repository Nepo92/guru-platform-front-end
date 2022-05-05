import ContentManager from '../../contentManager/contentManager.js';
import Utils from '../../utils/utils.js';
import User from '../user.js';
import ManagerEvents from './events/managerEvents.js';

const utils = new Utils();
const contentManager = new ContentManager();
const managerEvents = new ManagerEvents();

class Manager extends User {
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

      const events = managerEvents.init.bind(this);
      events(props);
    });
  }

  renderContent(renderData) {
    const render = contentManager.init.bind(contentManager);
    return render(renderData);
  }
}

export default Manager;
