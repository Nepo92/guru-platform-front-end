import AddArticle from './article/addArticle.js';
import UpdateSection from './section/updateSection.js';
import EditArticle from './article/editArticle.js';
import Utils from '../../../../../utils/utils.js';

const addArticle = new AddArticle();
const updateSection = new UpdateSection();
const editArticle = new EditArticle();
const utils = new Utils();

class EditSection {
  init(props) {
    const container = document.querySelector('.content-main.theme-container');

    const dispatchContainer = this.dispatchContainer.bind(this, props);
    container.addEventListener('click', dispatchContainer);
  }

  dispatchContainer(props, e) {
    const t = e.target;

    props.target = t;

    const isEditBtn = t.hasAttribute('js-update-theme');
    const isArticleAdd = t.hasAttribute('js-create-article');
    const isEditArticle = t.hasAttribute('js-update-article');

    const element = isEditBtn || isArticleAdd || isEditArticle;

    const theme = utils.getParent(t, 'theme');

    if (theme) {
      const idSection = theme.getAttribute('data-theme');
      props.idSection = idSection;
      props.theme = theme;
    }

    if (element) {
      switch (element) {
        case isEditBtn: {
          updateSection.init.bind(updateSection)(props);
          break;
        }
        case isArticleAdd: {
          addArticle.init.bind(addArticle)(props);
          break;
        }
        case isEditArticle: {
          editArticle.init.bind(editArticle)(props);
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}

export default EditSection;
