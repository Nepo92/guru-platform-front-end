import Utils from '../../../../../../utils/utils.js';
import Validation from '../../../../../../utils/validation.js';
import { aboutCompanyAPI } from '../../../../../../api/api.js';
import SectionTemplates from '../../templates/sectionTemplates.js';

const utils = new Utils();
const validation = new Validation();
const sectionTemplates = new SectionTemplates();

class AddArticle {
  init(props) {
    const params = {
      ...props,
      menu: document.querySelector('[js-menu-create-article]'),
    };

    const { menu } = params;

    utils.openModalAnimation(menu, true);
    this.clearMenu(menu);

    const id = menu.querySelector('[js-article-form-id-theme]');
    id.value = props.idSection;

    const closeBtn = menu.querySelector('[js-menu-create-article-close-btn]');

    if (closeBtn) {
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      closeBtn.addEventListener('click', closeMenu);
    }

    const addBtn = menu.querySelector('[js-save-article]');

    if (addBtn) {
      const addNewArticle = this.addNewArticle.bind(this, params);

      addBtn.addEventListener('click', addNewArticle);
      const toError = validation.toValidationError.bind(validation);
      addBtn.addEventListener('dblclick', toError);
    }
  }

  clearMenu(menu) {
    const name = menu.querySelector('[js-article-form-name]');
    name.value = '';

    const link = menu.querySelector('[js-article-form-link]');
    link.value = '';

    const file = menu.querySelector('#file');
    file.value = '';

    const label = menu.querySelector('.menu-input__title.js-fileName');
    label.innerText = 'Загрузите обложку 280x180';
  }

  addNewArticle(props, e) {
    const { menu } = props;

    const t = e.target;

    const form = menu.querySelector('[js-article-form]');

    if (validation.validateAboutArticle(form)) {
      t.style.pointerEvents = 'none';

      const formData = new FormData(form);

      const addArticle = aboutCompanyAPI.addArticle(formData);

      const loader = setTimeout(() => {
        utils.showLoader();
      });

      addArticle.then((article) => {
        t.style.pointerEvents = 'all';

        props.article = article;

        clearTimeout(loader);
        utils.hideLoader();

        this.afterSaveArticle(props);
      }, t.style.pointerEvents = 'all');
    }
  }

  afterSaveArticle(props) {
    const { article } = props;

    const div = document.createElement('div');
    div.classList.add('article');
    div.setAttribute('data-article', article.id);
    div.innerHTML = sectionTemplates.articleTempalte(article);

    props.theme.appendChild(div);
  }
}

export default AddArticle;
