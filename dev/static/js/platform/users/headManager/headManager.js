import ContentManager from '../../contentManager/contentManager.js';
import Utils from '../../utils/utils.js';
import User from '../user.js';
import HeadManagerEvents from './events/headManagerEvents.js';

const utils = new Utils();
const contentManager = new ContentManager();
const headManagerEvents = new HeadManagerEvents();

class HeadManager extends User {
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

      const events = headManagerEvents.init.bind(this);
      events(props);
    });
  }

  renderContent(renderData) {
    const render = contentManager.init.bind(contentManager);
    return render(renderData);
  }
}

export default HeadManager;
