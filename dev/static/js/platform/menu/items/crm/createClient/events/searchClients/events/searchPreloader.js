import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class SearchPreloader {
  async init(props) {
    const { menu } = props;

    const clientList = menu.querySelector('[js-client-card-list]');

    utils.removeChildren(clientList, 0);

    const placeholder = this.setPlaceholder();

    await clientList.appendChild(placeholder);
  }

  setPlaceholder() {
    const placeholder = document.createElement('li');
    placeholder.classList.add('platform__empty');
    placeholder.classList.add('platform-form__item');
    placeholder.innerText = 'Ищем клиента...';

    return placeholder;
  }
}

export default SearchPreloader;
