import SearchInit from './events/searchInit.js';

const searchInit = new SearchInit();

class SearchClient {
  init(createClientPack) {
    const items = [searchInit];

    items.forEach((item) => {
      const init = item.init.bind(item);
      init(createClientPack);
    });
  }
}

export default SearchClient;
