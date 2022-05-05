import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class SearchClient {
  init() {
    const startSearchBtn = document.querySelector('[search-client-btn]');

    if (startSearchBtn) {
      const startSearch = this.startSearch.bind(this);

      startSearchBtn.addEventListener('click', startSearch);
    }
  }

  startSearch(e) {
    const t = e.target;

    const form = document.querySelector('.platform__search');

    if (!t.classList.contains('active')) {
      form.submit();
    } else {
      utils.showLoader();

      const input = form.querySelector('input');

      const query = form.querySelector('input').value;

      input.value = '';

      form.submit();
      input.value = query;
    }
  }
}

export default SearchClient;
