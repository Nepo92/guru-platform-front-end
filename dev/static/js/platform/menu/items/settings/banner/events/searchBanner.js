import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class SearchBanner {
  init() {
    const search = document.querySelector('.banner__search');

    if (search) {
      const searchInput = utils.setCloneElement(search);

      const searchBanner = this.searchBanner.bind(this);

      searchInput.addEventListener('input', searchBanner);
    }
  }

  searchBanner(e) {
    const t = e.target;

    const value = t.value.toLowerCase();

    const items = document.querySelectorAll('.banner__checklist-item');

    if (items.length) {
      items.forEach((item) => {
        const name = item.querySelector('.checklist-item__name');

        if (name) {
          if (!(~name.innerText.trim().toLowerCase().indexOf(value))) {
            item.classList.add('hide');
          } else {
            item.classList.remove('hide');
          }
        }
      });
    }

    this.afterSearch();
  }

  afterSearch() {
    const items = Array.from(document.querySelectorAll('.banner__checklist-item'));

    const placeholder = document.createElement('li');
    placeholder.classList.add('banner__checklist-item');
    placeholder.classList.add('placeholder');
    placeholder.innerText = 'Баннер не найден';

    const showedItems = items.filter((el) => !el.classList.contains('hide') && !el.classList.contains('placeholder'));

    const placeholderItem = document.querySelector('.placeholder');

    if (showedItems.length !== 0 && placeholderItem) {
      placeholderItem.remove();
    } else if (!showedItems.length && !placeholderItem) {
      const wrapper = document.querySelector('.banner__checklist');
      wrapper.appendChild(placeholder);
    }
  }
}

export default SearchBanner;
