import SettingsContract from '../../settingsContract/settingsContract.js';

const settingsContract = new SettingsContract();

class ISearchContract {
  init(props) {
    const inputSearch = document.querySelector('.contract__search');

    if (inputSearch) {
      const activeInput = this.#activeInput.bind(this, props);
      const searchContract = settingsContract.searchContract.bind(this, props);
      inputSearch.addEventListener('input', searchContract);
      inputSearch.addEventListener('keyup', activeInput);
    }
  }

  #activeInput(props, e) {
    const t = e.target;

    if (t.value) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  }
}

export default ISearchContract;
