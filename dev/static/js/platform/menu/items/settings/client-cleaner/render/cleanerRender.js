import Utils from '../../../../../utils/utils.js';
import CleanerTemplates from '../templates/cleanerTemplates.js';

const cleanerTemplates = new CleanerTemplates();
const utils = new Utils();

class CleanerRender {
  async init(props) {
    const { copies } = props;

    const copiesArray = Object.entries(copies);

    if (copiesArray.length) {
      await this.renderCopiesList(copiesArray);
    } else {
      await this.emptyCopiesList();
    }
  }

  renderCopiesList(copiesArray) {
    const wrapper = document.querySelector('[cleaner-list]');

    utils.removeChildren(wrapper, 0);

    const getTemplate = cleanerTemplates.copiesTemplate.bind(cleanerTemplates, wrapper);

    copiesArray.forEach(getTemplate);
  }

  emptyCopiesList() {
    const wrapper = document.querySelector('[cleaner-list]');

    utils.removeChildren(wrapper, 0);
  }
}

export default CleanerRender;
