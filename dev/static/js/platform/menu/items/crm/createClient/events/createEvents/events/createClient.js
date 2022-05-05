import SetRandomCircle from '../../../../clientCard/events/setRandomCircle/setRandomCircle.js';
import ClearClientCard from './clearClientCard.js';
import SetCreateClientValue from './setCreateClientValue.js';
import Utils from '../../../../../../../utils/utils.js';
import ClearSearchMenu from '../../clearSearchMenu.js';

const clearClientCard = new ClearClientCard();
const setValue = new SetCreateClientValue();
const setRandomCircle = new SetRandomCircle();
const utils = new Utils();
const clearSearchMenu = new ClearSearchMenu();

class CreateClient {
  init(props) {
    const changeMenu = this.changeMenuActive.bind(this);
    changeMenu(props);

    const createPack = {
      ...props,
      menu: document.querySelector('[js-menu-client-card]'),
    };

    const items = [clearClientCard, setValue, setRandomCircle];

    props.openClientCard = false;

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(createPack);
    });
  }

  changeMenuActive(props) {
    const { menu } = props;

    const wrapper = menu.querySelector('.platform-modal__wrapper');
    utils.closeModalAnimation(menu, wrapper, false, true, false);

    const clearSearch = clearSearchMenu.init.bind(clearSearchMenu, props);

    setTimeout(clearSearch, 800);

    const menuClientCard = document.querySelector('[js-menu-client-card]');
    utils.openModalAnimation(menuClientCard, true);
  }
}

export default CreateClient;
