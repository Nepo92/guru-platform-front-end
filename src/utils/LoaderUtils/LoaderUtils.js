class LoaderUtils {
  showLoader(loader) {
    loader.classList.add('show');
  }

  hideLoader(loader) {
    loader.classList.remove('show');
  }
}

export default LoaderUtils;
