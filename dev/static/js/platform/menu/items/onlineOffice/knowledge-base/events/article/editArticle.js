import Utils from '../../../../../../utils/utils.js';
import { knowledgeBaseAPI } from '../../../../../../api/api.js';
import Validation from '../../../../../../utils/validation.js';
import RemoveArticle from './removeArticle.js';

const utils = new Utils();
const validation = new Validation();
const removeArticle = new RemoveArticle();

class EditArticle {
  init(props) {
    const { target } = props;

    const params = this.getParams(props);
    const { idArticle } = params;

    target.style.pointerEvents = 'none';

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    const getArticleData = knowledgeBaseAPI.getArticle(idArticle);

    getArticleData.then((article) => {
      target.style.pointerEvents = 'all';

      clearTimeout(loader);
      utils.hideLoader();

      params.article = article;

      this.afterGetArticle(params);
    }, () => target.style.pointerEvents = 'all');
  }

  getParams(props) {
    const { target } = props;
    const articleItem = utils.getParent(target, 'article');
    const idArticle = +articleItem.getAttribute('data-article');

    return {
      ...props,
      menu: document.querySelector('[js-menu-update-article]'),
      articleItem,
      idArticle,
    };
  }

  afterGetArticle(props) {
    const { menu } = props;

    utils.openModalAnimation(menu, true);

    this.setDataArticle(props);
    this.setUpdateArticleEvents(props);

    const closeBtn = menu.querySelector('[js-menu-update-article-close-btn]');

    if (closeBtn) {
      const wrapper = menu.querySelector('.platform-modal__wrapper');
      const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
      const close = utils.setCloneElement(closeBtn);
      close.addEventListener('click', closeMenu);
    }

    const removeBtn = menu.querySelector('[js-delete-article]');

    if (removeBtn) {
      const removeArticleElement = removeArticle.init.bind(removeArticle, props);
      const remove = utils.setCloneElement(removeBtn);
      remove.addEventListener('click', removeArticleElement);
    }
  }

  setDataArticle(props) {
    const { menu } = props;
    const { article } = props;

    const id = menu.querySelector('[js-update-article-form-id]');
    const prevImage = menu.querySelector('[js-update-article-form-img]');
    const name = menu.querySelector('[js-update-article-form-name]');
    const link = menu.querySelector('[js-update-article-form-link]');

    id.value = article.id;
    prevImage.value = article.prevImage;
    name.value = article.name;
    link.value = article.link;
  }

  setUpdateArticleEvents(props) {
    const { menu } = props;

    const updateBtn = menu.querySelector('[js-update-save-article]');

    if (updateBtn) {
      const update = utils.setCloneElement(updateBtn);
      const updateArticle = this.updateArticle.bind(this, props);
      update.addEventListener('click', updateArticle);
    }
  }

  updateArticle(props, e) {
    const t = e.target;
    const { menu } = props;

    const form = menu.querySelector('[js-update-article-form]');

    if (validation.validateAboutArticle(form)) {
      t.style.pointerEvents = 'none';

      const formData = new FormData(form);

      const updateArticle = knowledgeBaseAPI.updateArticle(formData);

      const loader = setTimeout(() => {
        utils.showLoader();
      }, 400);

      updateArticle.then((article) => {
        t.style.pointerEvents = 'all';
        clearTimeout(loader);
        utils.hideLoader();

        props.article = article;

        this.afterUpdateArticle(props);
      }, () => t.style.pointerEvents = 'all');
    }
  }

  afterUpdateArticle(props) {
    const { articleItem, article } = props;

    const name = articleItem.querySelector('.article__title');
    name.value = article.name;

    const img = articleItem.querySelector('.article__img');
    img.setAttribute('src', `/${article.previewImg}`);

    const link = articleItem.querySelector('.article__link');
    link.value = article.link;
    link.setAttribute('href', `${article.link}`);
  }
}

export default EditArticle;
