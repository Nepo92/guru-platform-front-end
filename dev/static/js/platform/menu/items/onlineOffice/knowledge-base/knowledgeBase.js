import AddSection from './events/section/addSection.js';
import SectionEvents from './events/sectionEvents.js';

const addSection = new AddSection();
const sectionEvents = new SectionEvents();

class KnowledgeBase {
  init(props) {
    const items = [addSection, sectionEvents];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(props);
    });
  }
}

export default KnowledgeBase;
