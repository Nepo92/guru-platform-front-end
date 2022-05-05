import Utils from '../../../../../../utils/utils.js';
import { aboutCompanyAPI } from '../../../../../../api/api.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();

class RemoveArticle {
  init(props, e) {
    props.target = e.target;

    const removeElement = this.removeElement.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот файл?',
      settings: null,
      title: null,
      ok: removeElement,
      cancel: null,
      target: e.target,
    };

    popup.init(popupProps);
  }

  removeElement(props) {
    const {
      idArticle,
      menu,
      target,
      theme,
    } = props;
    const remove = aboutCompanyAPI.deleteArticle(idArticle);

    const loader = setTimeout(() => {
      utils.showLoader();
    }, 400);

    target.style.pointerEvents = 'none';

    remove.then(() => {
      clearTimeout(loader);
      utils.hideLoader();

      target.style.pointerEvents = 'all';

      const articles = Array.from(theme.querySelectorAll('.article'));
      const article = articles.find((el) => +el.getAttribute('data-article') === idArticle);

      article.remove();

      const wrapper = menu.querySelector('.platform-modal__wrapper');
      utils.closeModalAnimation(menu, wrapper, false, false);
    }, () => target.style.pointerEvents = 'all');
  }
}

export default RemoveArticle;
