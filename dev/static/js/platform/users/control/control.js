import User from '../user.js';
import ContentManager from '../../contentManager/contentManager.js';
import Utils from '../../utils/utils.js';
import ControlEvents from './events/controlEvents.js';

const contentManager = new ContentManager();
const utils = new Utils();
const controlEvents = new ControlEvents();

class Control extends User {
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

      const events = controlEvents.init.bind(controlEvents);
      events(props);
    });
  }

  renderContent(renderData) {
    const render = contentManager.init.bind(contentManager);
    return render(renderData);
  }
}

export default Control;
