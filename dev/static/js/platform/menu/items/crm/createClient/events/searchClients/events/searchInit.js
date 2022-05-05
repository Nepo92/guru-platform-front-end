import Utils from '../../../../../../../utils/utils.js';
import StartSearch from './startSearch.js';

const utils = new Utils();
const startSearch = new StartSearch();

class SearchInit {
  init(createClientPack) {
    const props = {
      ...createClientPack,
    };

    const { menu } = props;
    const input = menu.querySelector('[js-menu-search-input]');

    if (input) {
      const setValue = this.setValue.bind(this, props);
      const cloneInput = utils.setCloneElement(input);
      cloneInput.addEventListener('keyup', setValue);
    }
  }

  setValue(props, e) {
    const t = e.target;

    if (e.key === 'Enter' && t.value.length > 1) {
      const start = startSearch.init.bind(startSearch);
      props.target = t;
      start(props);
    }
  }
}

export default SearchInit;
