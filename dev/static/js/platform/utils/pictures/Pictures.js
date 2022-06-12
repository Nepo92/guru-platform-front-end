class Pictures {
  adaptivePhotos(photos) {
    if (Array.isArray(photos)) {
      photos.forEach((item) => {
        this.setAdaptivePhoto(item);
      });
    } else {
      this.setAdaptivePhoto(photos);
    }
  }

  setAdaptivePhoto(item) {
    if (!item.classList.contains('manager-avatar__default')) {
      item.style.width = 'auto';
      item.style.height = 'auto';

      item.addEventListener('load', () => {
        const resolution = item.offsetWidth / item.offsetHeight;

        if (resolution < 1) {
          item.style.width = '100%';
          item.style.height = 'auto';
        } else if (resolution === 1) {
          item.style.width = '100%';
          item.style.height = '100%';
        } else if (resolution > 1) {
          item.style.width = 'auto';
          item.style.height = '100%';
        }
      });
    }
  }
}

export default Pictures;
