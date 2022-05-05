import ContentManager from '../../contentManager/contentManager.js';
import Utils from '../../utils/utils.js';
import User from '../user.js';
import ExaminerEvents from './events/examinerEvents.js';

const utils = new Utils();
const contentManager = new ContentManager();
const examinerEvents = new ExaminerEvents();

class Examiner extends User {
  constructor() {
    super();
  }

  init(pack) {
    const { items } = pack;

    const renderData = {
      items,
      pack,
    };

    const render = this.renderContent(renderData);

    render.then(() => {
      utils.hideLoader();

      this.showPagination(pack);

      const events = examinerEvents.init.bind(this);
      events(pack);
    });
  }

  renderContent(renderData) {
    const render = contentManager.init.bind(contentManager);
    return render(renderData);
  }
}

export default Examiner;
