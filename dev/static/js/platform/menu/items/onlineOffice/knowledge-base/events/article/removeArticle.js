import Utils from '../../../../../../utils/utils.js';
import { knowledgeBaseAPI } from '../../../../../../api/api.js';
import Popup from '../../../../../../modules/popup/popup.js';

const utils = new Utils();
const popup = new Popup();
class RemoveArticle {
  init(props, e) {
    props.target = e.target;

    const removeElement = this.removeElement.bind(this, props);

    const popupProps = {
      text: 'Вы действительно хотите удалить этот файл',
      settings: null,
      title: null,
      ok: removeElement,
      cancel: null,
      target: props.target,
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

    const remove = knowledgeBaseAPI.deleteArticle(idArticle);

    target.style.pointerEvents = 'none';

    remove.then(() => {
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
