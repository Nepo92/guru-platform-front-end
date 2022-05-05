class Loader {
  hideLoader() {
    const loader = document.querySelector('.transition-loader');

    if (loader) {
      loader.classList.remove('show');
    }
  }

  showLoader() {
    const loader = document.querySelector('.transition-loader');

    if (loader) {
      loader.classList.add('show');
    }
  }
}

export default Loader;
