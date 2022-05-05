import Utils from '../../../../../../../utils/utils.js';
import CreateClientTemplate from '../../../template/template.js';
import ClientCard from '../../../../clientCard/clientCard.js';

const utils = new Utils();
const clientCard = new ClientCard();
const createClientTemplate = new CreateClientTemplate();

class Render {
  async render(props) {
    const { menu, searchResult } = props;

    const clientList = menu.querySelector('[js-client-card-list]');

    utils.removeChildren(clientList, 0);

    if (searchResult.length) {
      for (let index = 0; index < searchResult.length; index++) {
        const element = searchResult[index];

        const li = this.setClientItem(element);

        await clientList.appendChild(li);
      }

      clientCard.init(props);
    } else {
      const placeholder = this.setPlaceholder();

      await clientList.appendChild(placeholder);
    }
  }

  setClientItem(element) {
    const li = document.createElement('li');
    li.classList.add('platform-form__item');
    li.classList.add('client');
    li.setAttribute('js-client-card', '');
    li.innerHTML = createClientTemplate.clientItem(element);

    return li;
  }

  setPlaceholder() {
    const placeholder = document.createElement('li');
    placeholder.classList.add('platform__empty');
    placeholder.classList.add('platform-form__item');
    placeholder.classList.add('loader');
    placeholder.innerText = 'Клиент не найден';

    return placeholder;
  }
}

export default Render;
