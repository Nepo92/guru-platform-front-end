const loader = document.querySelector('.transition-loader');

function showLoader() {
  if (loader) {
    loader.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function hideLoader() {
  if (loader) {
    loader.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}
