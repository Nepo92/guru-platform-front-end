import { clientAPI } from '../../../../../../../api/api.js';
import SearchPreloader from './searchPreloader.js';
import AfterSearch from './afterSearch.js';

const searchPreloader = new SearchPreloader();
const afterSearch = new AfterSearch();

class StartSearch {
  init(props) {
    const startSearch = this.startSearch.bind(this);
    startSearch(props);
  }

  startSearch(props) {
    const { target } = props;

    const data = {
      search: target.value.trim(),
    };

    props.clientSearched = data;

    const searchClient = clientAPI.searchClient(data);

    const preloader = searchPreloader.init.bind(searchPreloader);

    preloader(props).then(() => searchClient.then((clients) => {
      const after = afterSearch.init.bind(afterSearch);

      props.searchResult = clients;

      after(props);
    }));
  }
}

export default StartSearch;
