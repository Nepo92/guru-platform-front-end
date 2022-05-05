class SearchAudience {
  init() {
    const search = document.querySelector('[js-menu-search]');

    const searchAudience = this.searchAudience.bind(this);

    if (search) {
      search.addEventListener('keyup', searchAudience);
    }
  }

  searchAudience(e) {
    const t = e.target;
    const value = t.value.toLowerCase();
    const rows = Array.from(document.querySelectorAll('[js-menu-purchase]'));

    const hasNotValue = rows.filter((el) => el.querySelector('.audience__name').innerText.toLowerCase().indexOf(value) === -1);

    hasNotValue.forEach((item) => {
      item.classList.add('hide');
    });

    const hasValue = rows.filter((el) => el.querySelector('.audience__name').innerText.toLowerCase().indexOf(value) !== -1);

    hasValue.forEach((item) => {
      item.classList.remove('hide');
    });
  }
}

export default SearchAudience;
