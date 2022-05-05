import { reglamentAPI } from '../../../../../api/api.js';
import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class ViewReglament {
  init(props, e) {
    const t = e.target;

    const params = {
      ...props,
      menu: document.querySelector('[js-menu-open-article]'),
    };

    const { idArticle } = params;

    const getReglamentData = reglamentAPI.getArticle(idArticle);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    t.style.pointerEvents = 'none';

    getReglamentData.then((reglament) => {
      t.style.pointerEvents = 'all';
      clearTimeout(loader);
      utils.hideLoader();

      params.reglament = reglament;

      this.afterGetReglament(params);

      const closeBtn = document.querySelector('[js-menu-open-article-close-btn]');

      if (closeBtn) {
        const { menu } = params;

        const close = utils.setCloneElement(closeBtn);
        const wrapper = menu.querySelector('.platform-modal__wrapper');
        const closeMenu = utils.closeModalAnimation.bind(utils, menu, wrapper, false, false);
        close.addEventListener('click', closeMenu);
      }
    }, () => t.style.pointerEvents = 'all');
  }

  afterGetReglament(props) {
    const { menu, reglament } = props;

    const title = menu.querySelector('[js-open-title]');
    title.innerText = reglament.name;

    const text = menu.querySelector('[js-open-text]');
    text.innerText = reglament.text;
  }
}

export default ViewReglament;
